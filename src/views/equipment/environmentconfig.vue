<template>
  <div>
    <div class="mytask-content-top">
      <el-dropdown
        @command="handleCommand"
        placement="bottom-start"
        class="mytask-dropdown">
        <el-button type="primary" size="small">
          筛选<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">按开始时间(最新)</el-dropdown-item>
          <el-dropdown-item command="b">按结束时间(最新)</el-dropdown-item>
          <el-dropdown-item command="c">按任务进度(最新)</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入工作台编号"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="benchsearch">搜索</el-button>
      <el-button type="success" size="mini" @click="createworkDialogVisible = true">新建工作台</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="eqprojectlist"
          class="mytask-content-table-one"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="number"
            show-overflow-tooltip
            label="工作台编号">
          </el-table-column>
          <el-table-column
            prop="workbench_type"
            label="工作台类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ip_address"
            show-overflow-tooltip
            width="180"
            label="IP地址">
          </el-table-column>
          <el-table-column
            prop="system_version"
            show-overflow-tooltip
            width="180"
            label="系统版本">
          </el-table-column>
          <el-table-column
            prop="issimulation"
            show-overflow-tooltip
            width="150"
            label="仿真检测">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.issimulation"
                :active-value="1"
                @change="fzswitch(scope.row)"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="操作">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleedit(scope.row.id)"></el-button>
              <el-button type="primary" size="mini" icon="el-icon-setting" @click="handleeqcaozuo(scope.row)"></el-button>
              <!-- <el-button @click="deletework(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="taskpage"
        :current-page.sync="currentPage"
        @current-change="handleprojectChange"
        :page-size="taskpagesize"
        layout="total, prev, pager, next, jumper"
        :total="eqpistotal">
      </el-pagination>
    </div>
    <el-dialog
      title="新建工作台"
      @close="workclose"
      :visible.sync="createworkDialogVisible"
      width="500px"
      center>
      <el-form label-position="right" label-width="150px" ref="createworkform" :rules="createworkformrules" :model="createworkform">
        <el-form-item label="工作台编号" prop="number">
          <el-input size="small" class="workconfiginput" v-model="createworkform.number"></el-input>
        </el-form-item>
        <el-form-item label="工作台类型" prop="workbench_type">
          <el-select v-model="createworkform.workbench_type" class="workconfiginput" size="small" placeholder="请选择工作台类型">
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip_address">
          <el-input size="small"  class="workconfiginput" v-model="createworkform.ip_address"></el-input>
        </el-form-item>
        <el-form-item label="系统版本" prop="system_version">
          <el-input size="small"  class="workconfiginput" v-model="createworkform.system_version"></el-input>
        </el-form-item>
        <el-form-item label="是否可做仿真检测" prop="issimulation">
          <el-switch
            v-model="createworkform.issimulation"
            :active-value="1"
            :inactive-value="0"
            active-text="是"
            inactive-text="否"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createworkDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitwork">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改工作台信息"
      :visible.sync="workbench"
      width="576px"
      center>
      <el-form label-position="right" class="work_form" label-width="140px" ref="workform" :model="workform">
        <el-form-item
          label="工作台IP"
          :rules="[
            { required: true, message: '请输入工作台IP地址', trigger: 'blur' }
          ]"
          prop="ip_address">
          <el-input size="small" class="workconfig-input" v-model.trim="workform.ip_address"></el-input>
        </el-form-item>
        <el-form-item
          label="工作台类型"
          :rules="[
            { required: true, message: '请选择工作台类型', trigger: 'blur' }
          ]"
          prop="workbench_type">
          <el-select v-model="workform.workbench_type" class="workconfig-input" size="small" placeholder="请选择工作台类型">
            <el-option
              v-for="item in typeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="工作台系统版本"
          :rules="[
            { required: true, message: '请输入工作台系统版本', trigger: 'blur' }
          ]"
          prop="system_version">
          <el-input size="small" class="workconfig-input" v-model.trim="workform.system_version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="workbench = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editworkbench">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 13, //每页显示几条
      eqpistotal: 0,
      workbench: false,
      myprojectsearch: "",
      typeoptions: [
        {
          value: "PIS",
          label: "PIS"
        },
        {
          value: "VMS",
          label: "VMS"
        }
      ],
      fangzhenoptions: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      jianceoptions: [
        {
          value: "仿真环境检测",
          label: "仿真环境检测"
        },
        {
          value: "协议和功能与性能检测",
          label: "协议和功能与性能检测"
        }
      ],
      createworkDialogVisible: false,
      eqprojectlist: [], // 工作台列表
      createworkform: {
        number: "",
        workbench_type: "",
        ip_address: "",
        issimulation: 0,
        system_version: ""
      }, // 新建工作台表单
      createworkformrules: {
        number: [
          { required: true, message: "请输入工作台编号", trigger: "blur" }
        ],
        workbench_type: [
          { required: true, message: "请选择工作台类型", trigger: "blur" }
        ],
        ip_address: [
          { required: true, message: "请输入工作台IP地址", trigger: "blur" }
        ],
        issimulation: [
          { required: true, message: "请选择工作台是否可做仿真检测", trigger: "blur" }
        ],
        system_version: [
          { required: true, message: "请输入系统版本", trigger: "blur" }
        ]
      },
      workform: {} // 修改工作台表单
    };
  },
  methods: {
    //筛选按钮
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    handleeqcaozuo(row) {
      this.$router.push({
        name: "workconfig",
        params: {
          id: row.id,
          name: "工作台配置",
          path: "/environmentconfig",
          type: row.workbench_type
        }
      });
    },
    handleprojectChange(val) {
      this.worklistdata(val);
    },
    workclose() {
      this.$refs.createworkform.resetFields();
    },
    // 获取工作台数据
    async worklistdata(page) {
      const res = await this.$http.post(`workbenchlist/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqprojectlist = res.data.workbench_list;
        this.eqpistotal = res.data.total_num;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 新建工作台
    submitwork() {
      this.$refs.createworkform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入工作台信息");
        }
        const res = await this.$http.post("createbench", this.createworkform);
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.createworkDialogVisible = false;
          this.worklistdata(this.currentPage);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 仿真开关
    async fzswitch(row) {
      const res = await this.$http.put(`simulation/${row.id}`, {
        issimulation: row.issimulation
      });
      if (res.data.status === 200) {
        this.$message.success(res.data.msg);
        this.worklistdata(this.currentPage);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 删除工作台
    // deletework(id) {
    //   this.$confirm("确定要删除该工作台吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // this.rowid = rowid;
    //       // const res = await this.$http.delete(`createtasktype/${id}`);
    //       // if (res.data.status === 200) {
    //       //   this.$message.success("任务删除成功");
    //       //   this.dataloading();
    //       // } else {
    //       //   this.$message.error(res.data.msg);
    //       // }
    //     })
    //     .catch(() => {});
    // },
    async handleedit(id) {
      const res = await this.$http.get(`bench/${id}`);
      if (res.data.status === 200) {
        this.workform = res.data.bench_info;
        this.workbench = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    editworkbench() {
      this.$refs.workform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入工作台信息");
        }
        const res = await this.$http.put(
          `bench/${this.workform.id}`,
          this.workform
        );
        if (res.data.status === 200) {
          this.$message.success("修改成功");
          this.worklistdata(this.currentPage);
          this.workbench = false;
        } else {
          this.$message.error(res.data.mag);
        }
      });
    },
    // 搜索
    benchsearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.worklistdata(1);
      }
    }
  },
  created() {
    this.worklistdata(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.worklistdata(1);
      }
    }
  }
};
</script>

<style>
.mytask-content-top {
  height: 54px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
}
.mytasksearch {
  width: 300px;
  margin-top: 11px;
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
}
.sreach-icon {
  position: absolute;
  top: 0px;
}
.mytask-dropdown {
  margin-left: 30px;
}
.mytask-content-middle {
  border-top: 1px solid #c6e7ff;
  margin-top: 10px;
  height: 100%;
}
.mytask-content-middle .page {
  margin-left: 30px;
}
.mytask-content-middle .colcell {
  cursor: Pointer;
}
.mytask-content-middle .colcell:hover {
  color: #409eff;
}
.mytask-content-table {
  height: 740px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.eqextendrow span {
  font-size: 16px;
  color: #7e8b8e;
}
.eq-extend_box {
  margin-left: 28px;
}
.capzuojilu {
  margin: 10px 0 10px 0;
}
.workconfiginput {
  width: 250px;
}
.workconfig-input {
  width: 300px;
}
</style>

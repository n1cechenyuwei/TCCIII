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
          placeholder="请输入外委单位名称"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="reportssearch">搜索</el-button>
      <el-button size="mini" type="success" @click="outsideDialogVisible = true">创建外委单位</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="eqpislist"
          class="mytask-content-table-one"
          stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-card v-for="(item, index) in scope.row.projectinfo" :key="index" class="inspeccard" shadow="hover">
                <div slot="header">
                  <span>项目名称：<span class="projectpush" @click="push(item)">{{item.proname}}</span></span>
                </div>
                <div class="text item">
                  <span>项目进度：{{item.sechedule}}%</span>
                </div>
              </el-card>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            width="80"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="单位名称">
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            label="单位地址">
          </el-table-column>
          <el-table-column
            prop="postalcode"
            width="180"
            show-overflow-tooltip
            label="邮政编码">
          </el-table-column>
          <el-table-column
            prop="link_phone"
            width="150"
            show-overflow-tooltip
            label="联系电话">
          </el-table-column>
          <el-table-column
            width="100"
            show-overflow-tooltip
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="editexamine(scope.row.id)"></el-button>
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
    <!-- 创建外委单位 -->
    <el-dialog
      title="添加外委单位"
      @close="outsideclose"
      :visible.sync="outsideDialogVisible"
      width="576px"
      center>
      <el-form label-position="right" label-width="150px" ref="craetoutsideform" :model="craetoutsideform">
        <el-form-item
        label="单位名称"
        :rules="[
          { required: true, message: '请输入外委单位名称', trigger: 'blur' },
          { max: 20, message: '外委单位名称最长为20个字符', trigger: 'blur' }
        ]"
        prop="name">
          <el-input size="small" class="outsideipt" v-model="craetoutsideform.name"></el-input>
        </el-form-item>
        <el-form-item
          label="单位地址"
          :rules="[
            { required: true, message: '请输入外委单位地址', trigger: 'blur' },
            { max: 20, message: '单位地址最长为20个字符', trigger: 'blur' }
          ]"
          prop="address">
          <el-input size="small"  class="outsideipt" v-model="craetoutsideform.address"></el-input>
        </el-form-item>
        <el-form-item
          label="邮编地址"
          :rules="[
            { required: true, message: '请输入外委邮编地址', trigger: 'blur' },
            { max: 11, message: '邮编最长为11个字符', trigger: 'blur' }
          ]"
          prop="postalcode">
          <el-input size="small"  class="outsideipt" v-model="craetoutsideform.postalcode"></el-input>
        </el-form-item>
        <el-form-item
          label="外检测类型"
          :rules="[
            { required: true, message: '请选择外委单位检测类型', trigger: 'blur' }
          ]"
          prop="test_type">
          <el-select v-model="craetoutsideform.test_type" clearable placeholder="请选择检测类型" size="small" class="outsideselect">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="联系电话"
          :rules="[
            { required: true, message: '请输入外委单位联系电话', trigger: 'blur' },
            { max: 13, message: '电话最长为13个字符', trigger: 'blur' }
          ]"
          prop="link_phone">
          <el-input size="small"  class="outsideipt" v-model="craetoutsideform.link_phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="outsideDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitoutside">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改外委单位 -->
        <el-dialog
      title="修改外委单位信息"
      :visible.sync="editoutsideDialogVisible"
      width="576px"
      center>
      <el-form label-position="right" label-width="150px" ref="editoutsideform" :model="editoutsideform">
        <el-form-item
        label="单位名称"
        :rules="[
          { required: true, message: '请输入外委单位名称', trigger: 'blur' },
          { max: 20, message: '外委单位名称最长为20个字符', trigger: 'blur' }
        ]"
        prop="name">
          <el-input size="small" class="outsideipt" v-model="editoutsideform.name"></el-input>
        </el-form-item>
        <el-form-item
          label="单位地址"
          :rules="[
            { required: true, message: '请输入外委单位地址', trigger: 'blur' },
            { max: 20, message: '单位地址最长为20个字符', trigger: 'blur' }
          ]"
          prop="address">
          <el-input size="small"  class="outsideipt" v-model="editoutsideform.address"></el-input>
        </el-form-item>
        <el-form-item
          label="邮编地址"
          :rules="[
            { required: true, message: '请输入外委邮编地址', trigger: 'blur' },
            { max: 11, message: '邮编最长为11个字符', trigger: 'blur' }
          ]"
          prop="postalcode">
          <el-input size="small"  class="outsideipt" v-model="editoutsideform.postalcode"></el-input>
        </el-form-item>
        <el-form-item
          label="外检测类型"
          :rules="[
            { required: true, message: '请选择外委单位检测类型', trigger: 'blur' }
          ]"
          prop="test_type">
          <el-select v-model="editoutsideform.test_type" clearable placeholder="请选择检测类型" size="small" class="outsideselect">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="联系电话"
          :rules="[
            { required: true, message: '请输入外委单位联系电话', trigger: 'blur' },
            { max: 13, message: '电话最长为13个字符', trigger: 'blur' }
          ]"
          prop="link_phone">
          <el-input size="small"  class="outsideipt" v-model="editoutsideform.link_phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editoutsideDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleeditoutside">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outsideDialogVisible: false,
      editoutsideDialogVisible: false,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      options: [
        {
          type: "VMS",
          id: "VMS"
        },
        {
          type: "PIS",
          id: "PIS"
        }
      ],
      craetoutsideform: {
        test_type: "",
        name: "",
        address: "",
        postalcode: "",
        link_phone: ""
      },
      editoutsideform: {}
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
    handleprojectChange(val) {
      this.getexamine(val);
    },
    async getexamine(page) {
      const res = await this.$http.post(`encompanies/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.entrustinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    outsideclose() {
      this.$refs.craetoutsideform.resetFields();
    },
    // 项目跳转
    push(row) {
      if (row.pro_iscomplete === 0) {
        this.$router.push({
          name: "project",
          params: {
            id: row.id,
            path: "/goingproject",
            name: "进行中项目"
          }
        });
      } else if (row.pro_iscomplete === 1) {
        this.$router.push({
          name: "project",
          params: {
            id: row.id,
            path: "/projected",
            name: "已完成项目"
          }
        });
      }
    },
    // 修改单位信息
    async editexamine(id) {
      const res = await this.$http.get(`ecompany/${id}`);
      if (res.data.status === 200) {
        this.editoutsideform = res.data.entrustinfo;
        this.editoutsideDialogVisible = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 提交外委按钮
    async submitoutside() {
      this.$refs.craetoutsideform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入外委单位信息");
        }
        const res = await this.$http.post(`ecompanies`, this.craetoutsideform);
        if (res.data.status === 200) {
          this.outsideDialogVisible = false;
          this.$message.success(res.data.msg);
          this.getexamine(this.currentPage);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 提交修改外委信息
    async handleeditoutside() {
      this.$refs.editoutsideform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入外委单位信息");
        }
        const res = await this.$http.put(
          `ecompany/${this.editoutsideform.id}`,
          this.editoutsideform
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.editoutsideDialogVisible = false;
          this.getexamine(this.currentPage);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 搜索按钮
    reportssearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.getexamine(1);
      }
    }
  },
  created() {
    this.getexamine(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.getexamine(1);
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
  height: 720px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.inspeccard {
  width: 500px;
  display: inline-block;
  margin: 0 10px 6px 0px;
}
.projectpush {
  cursor: pointer;
}
.projectpush:hover {
  color: #409eff;
}
.outsideipt {
  width: 280px;
}
.outsideselect {
  width: 280px;
}
</style>

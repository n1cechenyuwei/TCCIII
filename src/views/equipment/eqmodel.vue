<template>
  <div>
    <div class="mytask-content-top">
      <el-popover
        placement="bottom-start"
        width="220"
        transition="el-zoom-in-bottom"
        trigger="click">
        <div>
          <div class="sx_li">所属项目名称：</div>
          <!-- <el-input size="mini" class="sx_li sx_input" v-model="sxform.proname" placeholder="请输入内容"></el-input> -->
          <el-select v-model="sxform.proname" class="sx_li sx_input" size="small" placeholder="请选择">
            <el-option
              v-for="item in projectoptions"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <div class="sx_li">所属受检单位名称：</div>
          <el-input size="mini" class="sx_li sx_input" v-model="sxform.company" placeholder="请输入内容"></el-input>
          <div class="sx_li">设备类型：</div>
          <el-cascader
            class="sx_li sx_input"
            size="mini"
            v-model="eqtypeid"
            :options="options">
          </el-cascader>
          <div class="sx_li">设备出入库状态：</div>
          <el-select v-model="sxform.state" class="sx_li sx_input" placeholder="请选择" size="mini">
            <el-option
              v-for="item in lioptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="sx_btn_box">
            <el-button type="primary" size="mini" @click="reqest">重置</el-button>
            <el-button type="primary" size="mini" @click="sx">筛选</el-button>
          </div>
        </div>
        <el-button style="margin-left: 20px" slot="reference" type="primary" size="small">筛选<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </el-popover>
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入设备名称"
          @keyup.enter.native="eqmentsearch"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="eqmentsearch">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table1">
        <el-table
          :data="eqpislist"
          max-height="750"
          class="mytask-content-table1-one"
          stripe
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="eq-extend_box">
                <div class="eq_row_box eq_box_left">
                  <div class="eqextendrow"><span>硬件型号：</span>{{scope.row.eq_model}}</div>
                  <div class="eqextendrow"><span>硬件厂家：</span>{{scope.row.eq_manufacturers}}</div>
                </div>
                <div class="eq_row_box">
                  <div class="eqextendrow"><span>软件型号：</span>{{scope.row.eq_version}}</div>
                  <div class="eqextendrow">
                    <span>生产单位营业执照：</span>
                    <el-button type="primary" size="mini" icon="el-icon-view" @click="eqimg(scope.row.url)"></el-button>
                  </div>
                </div>
                <div class="capzuojilu">操作记录</div>
                <el-table
                  :data="scope.row.operation_record"
                  style="width: 100%">
                  <el-table-column
                    prop="person"
                    label="操作人"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="createtime"
                    label="操作时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="state_record"
                    label="设备状态"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="receive_or_give"
                    label="接受/返还人"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="remarks"
                    label="操作内容">
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            align="center"
            label="设备编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="eq_name"
            show-overflow-tooltip
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="eq_state"
            label="设备状态"
            width="180">
          </el-table-column>
          <el-table-column
            prop="eq_type"
            label="设备类型"
            width="180">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="所属项目">
            <template slot-scope="scope">
              <span
                @click="goproject(scope.row.pro_id, scope.row.pro_iscomplete)"
                class="proje">
                {{scope.row.proname}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="apply_company"
            show-overflow-tooltip
            label="所属厂家">
          </el-table-column>
          <el-table-column
            width="180"
            show-overflow-tooltip
            prop="eq_serialnumber"
            label="设备序列号">
          </el-table-column>
          <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleeqcaozuo(scope.row)"></el-button>
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
      title="操作记录"
      :visible.sync="eqcontentDialogVisible"
      width="576px"
      @close="eqcontentclose"
      center>
      <el-form label-position="right" class="eqeqeq" :rules="eqvmsformrule" label-width="140px" ref="eqvmsform" :model="eqvmsform">
        <el-form-item label="设备名称">
          <span class="eqvmsspan">{{eqvmsform.eq_name}}</span>
        </el-form-item>
        <el-form-item label="设备类型">
          <span class="eqvmsspan">{{eqvmsform.eq_type}}</span>
        </el-form-item>
        <el-form-item label="设备序列号">
          <span class="eqvmsspan">{{eqvmsform.eq_serialnumber}}</span>
        </el-form-item>
        <el-form-item label="所属厂家">
          <span class="eqvmsspan">{{eqvmsform.apply_company}}</span>
        </el-form-item>
        <el-form-item label="接受/返还人" prop="receive_or_give">
          <el-input size="small" class="eqvmsinput" v-model="eqvmsform.receive_or_give"></el-input>
        </el-form-item>
        <el-form-item label="借入借出状态" prop="state">
          <el-select size="small" class="eqvmsinput" v-model="eqvmsform.state" placeholder="请选择">
            <el-option label="借出" value="借出"></el-option>
            <el-option label="借入" value="借入"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作内容" prop="remarks">
          <el-input
            type="textarea"
            class="eqvmsinput"
            resize="none"
            :rows="2"
            placeholder="请输入操作内容"
            v-model.trim="eqvmsform.remarks">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="eqcontentDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="eqcontenthandle">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="生产单位营业执照"
      @closed="eqimgclose"
      :visible.sync="eqimgDialogVisible"
      width="960px"
      center>
      <img width="100%" :src="eqimgpic" alt="照片丢失了">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["eqtype", "sxrequest", "sxshebei"],
  data() {
    return {
      eqmenttype: this.eqtype,
      currentPage: 1, //默认第几页
      taskpagesize: 13, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      eqcontentDialogVisible: false,
      eqimgDialogVisible: false,
      eqcontent: "", // 操作内容
      eqimgpic: "", // 图片
      eqvmsform: {
        did: "",
        eq_name: "",
        eq_type: "",
        eq_serialnumber: "",
        apply_company: "",
        receive_or_give: "",
        remarks: "",
        state: ""
      }, // 弹窗内容
      eqvmsformrule: {
        receive_or_give: [
          { required: true, message: "请输入接受/返还人", trigger: "blur" },
          { max: 6, message: "接受/返还人最长为6个汉字", trigger: "blur" }
        ],
        remarks: [
          { required: true, message: "请输入操作内容", trigger: "blur" },
          { max: 33, message: "操作内容最长为33个汉字", trigger: "blur" }
        ],
        state: [
          { required: true, message: "请选择出入库状态", trigger: "blur" }
        ]
      },
      options: [],
      eqtypeid: [],
      sxform: {
        proname: "",
        company: "",
        type: "",
        state: ""
      },
      searchtype: "1",
      lioptions: [
        {
          value: "出库",
          label: "出库"
        },
        {
          value: "入库",
          label: "入库"
        },
        {
          value: "待入库",
          label: "待入库"
        },
        {
          value: "借入",
          label: "借入"
        },
        {
          value: "借出",
          label: "借出"
        }
      ],
      projectoptions: []
    };
  },
  methods: {
    eqcontenthandle() {
      this.$refs.eqvmsform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入操作记录信息");
        }
        const res = await this.$http.post(`record/${this.eqvmsform.did}`, {
          receive_or_give: this.eqvmsform.receive_or_give,
          remarks: this.eqvmsform.remarks,
          state_record: this.eqvmsform.state
        });
        if (res.data.status === 200) {
          this.eqcontentDialogVisible = false;
          this.$message.success("操作成功");
          if (this.searchtype === "1") {
            this.pislistdata(this.currentPage);
          } else {
            this.sxqq(this.currentPage);
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 项目列表
    async getprojectdata() {
      const res = await this.$http.get(`filterprojects/${this.sxshebei}`);
      if (res.data.status === 200) {
        this.projectoptions = res.data.info;
      } else {
        this.$message.error("获取项目列表失败");
      }
    },
    // 设备操作
    handleeqcaozuo(row) {
      this.eqvmsform.did = row.id;
      this.eqvmsform.eq_name = row.eq_name;
      this.eqvmsform.eq_type = row.eq_type;
      this.eqvmsform.eq_serialnumber = row.eq_serialnumber;
      this.eqvmsform.apply_company = row.apply_company;
      this.eqcontentDialogVisible = true;
    },
    // 点击按钮显示营业执照
    eqimg(url) {
      this.eqimgpic = url;
      this.eqimgDialogVisible = true;
    },
    // 照片弹窗关闭
    eqimgclose() {
      this.eqimgpic = "";
    },
    // 弹窗关闭
    eqcontentclose() {
      this.$refs.eqvmsform.resetFields();
    },
    // 获取设备列表
    async pislistdata(page) {
      const res = await this.$http.post(`${this.eqmenttype}/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.eq_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleprojectChange(val) {
      if (this.searchtype === "1") {
        this.pislistdata(val);
      } else if (this.searchtype === "3") {
        this.sxqq(val);
      }
    },
    // 项目跳转
    goproject(projectid, router) {
      if (router === 0) {
        this.$router.push({
          name: "project",
          params: {
            id: projectid,
            path: "/goingproject",
            name: "进行中项目"
          }
        });
      } else if (router === 1) {
        this.$router.push({
          name: "project",
          params: {
            id: projectid,
            path: "/projected",
            name: "已完成项目"
          }
        });
      }
    },
    // 搜索按钮
    eqmentsearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.pislistdata(1);
      }
    },
    // 重置按钮
    reqest() {
      this.sxform.proname = "";
      this.sxform.company = "";
      this.eqtypeid = [];
      this.sxform.state = "";
      this.searchtype = "1";
      this.pislistdata(1);
    },
    // 筛选按钮
    sx() {
      if (
        this.sxform.proname === "" &&
        this.sxform.company === "" &&
        this.sxform.type === [] &&
        this.sxform.state === ""
      ) {
        this.searchtype = "1";
        this.currentPage = 1;
        this.pislistdata(this.currentPage);
      } else {
        this.searchtype = "3";
        this.currentPage = 1;
        this.sxqq(1);
      }
    },
    // 筛选请求
    async sxqq(page) {
      if (this.eqtypeid.length > 0) {
        this.sxform.type = this.eqtypeid[this.eqtypeid.length - 1];
      } else {
        this.sxform.type = null;
      }
      const res = await this.$http.post(
        `${this.sxrequest}/${page}`,
        this.sxform
      );
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.eq_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 请求设备列表
    async eqlist() {
      const res = await this.$http.get(`devicetypelist/${this.sxshebei}`);
      if (res.data.status === 200) {
        this.options = res.data.detype_info;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.pislistdata(this.currentPage);
    this.eqlist();
    this.getprojectdata();
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.pislistdata(1);
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
.mytask-content-table1 {
  height: 750px;
  min-width: 1670px;
}
.mytask-content-table1-one {
  font-size: 16px;
}
.eq_row_box {
  display: inline-block;
  vertical-align: top;
}
.eq_box_left {
  margin: 0px 600px 0px 0px;
}
.eqextendrow {
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 10px;
  /* border-bottom: 1px dashed #7e8b8e; */
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
.eqvmsinput {
  width: 300px;
}
.eqeqeq .el-form-item__label {
  padding-right: 20px;
}
.eqvmsspan {
  font-size: 16px;
}
.proje {
  cursor: pointer;
}
.proje:hover {
  color: #409eff;
}
</style>

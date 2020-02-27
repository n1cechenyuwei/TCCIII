<template>
  <div>
    <div class="mytask-content-top">
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入检测用例名称"
          @keyup.enter.native="reportssearch"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="reportssearch">搜索</el-button>
      <el-button type="success" size="mini" @click="createcasesDialogVisible = true">新建用例</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table1">
        <el-table
          :data="eqpislist"
          class="mytask-content-table-one"
          stripe
          max-height="740"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div class="case-left caseextend-left">
                <div class="casestitlebox">
                  <div class="case-left casetitle-left">
                    前提条件
                  </div>
                  <div class="case-left">
                    <div class="case-tiaojain">{{scope.row.precondition}}</div>
                  </div>
                </div>
                <div class="casestitlebox">
                  <div class="case-left casetitle-left">预期结果</div>
                  <div class="case-left case-tiaojain">{{scope.row.expectedresult}}</div>
                </div>
                <div class="casestitlebox">
                  <div class="case-left casetitle-left">报文</div>
                  <div class="case-left case-tiaojain">{{scope.row.msg}}</div>
                </div>
              </div>
              <div class="case-left caseextend-right">
                <div class="case-left casetitle-left">
                  步骤描述
                </div>
                <div class="case-left">
                  <div class="case-tiaojain">{{scope.row.step}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="case_num"
            show-overflow-tooltip
            label="用例编号">
          </el-table-column>
          <el-table-column
            prop="case_name"
            show-overflow-tooltip
            label="用例名称">
          </el-table-column>
          <el-table-column
            prop="priority"
            width="150"
            show-overflow-tooltip
            label="优先级别">
          </el-table-column>
          <el-table-column
            width="200"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handlecases(scope.row.id)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="handledeletecase(scope.row.id)"></el-button>
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
    <!-- 新建用例 -->
    <el-dialog
      title="新建用例"
      :visible.sync="createcasesDialogVisible"
      width="576px"
      @close="caseclose"
      center>
      <el-form label-position="right" style="text-align: left" :rules="createCaseformrules" ref="createCaseform" class="casefrom" label-width="80px" :model="createCaseform">
        <el-form-item label="用例编号" prop="case_num">
          <el-input size="small" class="caseinput" v-model="createCaseform.case_num"></el-input>
        </el-form-item>
        <el-form-item label="用例名称" prop="case_name">
          <el-input size="small" class="caseinput" v-model="createCaseform.case_name"></el-input>
        </el-form-item>
        <el-form-item label="优先级别" prop="priority">
          <el-input size="small" class="caseinput" v-model="createCaseform.priority"></el-input>
        </el-form-item>
        <el-form-item label="前提条件" prop="precondition">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="createCaseform.precondition"></el-input>
          <div class="tishi">每个条件请以"回车"键分隔</div>
        </el-form-item>
        <el-form-item label="步骤描述" prop="step">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="createCaseform.step"></el-input>
          <div class="tishi">每个步骤请以"回车"键分隔</div>
        </el-form-item>
        <el-form-item label="预期结果" prop="expectedresult">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="createCaseform.expectedresult"></el-input>
          <div class="tishi">每个结果请以"回车"键分隔</div>
        </el-form-item>
        <el-form-item label="报文" prop="msg">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="createCaseform.msg"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createcasesDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="createcases">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用例 -->
    <el-dialog
      title="修改用例"
      :visible.sync="editcasesDialogVisible"
      width="576px"
      @close="editcaseclose"
      center>
      <el-form label-position="right" style="text-align: left" :rules="editCaseformrules" ref="editCaseform" class="casefrom" label-width="80px" :model="editCaseform">
        <el-form-item label="用例编号" prop="case_num">
          <el-input size="small" class="caseinput" v-model="editCaseform.case_num"></el-input>
        </el-form-item>
        <el-form-item label="用例名称" prop="case_name">
          <el-input size="small" class="caseinput" v-model="editCaseform.case_name"></el-input>
        </el-form-item>
        <el-form-item label="优先级别" prop="priority">
          <el-input size="small" class="caseinput" v-model="editCaseform.priority"></el-input>
        </el-form-item>
        <el-form-item label="前提条件" prop="precondition">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="editCaseform.precondition"></el-input>
          <div class="tishi">每个条件请以"回车"键分隔</div>
        </el-form-item>
        <el-form-item label="步骤描述" prop="step">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="editCaseform.step"></el-input>
          <div class="tishi">每个步骤请以"回车"键分隔</div>
        </el-form-item>
        <el-form-item label="预期结果" prop="expectedresult">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="editCaseform.expectedresult"></el-input>
          <div class="tishi">每条结果请以"回车"键分隔</div>
        </el-form-item>
        <el-form-item label="报文" prop="msg">
          <el-input size="small" class="caseinput" type="textarea" :rows="3" resize="none" v-model="editCaseform.msg"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editcasesDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editcases">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["getcase", "casestatus"],
  data() {
    return {
      casestype: this.casestatus,
      casesdata: this.getcase,
      currentPage: 1, //默认第几页
      taskpagesize: 13, //每页显示几条
      eqpistotal: 0,
      eqpislist: [], // vms用例数据
      myprojectsearch: "",
      createcasesDialogVisible: false,
      editcasesDialogVisible: false,
      createCaseform: {
        case_num: "",
        case_name: "",
        priority: "",
        precondition: "",
        step: "",
        expectedresult: "",
        msg: ""
      },
      createCaseformrules: {
        case_num: [
          { required: true, message: "请输入用例编号", trigger: "blur" },
          { max: 50, message: "用例编号最长为50个字符", trigger: "blur" }
        ],
        case_name: [
          { required: true, message: "请输入用例名称", trigger: "blur" },
          { max: 50, message: "用例名称最长为50个字符", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "请输入优先级别", trigger: "blur" },
          { max: 3, message: "优先级别最长为3个字符", trigger: "blur" }
        ],
        precondition: [
          { required: true, message: "请输入前提条件", trigger: "blur" },
          { max: 600, message: "前提条件最长为600个字符", trigger: "blur" }
        ],
        step: [
          { required: true, message: "请输入步骤描述", trigger: "blur" },
          { max: 600, message: "步骤描述最长为600个字符", trigger: "blur" }
        ],
        expectedresult: [
          { required: true, message: "请输入预期结果", trigger: "blur" },
          { max: 600, message: "预期结果最长为600个字符", trigger: "blur" }
        ],
        msg: [{ max: 600, message: "报文最长为600个字符", trigger: "blur" }]
      },
      editCaseform: {},
      editCaseformrules: {
        case_num: [
          { required: true, message: "请输入用例编号", trigger: "blur" },
          { max: 50, message: "用例编号最长为50个字符", trigger: "blur" }
        ],
        case_name: [
          { required: true, message: "请输入用例名称", trigger: "blur" },
          { max: 50, message: "用例名称最长为50个字符", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "请输入优先级别", trigger: "blur" },
          { max: 3, message: "优先级别最长为3个字符", trigger: "blur" }
        ],
        precondition: [
          { required: true, message: "请输入前提条件", trigger: "blur" },
          { max: 600, message: "前提条件最长为600个字符", trigger: "blur" }
        ],
        step: [
          { required: true, message: "请输入步骤描述", trigger: "blur" },
          { max: 600, message: "步骤描述最长为600个字符", trigger: "blur" }
        ],
        expectedresult: [
          { required: true, message: "请输入预期结果", trigger: "blur" },
          { max: 600, message: "预期结果最长为600个字符", trigger: "blur" }
        ],
        msg: [{ max: 600, message: "报文最长为600个字符", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleprojectChange(val) {
      this.getvmscases(val);
    },
    async handlecases(id) {
      const res = await this.$http.get(`case/${id}`);
      if (res.data.status === 200) {
        this.editCaseform = res.data.case_info;
        this.editcasesDialogVisible = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    caseclose() {
      this.$refs.createCaseform.resetFields();
    },
    editcaseclose() {
      this.$refs.editCaseform.resetFields();
    },
    // 获取pis用例
    async getvmscases(page) {
      const res = await this.$http.post(`${this.casesdata}/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.usecase_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 新建pis用例
    createcases() {
      this.$refs.createCaseform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入用例信息");
        }
        const res = await this.$http.post(
          `${this.casestype}`,
          this.createCaseform
        );
        if (res.data.status === 200) {
          this.$message.success("创建成功");
          this.getvmscases(this.currentPage);
          this.createcasesDialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改用例信息
    editcases() {
      this.$refs.editCaseform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入用例信息");
        }
        const res = await this.$http.put(
          `case/${this.editCaseform.id}`,
          this.editCaseform
        );
        if (res.data.status === 200) {
          this.$message.success("用例信息更新成功");
          this.getvmscases(this.currentPage);
          this.editcasesDialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除用例
    async handledeletecase(id) {
      this.$confirm("确定要删除该检测用例吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`case/${id}`);
          if (res.data.status === 200) {
            this.$message.success("用例删除成功");
            this.getvmscases(this.currentPage);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 搜索按钮
    reportssearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.getvmscases(1);
      }
    }
  },
  created() {
    this.getvmscases(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.getvmscases(1);
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
  height: 740px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.case-left {
  display: inline-block;
  vertical-align: top;
}
.caseextend-left {
  margin: 10px 100px 0 0;
  width: 720px;
}
.caseextend-right {
  width: 700px;
  margin: 10px 0 0 0;
}
.case-tiaojain {
  max-width: 600px;
  margin-bottom: 8px;
  color: #303133;
  white-space: pre-line;
}
.casetitle-left {
  width: 70px;
  margin: 0 30px 0 0;
}
.casestitlebox {
  margin-bottom: 10px;
}
.casefrom .el-form-item {
  margin-bottom: 18px !important;
}
.caseinput {
  width: 350px;
  font-size: 14px;
  vertical-align: top;
}
.tishi {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  color: #e6a23c;
  vertical-align: middle;
  width: 70px;
  line-height: 24px;
}
</style>

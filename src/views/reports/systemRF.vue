<template>
  <div>
    <div class="mytask-content-top">
      <div style="padding-top: 10px">
        <span class="top_title">项目名称</span>
        <el-input
          size="small"
          style="width: 200px"
          placeholder="请输入项目名称"
          @keyup.enter.native="reports(1)"
          v-model="projectsearch">
        </el-input>
        <span class="top_title" style="margin-left: 100px">受检单位名称</span>
        <el-input
          size="small"
          style="width: 200px; margin-right: 50px"
          placeholder="请输入项目名称"
          @keyup.enter.native="reports(1)"
          v-model="dwsearch">
        </el-input>
        <el-button type="primary" size="mini" @click="reports(1)">搜索</el-button>
        <el-button type="primary" size="mini" @click="requestrearch">重置</el-button>
      </div>
      
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="eqpislist"
          class="mytask-content-table-one"
          stripe
          height="740"
          style="width: 100%">
          <el-table-column
            type="expand">
            <template slot-scope="scope">
              <el-card shadow="hover" class="reportscard">
                <el-table
                  :data="scope.row.report_info"
                  stripe
                  style="width: 100%; margin: 0 auto;">
                  <el-table-column
                    prop="report_name"
                    label="名称">
                  </el-table-column>
                  <el-table-column
                    prop="createtime"
                    label="生成时间"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    width="180"
                    label="下载">
                    <template slot-scope="scoperow">
                      <a :href="scoperow.row.download_url" :download="scoperow.row.download_url">
                        <el-button size="mini" type="primary" icon="el-icon-download"></el-button>
                      </a>
                      <el-button @click="reportdelete(scoperow.row.id, scope.row.taskid, scope.row.proid)" style="margin: 0 0 0 6px;" size="mini" type="danger" icon="el-icon-delete"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-card>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="所属项目">
            <template slot-scope="scope">
              <span
                @click="goproject(scope.row.proid, scope.row.pro_iscomplete)"
                class="proje">
                {{scope.row.pro_name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="company"
            show-overflow-tooltip
            label="所属厂家">
          </el-table-column>
          <el-table-column
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="openchugao(scope.row.taskid, scope.row.proid)" size="mini" type="primary">生成初稿</el-button>
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
    <!-- 报告审核测试用例弹窗 -->
    <el-dialog
      title="用例详情"
      :visible.sync="caseshow"
      width="576px">
      <el-tree
        :data="caselist"
        show-checkbox
        ref="vmscasetree"
        node-key="id"
        v-loading="caseloading"
        element-loading-text="测试用例加载中"
        accordion
        :props="{ label: 'name', children: 'case_list' }">
      </el-tree>
      <div class="deca-btn">
        <el-button plain type="success" size="small" @click="caseshow = false">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="handleCheckChange">生成报告</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["reportdata", "sxrequest"],
  data() {
    return {
      firstreportdata: this.reportdata,
      currentPage: 1, //默认第几页
      taskpagesize: 13, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      caseshow: false,
      caselist: [],
      caseloading: false,
      checkedKeys: [], // 选中的测试用例
      devid: "", // id
      projclick: "",
      projectsearch: "",
      dwsearch: "",
      proid: "",
    };
  },
  methods: {
    async reports(page) {
      const res = await this.$http.post(`${this.firstreportdata}/${page}`, {
        proname: this.projectsearch,
        company: this.dwsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.report_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleprojectChange(val) {
      if (this.searchtype === "1") {
        this.reports(val);
      } else if (this.searchtype === "3") {
        this.sxqq(val);
      }
    },
    // 重置按钮
    requestrearch() {
      this.projectsearch = "";
      this.dwsearch = "";
      this.reports(1);
    },
    // 生成初稿
    async openchugao(devid, proid) {
      this.proid = proid;
      this.devid = devid;
      this.caseshow = true;
      this.caseloading = true;
      const res = await this.$http.get(`getsysreportcase/${devid}`);
      if (res.data.status === 200) {
        this.caselist = res.data.case_info;
        this.caseloading = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 发送生成初稿
    async handleCheckChange() {
      const alllist = this.$refs.vmscasetree.getCheckedNodes(false, true);
      const ckeys = this.$refs.vmscasetree.getCheckedNodes(true, true);
      let fnodes = []; // 包含子节点
      let fkey = []; // 不包含子节点
      for (let i = 0; i < alllist.length; i++) {
        if (alllist[i].case_list) {
          let fnode = {
            name: "",
            case_list: []
          };
          fnode.name = alllist[i].name;
          fnodes.push(alllist[i]);
          fkey.push(fnode);
        }
      }
      for (let k = 0; k < ckeys.length; k++) {
        let qqq = 0;
        for (let q = 0; q < fnodes.length; q++) {
          let www = 0;
          for (let w = 0; w < fnodes[q].case_list.length; w++) {
            if (ckeys[k].id === fnodes[q].case_list[w].id) {
              for (let e = 0; e < fkey.length; e++) {
                if (fkey[e].name == fnodes[q].name) {
                  fkey[e].case_list.push(ckeys[k]);
                  qqq = 1;
                  www === 1;
                  break;
                }
              }
            }
            if (www === 1) {
              break;
            }
          }
          if (qqq === 1) {
            break;
          }
        }
      }
      if (ckeys.length === 0) {
        this.$message.error("请选择用例");
      } else {
        const res = await this.$http.post(
          `generatereport`,
          {
            caseid_list: fkey,
            devi_id: 0,
            taskid: this.devid
          }
        );
        if (res.data.status === 200) {
          this.$message.success("报告生成成功");
          this.upload();
          this.caseshow = false;
          // this.$store.state.caselistshow = false;
          // this.$store.dispatch("draft_report", this.$store.state.devid);
        } else {
          this.$message.error(res.data.msg);
        }
      }
    },
    // 项目跳转
    goproject(projectid, router) {
      if (this.projclick === 1) {
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
      } else {
        return this.$message.error("没有该权限");
      }
    },
    // 外委报告删除
    reportdelete(id, devid, proid) {
      this.devid = devid;
      this.proid = proid;
      this.$confirm(`确定删除该报告吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`report/${id}`);
          if (res.data.status === 200) {
            this.upload();
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.data.mag);
          }
        })
        .catch(() => {});
    },
    // 局部刷新
    async upload() {
      const res = await this.$http.get(`sysdraftreportlocalsearch/${this.proid}`);
      if (res.data.status === 200) {
        this.eqpislist.forEach(obj => {
          if (obj.taskid === this.devid) {
            obj.report_info = res.data.reports_list;
          }
        });
      }
    },
    async project_click() {
      const res = await this.$http.get("getpermistree");
      if (res.data.permis_list) {
        for (const item of res.data.permis_list) {
          if (item.route === "/project") {
            for (const li2 of item.children) {
              if (li2.name === "项目") {
                for (const li3 of li2.children) {
                  if (li3.route === "/projectdetails") {
                    this.projclick = 1;
                    break;
                  }
                }
              }
              break;
            }
          }
        }
      } else {
        this.$router.push({ name: "login" });
        this.$message.error("登陆过期，请重新登录");
      }
    }
  },
  created() {
    this.reports(this.currentPage);
    this.project_click();
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.reports(1);
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
  height: 760px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.proje {
  cursor: pointer;
}
.proje:hover {
  color: #409eff;
}
.deca-btn {
  text-align: center;
  padding-top: 10px;
}
.reportscard {
  margin: 0 0 10px 0;
}
.reportscard .el-card__body {
  padding: 10px 40px;
}
.report-title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  position: relative;
  color: #606266;
  height: 34px;
  /* line-height: 30px; */
  border-bottom: 1px solid #dcdfe6;
}
.report-title-btn {
  position: absolute;
  right: 20px;
}
</style>

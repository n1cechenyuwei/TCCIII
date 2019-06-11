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
          placeholder="请输入设备名称"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="reportssearch">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="eqpislist"
          class="mytask-content-table-one"
          stripe
          height="750"
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
                      <el-button @click="reportdelete(scoperow.row.id, scope.row.device_id)" style="margin: 0 0 0 6px;" size="mini" type="danger" icon="el-icon-delete"></el-button>
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
            prop="device_name"
            show-overflow-tooltip
            label="设备名称">
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
              <el-button @click="openchugao(scope.row.device_id)" size="mini" type="primary">生成初稿</el-button>
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
  props: ["reportdata"],
  data() {
    return {
      firstreportdata: this.reportdata,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      caseshow: false,
      caselist: [],
      caseloading: false,
      checkedKeys: [], // 选中的测试用例
      devid: "", // 设备id
      projclick: ""
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
    async reports(page) {
      const res = await this.$http.post(`${this.firstreportdata}/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.report_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleprojectChange(val) {
      this.reports(val);
    },
    // 生成初稿
    async openchugao(devid) {
      this.devid = devid;
      this.caseshow = true;
      this.caseloading = true;
      const res = await this.$http.get(`getcase/${devid}`);
      if (res.data.status === 200) {
        this.caselist = res.data.case_info;
        this.caseloading = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 发送生成初稿
    async handleCheckChange() {
      const checkedKeys = this.$refs.vmscasetree.getCheckedKeys();
      if (checkedKeys.length === 0) {
        this.$message.error("请选择测试用例");
      } else {
        let newArr = checkedKeys.filter(item => item != undefined);
        const res = await this.$http.post(`generatereport/${this.devid}`, {
          caseid_list: newArr
        });
        if (res.data.status === 200) {
          this.$message.success("报告生成成功");
          this.upload();
          this.caseshow = false;
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
    reportdelete(id, devid) {
      this.devid = devid;
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
      const res = await this.$http.get(`draftlocalsearch/${this.devid}`);
      if (res.data.status === 200) {
        this.eqpislist.forEach(obj => {
          if (obj.device_id === this.devid) {
            obj.report_info = res.data.reports_list;
          }
        });
      }
    },
    // 搜索按钮
    reportssearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.reports(1);
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

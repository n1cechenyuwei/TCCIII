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
          <el-input v-model="sxform.proname" class="sx_li sx_input" placeholder="请输入内容" size="mini"></el-input>
          <div class="sx_li">所属受检单位名称：</div>
          <el-input v-model="sxform.company" class="sx_li sx_input" placeholder="请输入内容" size="mini"></el-input>
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
          @keyup.enter.native="reportssearch"
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
          v-loading="up_disabled"
          element-loading-text="文件上传中，请稍等"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(256, 256, 256, 0.8)"
          height="760"
          style="width: 100%">
          <el-table-column
            type="expand">
            <template slot-scope="scope">
              <el-card shadow="hover">
                <el-table
                  :data="scope.row.report_info"
                  stripe
                  style="width: 96%; margin: 0 auto;">
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
              <el-upload
                class="upload-demo"
                accept=".docx, .doc, .pdf, .xlsx, .txt"
                name="filename"
                :action="$store.state.baseurl + reportsuploadurl"
                :show-file-list="false"
                :headers="httpheader"
                :http-request="uploador"
                :on-error="uploaderror"
                :data="{ did: scope.row.device_id }"
                :multiple="false">
                <el-button @click="uploadbtn(scope.row.device_id)" size="mini" type="primary">上传报告</el-button>
              </el-upload>
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
  </div>
</template>

<script>
export default {
  props: ["alldata", "load", "uploadurl", "sxrequest"],
  data() {
    return {
      httpheader: {
        token: ""
      },
      reprotsalldata: this.alldata,
      reportsload: this.load,
      reportsuploadurl: this.uploadurl,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      devid: "", // 设备id
      up_disabled: false,
      projclick: "",
      sxform: {
        proname: "",
        company: ""
      },
      searchtype: "1"
    };
  },
  methods: {
    async uploador(params) {
      if (params.file) {
        const res = await this.$http.get(
          `verificationpermissions/${this.reportsuploadurl}`
        );
        if (res.data.status === 333) {
          return this.$message.error(res.data.msg);
        } else if (res.data.status === 222) {
          this.up_disabled = true;
          const _file = params.file;
          let formData = new FormData();
          formData.append("filename", _file);
          formData.append("did", params.data.did);
          const res2 = await this.$http.post(
            `${this.reportsuploadurl}`,
            formData
          );
          if (res2.data.status === 200) {
            this.up_disabled = false;
            this.$message.success("上传成功");
            this.updata();
          } else {
            this.up_disabled = false;
            this.$message.error(res2.data.msg);
          }
        }
      }
    },
    token() {
      const token = sessionStorage.getItem("token");
      this.httpheader.token = token;
    },
    async reports(page) {
      const res = await this.$http.post(`${this.reprotsalldata}/${page}`, {
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
      if (this.searchtype === "1") {
        this.reports(val);
      } else if (this.searchtype === "3") {
        this.sxqq(val);
      }
    },
    uploadbtn(devid) {
      this.devid = devid;
    },
    uploaderror() {
      this.$message.error("上传失败");
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
    // 终稿删除
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
            this.$message.success("删除成功");
            this.updata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 局部刷新
    async updata() {
      const res = await this.$http.get(`${this.reportsload}/${this.devid}`);
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
    },
    // 重置按钮
    reqest() {
      this.sxform.proname = "";
      this.sxform.company = "";
      this.searchtype = "1";
      this.sxqq(1);
    },
    // 筛选按钮
    sx() {
      if (this.sxform.proname === "" && this.sxform.company === "") {
        this.searchtype = "1";
        this.currentPage = 1;
        this.reports(1);
      } else {
        this.searchtype = "3";
        this.currentPage = 1;
        this.sxqq(1);
      }
    },
    // 筛选请求
    async sxqq(page) {
      const res = await this.$http.post(
        `${this.sxrequest}/${page}`,
        this.sxform
      );
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.report_list;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.reports(this.currentPage);
    this.token();
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
</style>

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
          placeholder="请输入报告名称"
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
                :on-success="uploadsuccess"
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
  props: ["alldata", "load", "uploadurl"],
  data() {
    return {
      reprotsalldata: this.alldata,
      reportsload: this.load,
      reportsuploadurl: this.uploadurl,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      devid: "" // 设备id
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
      this.reports(val);
    },
    uploadbtn(devid) {
      this.devid = devid;
    },
    // 上传成功
    uploadsuccess() {
      this.$message.success("上传成功");
      this.updata();
    },
    uploaderror() {
      this.$message.error("上传失败");
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
          if (res.status === 200) {
            this.$message.success("删除成功");
            this.updata();
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
    }
  },
  created() {
    this.reports(this.currentPage);
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
  height: 720px;
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

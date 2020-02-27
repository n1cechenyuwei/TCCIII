<template>
  <div>
    <div class="mydoc-top">
      <div class="breac">
        <span class="tiaozhuan" @click="pushdocument">{{levelthreedata.breacname}} </span>
        <i class="mianbaoicon el-icon-arrow-right"></i>
        <span class="butiaozhuan"> {{levelthreedata.leveltwoname}}</span>
      </div>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table3">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one3"
          stripe
          height="780"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
            <template slot-scope="scope">
              <i class="iconfont wenjianjia icon-tubiaozhizuomoban"></i>
              <span class="docclick" @click="tolevelthree(scope.row)">{{scope.row.name}}</span>
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
        :total="projecttotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      projectlist: [],
      levelthreedata: {
        id: "",
        breacname: "",
        breacpath: "",
        leveltwoname: "",
        leveltwopath: "docleveltwo",
        toid: "",
        levelthreename: "",
        geturl: "",
        upname: "",
        upaction: "",
        updataname: "",
        updataid: "",
        btnname: ""
      }
    };
  },
  methods: {
    loadingdata() {
      this.levelthreedata.id = this.$route.params.nextdata.id;
      this.levelthreedata.leveltwoname = this.$route.params.nextdata.leveltwoname;
      this.levelthreedata.breacname = this.$route.params.nextdata.breacname;
      this.levelthreedata.breacpath = this.$route.params.nextdata.breacpath;
      this.leveltwodata(this.currentPage);
    },
    handleprojectChange(val) {
      this.leveltwodata(val);
    },
    tolevelthree(row) {
      this.levelthreedata.levelthreename = row.name;
      this.levelthreedata.toid = row.id;
      if (row.name === "合同文档") {
        this.levelthreedata.geturl = "compactdocs";
        this.levelthreedata.upname = "compactfile";
        this.levelthreedata.upaction = "uploadcompact";
        this.levelthreedata.updataname = "com_no";
        this.levelthreedata.updataid = row.id;
        this.levelthreedata.btnname = "上传合同终稿";
      } else if (row.name === "其他文档") {
        this.levelthreedata.geturl = "otherdocs";
        this.levelthreedata.upname = "file";
        this.levelthreedata.upaction = "uploadotherdocs";
        this.levelthreedata.updataname = "proid";
        this.levelthreedata.updataid = row.id;
        this.levelthreedata.btnname = "上传文档";
      } else if (row.name === "系统检测报告") {
        this.levelthreedata.geturl = "sysreportlist";
        this.levelthreedata.upname = "filename";
        this.levelthreedata.upaction = "uploaddefinalreport";
        this.levelthreedata.updataname = "taskid";
        this.levelthreedata.updataid = row.taskid;
        this.levelthreedata.btnname = "上传系统报告";
      } else {
        this.levelthreedata.geturl = "reportdocs";
        this.levelthreedata.upname = "filename";
        this.levelthreedata.updataname = "did";
        this.levelthreedata.updataid = row.id;
        if (row.isentrust === 0) {
          this.levelthreedata.upaction = "uploaddefinalreport";
          this.levelthreedata.btnname = "上传报告终稿";
        } else {
          this.levelthreedata.upaction = "dereport";
          this.levelthreedata.btnname = "上传外委报告";
        }
      }
      this.$router.push({
        name: "doclevelthree",
        params: {
          nextdata: this.levelthreedata
        }
      });
    },
    async leveltwodata(page) {
      const res = await this.$http.get(
        `childrenmenu/${this.levelthreedata.id}/${page}`
      );
      // console.log(res)
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.menu;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    pushdocument() {
      this.$router.push({
        name: this.levelthreedata.breacpath
      });
    }
  },
  created() {
    this.loadingdata();
  }
};
</script>

<style>
.mydoc-top {
  height: 44px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
}
.mytask-content-table3 {
  height: 780px;
}
.mytask-content-table-one3 {
  font-size: 16px;
}
.breac {
  margin: 0 0 0 40px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  /* font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif; */
  height: 44px;
}
.wenjianjia {
  font-size: 28px;
  color: #ffd659;
  position: relative;
  top: 4px;
  margin: 0 10px 0 0;
}
.docclick {
  cursor: pointer;
}
.docclick:hover {
  color: #409eff;
}
.tiaozhuan {
  cursor: pointer;
}
.tiaozhuan:hover {
  color: #409eff;
}
.mianbaoicon {
  font-size: 14px;
  color: #c0c4cc;
}
.butiaozhuan {
  color: #606266;
  font-weight: normal;
}
</style>

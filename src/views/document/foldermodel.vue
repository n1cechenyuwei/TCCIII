<template>
  <div>
    <div class="mydoc-top">
      <div class="breac">{{this.propsdata.breacname}}</div>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table4">
        <el-table
          v-loading="loading"
          :data="projectlist"
          class="mytask-content-table-one4"
          stripe
          height="760"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
            <template slot-scope="scope">
              <i class="iconfont wenjianjia icon-tubiaozhizuomoban"></i>
              <span class="docclick" @click="nexttoleveltwo(scope.row)">{{scope.row.name}}</span>
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
  props: ["propsdata"],
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      loading: false,
      projectlist: [],
      todata: {
        breacname: "",
        breacpath: "",
        id: "",
        leveltwoname: ""
      }
    };
  },
  methods: {
    handleprojectChange(val) {
      this.getdata(val);
    },
    nexttoleveltwo(row) {
      this.todata.id = row.id;
      this.todata.leveltwoname = row.name;
      this.$router.push({
        name: "docleveltwo",
        params: {
          nextdata: this.todata
        }
      });
    },
    getloadingdata() {
      this.todata.breacname = this.propsdata.breacname;
      this.todata.breacpath = this.propsdata.breacpath;
      this.getdata(this.currentPage);
    },
    async getdata(page) {
      this.loading = true;
      const res = await this.$http.get(`${this.propsdata.propsstatus}/${page}`);
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.folder;
        this.loading = false;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.getloadingdata();
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
.mytask-content-table4 {
  height: 780px;
}
.mytask-content-table-one4 {
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
</style>

<template>
  <el-tabs tab-position="top"
    v-loading="tabsloading"
    @tab-click="handleTabClickDate"
    class="tabs-date"
    v-model="datedate">
    <el-tab-pane :label="item" v-for="(item, index) in date" :key="index">
      <div class="list">
        <div class="list1" v-for="item in projectlist" :key="item.id">
          <el-tooltip :content="item.pro_name" placement="top">
            <i class="listname">{{item.pro_name}}</i>
          </el-tooltip>
          <div class="progress-line"><el-progress :percentage="item.sechedule" :status="item.status"></el-progress></div>
          <div class="objtime">{{item.starttime}}</div>
        </div>
        <div v-if="projectlist.length === 0">当前没有项目</div>
      </div>
      <div class="page">
        <el-pagination
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          :page-size="projectpagesize"
          layout="total, prev, pager, next"
          :total="projectpagetotal">
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: ["url"],
  data() {
    return {
      projectlist: [], //项目数据
      datedate: "", //年份tab绑定数据
      projectpagesize: 2, //顶部项目模块分页每页多少条
      projectpagetotal: 0, //顶部项目模块总共多少条
      currentPage: 1, //默认第几页
      date: [], //年
      datetwo: "", //请求日期
      tabsloading: true //加载效果
    };
  },
  created() {
    this.tabTime();
    this.tabsget();
  },
  methods: {
    //日期tab点击发送时间
    handleTabClickDate(tab) {
      this.currentPage = 1;
      this.datetwo = tab.label;
      this.tabsget();
    },
    // 项目是否完成处理函数
    project(pro) {
      pro.forEach(obj => {
        if (obj.sechedule === 100) {
          obj.status = "success";
        } else {
          obj.status = "";
        }
      });
    },
    //tabs栏时间处理函数
    tabTime() {
      const timeone = new Date();
      let Y = timeone.getFullYear();
      Y = Y + "";
      this.date.push(Y);
      for (let i = 0; i < 2; i++) {
        Y--;
        Y = Y + "";
        this.date.push(Y);
      }
      this.datetwo = this.date[0];
    },
    //tabs栏发请求
    async tabsget() {
      const resdata = await this.$http.get(
        `${this.url}/${this.datetwo}/${this.currentPage}`
      );
      if (resdata.status === 200) {
        this.projectpagetotal = resdata.data_total;
        this.projectlist = resdata.pro_list;
        this.project(this.projectlist);
        this.tabsloading = false;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tabsget();
    }
  }
};
</script>

<style>
.tabs-date {
  height: 100%;
}
.list {
  height: 230px;
}
.list1 {
  height: 30px;
  line-height: 30px;
  position: relative;
  margin-bottom: 20px;
}
.listname {
  position: absolute;
  top: 0;
  display: inline-block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
}
.progress-line {
  display: inline-block;
  width: 500px;
  position: absolute;
  top: 5px;
  left: 170px;
}
.objtime {
  position: absolute;
  right: 0;
  color: #505b6f;
}
.page {
  margin-top: 20px;
}
</style>

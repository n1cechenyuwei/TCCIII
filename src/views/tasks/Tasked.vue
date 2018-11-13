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
          placeholder="请输入任务名称"
          v-model="taskedsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>
      <el-button type="primary" size="mini">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="tasked-list">
        <div class="tasked-list-one" v-for="(item, index) in $store.state.task" :key="index" :class="{singular: index % 2 === 0}">
          <span class="tasked-list-index">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{index + 1}}.&nbsp;&nbsp;</span>
          <span class="tasked-list-name">{{item.objname}}</span>
          <el-tag type="success" size="small" class="tasked-list-tag">100%</el-tag>
          <span class="tasked-list-time">2018-09-12</span>
        </div>
      </div>
       <el-pagination
          class="page"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
          :page-size="taskpagesize"
          layout="total, prev, pager, next, jumper"
          :total="taskpagetotal">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskedsearch: "", //搜索框
      currentPage: 1, //默认第几页
      taskpagesize: 18, //每页几条
      taskpagetotal: 100 //总共多少条
    };
  },
  methods: {
    //按钮事件案例
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    //分页事件
    handlePageChange(val) {
      console.log(val);
    }
  }
};
</script>

<style>
.mytask-content-top {
  height: 54px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  /* border-top-right-radius: 6px; */
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
.tasked-list-one {
  height: 46px;
  line-height: 46px;
  color: #515b6f;
  font-size: 18px;
  position: relative;
  cursor: pointer;
  /* margin-left: 30px; */
  border-bottom: 1px solid #ebeef5;
}
.tasked-list-one:hover {
  background-color: #f5f7fa;
}
.tasked-list {
  margin-top: 10px;
}
.tasked-list-tag {
  margin-left: 10px;
  vertical-align: middle;
  margin-bottom: 4px;
}
.tasked-list-time {
  position: absolute;
  right: 60px;
}
.singular {
  background-color: #fafafa;
}
</style>

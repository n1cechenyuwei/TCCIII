<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/mytask"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="1">
            <template slot="title">
              <span class="taskmenu-tittle">任务</span>
            </template>
            <el-menu-item index="/mytask" class="zuobian">我的任务</el-menu-item>
            <el-menu-item index="/tasked" class="zuobian">已完成任务</el-menu-item>
            <el-menu-item index="/alltask" class="zuobian">全部任务</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <span slot="title" class="taskmenu-tittle">任务统计</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" class="taskmenu-tittle">任务分配</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="task-content">
      <div class="task-content-box">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      abc: ""
    };
  },
  created() {
    this.$router.push({ name: "mytask" });
  }
};
</script>

<style>
.task-box {
  height: 100%;
  box-sizing: border-box;
}
.taskmenu-box {
  width: 220px;
  height: 100%;
  box-sizing: border-box;
  padding: 6px 0;
  background-color: #fff;
  /* border-top-right-radius: 6px; */
  border-bottom-right-radius: 6px;
  border: 1px solid #d4d7d7;
  border-left: 0;
  border-right: 1px solid #d4d7d7;
}
.taskmenu-box .taskmenu {
  height: 100%;
}
.zuobian {
  margin-left: 30px;
  font-size: 16px;
}
.taskmenu-box .el-menu-vertical-demo.taskmenu.el-menu {
  border-right: 0;
}
.taskmenu-box .el-menu-item.zuobian {
  min-width: 188px !important;
}
.taskmenu-box .el-menu-item.zuobian.is-active {
  border-left: 2px solid #409eff;
  background-color: #f1f9fe;
  min-width: 180px !important;
  width: 189px;
  padding-left: 38px !important;
}
.task-content {
  padding: 0 0 0 10px;
  height: 100%;
  min-height: 800px;
}
.task-content-box {
  border: 1px solid #d4d7d7;
  height: 100%;
  background-color: #fff;
  /* border-radius: 6px; */
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  box-sizing: border-box;
}
.taskmenu-tittle {
  font-size: 18px;
}
</style>

<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/mytask"
          @select="handleSelect"
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
          <el-menu-item index="/taskStatistical">
            <span slot="title" class="taskmenu-tittle">任务统计</span>
          </el-menu-item>
          <el-menu-item index="/taskallot">
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
  },
  methods: {
    // 选中菜单关闭右侧滑块
    handleSelect() {
      this.$store.commit("taskhuakuaihidden");
    }
  }
};
</script>

<style>
.zuobian {
  margin-left: 30px;
  font-size: 16px;
}
.task-content {
  padding: 0 0 0 10px;
  height: 100%;
  min-height: 800px;
}
</style>

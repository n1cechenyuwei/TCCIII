<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/defects"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="1">
            <template slot="title">
              <span class="taskmenu-tittle">模拟培训</span>
            </template>
            <el-menu-item index="/testBusiness" class="zuobian">测试业务培训</el-menu-item>
            <el-menu-item index="/systemrun" class="zuobian">系统运营培训</el-menu-item>
            <el-menu-item index="/maintain" class="zuobian">系统维护培训</el-menu-item>
          </el-submenu>
           <el-submenu index="2">
            <template slot="title">
              <span class="taskmenu-tittle">缺陷管理</span>
            </template>
            <el-menu-item index="/defects" class="zuobian">待修复缺陷</el-menu-item>
            <el-menu-item index="/nodefects" class="zuobian">已修复缺陷</el-menu-item>
          </el-submenu>
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
    return {};
  },
  created() {
    this.$router.push({ name: "defects" });
  },
  methods: {}
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

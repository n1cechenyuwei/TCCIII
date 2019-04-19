<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/pisReportsfirstdraft"
          @select="handleSelect"
          :unique-opened="true"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="1">
            <template slot="title">
              <span class="taskmenu-tittle">PIS报告</span>
            </template>
            <el-menu-item index="/pisReportsfirstdraft" class="zuobian">初稿</el-menu-item>
            <el-menu-item index="/pisReportsLatestdraft" class="zuobian">终稿</el-menu-item>
            <el-menu-item index="/pisentrust" class="zuobian">外委</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span class="taskmenu-tittle">VMS报告</span>
            </template>
            <el-menu-item index="/vmsReportsfirstdraft" class="zuobian">初稿</el-menu-item>
            <el-menu-item index="/vmsReportsLatestdraft" class="zuobian">终稿</el-menu-item>
            <el-menu-item index="/vmsentrust" class="zuobian">外委</el-menu-item>
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
    return {
      abc: ""
    };
  },
  created() {
    this.$router.push({ name: "pisReportsfirstdraft" });
  },
  methods: {
    // 选中菜单关闭右侧滑块
    handleSelect() {
      // this.$store.commit("taskhuakuaihidden");
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

<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          @select="handleSelect"
          default-active="/personnel"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-menu-item index="/personnel" class="big-zuobian">
            <i class="el-icon-menu"></i>
            <span slot="title" class="taskmenu-tittle">人员管理</span>
          </el-menu-item>
          <el-menu-item index="/permissions" class="big-zuobian">
            <i class="el-icon-menu"></i>
            <span slot="title" class="taskmenu-tittle">权限管理</span>
          </el-menu-item>
          <el-menu-item index="/logs" class="big-zuobian">
            <i class="el-icon-menu"></i>
            <span slot="title" class="taskmenu-tittle">日志</span>
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
    this.$router.push({ name: "personnel" });
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
.task-content {
  padding: 0 0 0 10px;
  height: 100%;
  min-height: 800px;
}
/* .taskmenu-box .el-menu-item.big-zuobian {
  padding-left: 10px;
}
.taskmenu-box .el-menu-item.big-zuobian.is-active {
  border-left: 2px solid #409eff;
  padding-left: 12px;
} */
</style>

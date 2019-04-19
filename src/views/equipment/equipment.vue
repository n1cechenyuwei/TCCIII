<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          @select="handleSelect"
          default-active="/environmentconfig"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="2">
            <template slot="title">
              <span class="taskmenu-tittle">实验室设备</span>
            </template>
            <el-menu-item class="zuobian" index="/environmentconfig">工作台配置</el-menu-item>
            <el-menu-item class="zuobian" index="/simtools">工作台软件配置</el-menu-item>
            <el-menu-item class="zuobian" index="/pissimulationconfig">PIS仿真系统配置</el-menu-item>
            <el-menu-item class="zuobian" index="/simulationconfig">VMS仿真系统配置</el-menu-item>
          </el-submenu>
          <el-menu-item index="/eqvms" class="big-zuobian">
            <span slot="title" class="taskmenu-tittle">VMS受检设备</span>
          </el-menu-item>
          <el-menu-item index="/eqpis" class="big-zuobian">
            <span slot="title" class="taskmenu-tittle">PIS受检设备</span>
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
    this.$router.push({ name: "environmentconfig" });
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
.zuobian {
  margin-left: 30px;
  font-size: 16px;
}
/* .taskmenu-box .el-menu-item.big-zuobian {
  padding-left: 10px;
}
.taskmenu-box .el-menu-item.big-zuobian.is-active {
  border-left: 2px solid #409eff;
  padding-left: 12px;
} */
</style>

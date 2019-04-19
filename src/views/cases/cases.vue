<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/vmsconfigcase"
          @select="handleSelect"
          :unique-opened="true"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="1">
            <template slot="title">
              <span class="taskmenu-tittle">检测任务用例配置</span>
            </template>
            <el-menu-item index="/vmsconfigcase" class="zuobian-yongli">VMS任务用例配置</el-menu-item>
            <el-menu-item index="/pisconfigcase" class="zuobian-yongli">PIS任务用例配置</el-menu-item>
          </el-submenu>
          <el-menu-item index="/vmscases">
            <span slot="title" class="taskmenu-tittle">VMS检测用例</span>
          </el-menu-item>
          <el-menu-item index="/piscases">
            <span slot="title" class="taskmenu-tittle">PIS检测用例</span>
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
    this.$router.push({ name: "vmsconfigcase" });
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
.zuobian-yongli {
  margin-left: 20px;
  font-size: 16px;
}
.task-content {
  padding: 0 0 0 10px;
  height: 100%;
  min-height: 800px;
}
.taskmenu-box .el-menu-item.zuobian-yongli.is-active {
  border-left: 2px solid #409eff;
  background-color: #f1f9fe;
  min-width: 180px !important;
  width: 189px;
  padding-left: 38px !important;
}
</style>

<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/inspection"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-menu-item index="/inspection">
            <span slot="title" class="taskmenu-tittle">受检单位</span>
          </el-menu-item>
          <el-menu-item index="/examine">
            <span slot="title" class="taskmenu-tittle">外委单位</span>
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
    this.$router.push({ name: "inspection" });
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

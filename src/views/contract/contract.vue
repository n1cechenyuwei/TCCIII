<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/pisContract"
          @select="handleSelect"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-menu-item index="/pisContract">
            <span slot="title" class="taskmenu-tittle">PIS合同</span>
          </el-menu-item>
          <el-menu-item index="/vmsContract">
            <span slot="title" class="taskmenu-tittle">VMS合同</span>
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
    this.$router.push({ name: "pisContract" });
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

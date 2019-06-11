<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          @select="handleSelect"
          :default-active="newroute"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-menu-item v-for="(item4, index) in treelist" :key="index" :index="item4.route" class="big-zuobian">
            <span slot="title" class="taskmenu-tittle">{{item4.name}}</span>
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
      newroute: "",
      treeTwo: "",
      treelist: []
    };
  },
  created() {
    this.router();
  },
  methods: {
    async router() {
      this.treeTwo = "";
      this.treelist = [];
      const res = await this.$http.get("getpermistree");
      if (res.data.permis_list) {
        for (const item of res.data.permis_list) {
          if (item.name === "更多") {
            this.treeTwo = item;
            for (const item2 of this.treeTwo.children) {
              if (item2.name === "系统") {
                for (const item3 of item2.children) {
                  if (item3.name === "系统管理") {
                    this.treelist = item3.children;
                  }
                }
                break;
              }
            }
            break;
          }
        }
        if (this.treelist.length !== 0) {
          this.newroute = this.treelist[0].route;
          this.$router.push({ path: this.newroute });
        }
      } else {
        this.$router.push({ name: "login" });
        this.$message.error("登陆过期，请重新登录");
      }      
    },
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

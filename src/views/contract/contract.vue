<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          :default-active="newroute"
          @select="handleSelect"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-menu-item v-for="(item4, index) in treelist" :key="index" :index="item4.route">
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
    // 选中菜单关闭右侧滑块
    handleSelect() {
      this.$store.commit("taskhuakuaihidden");
    },
    async router() {
      this.treeTwo = "";
      this.treelist = [];
      const res = await this.$http.get("getpermistree");
      for (const item of res.data.permis_list) {
        if (item.name === "更多") {
          this.treeTwo = item;
          for (const item2 of this.treeTwo.children) {
            if (item2.name === "检测流程") {
              for (const item3 of item2.children) {
                if (item3.name === "合同管理") {
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

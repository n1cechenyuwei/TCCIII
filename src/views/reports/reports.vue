<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          :default-active="newroute"
          @select="handleSelect"
          :unique-opened="true"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu :index="index + ''" v-for="(item2, index) in treelist" :key="index">
            <template slot="title">
              <span class="taskmenu-tittle">{{item2.name}}</span>
            </template>
            <el-menu-item v-for="(item3, index2) in item2.children" :key="index2" :index="item3.route" class="zuobian">{{item3.name}}</el-menu-item>
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
      for (const item of res.data.permis_list) {
        if (item.name === "更多") {
          this.treeTwo = item;
          for (const item2 of this.treeTwo.children) {
            if (item2.name === "检测流程") {
              for (const item3 of item2.children) {
                if (item3.name === "报告管理") {
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
        this.newroute = this.treelist[0].children[0].route;
        this.$router.push({ path: this.newroute });
      }
    },
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

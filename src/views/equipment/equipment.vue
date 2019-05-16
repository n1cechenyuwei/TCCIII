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
          <el-submenu index="2">
            <template slot="title">
              <span class="taskmenu-tittle">{{treemore.name}}</span>
            </template>
            <el-menu-item v-for="(item5, index) in treemore.children" :key="index" class="zuobian" :index="item5.route">{{item5.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-for="(item6, index2) in treelist" :key="index2" :index="item6.route" class="big-zuobian">
            <span slot="title" class="taskmenu-tittle">{{item6.name}}</span>
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
      treemore: "",
      treelist: []
    };
  },
  created() {
    this.router();
  },
  methods: {
    async router() {
      this.treemore = "";
      this.treelist = [];
      const res = await this.$http.get("getpermistree");
      for (const item of res.data.permis_list) {
        if (item.name === "更多") {
          for (const item2 of item.children) {
            if (item2.name === "检测流程") {
              for (const item3 of item2.children) {
                if (item3.name === "设备管理") {
                  for (const item4 of item3.children) {
                    if (item4.name === "实验室设备") {
                      this.treemore = item4;
                    } else {
                      this.treelist.push(item4);
                    }
                  }
                  break;
                }
              }
            }
          }
        }
      }
      if (this.treemore !== "" || this.treelist.length !== 0) {
        this.newroute = this.treemore.children[0].route;
        this.$router.push({ path: this.newroute });
      } else if (this.treemore === "") {
        this.newroute = this.treelist[0].route;
        this.$router.push({ path: this.newroute });
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

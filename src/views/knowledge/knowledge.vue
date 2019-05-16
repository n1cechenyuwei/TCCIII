<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          :default-active="newroute"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
           <el-submenu index="2">
            <template slot="title">
              <span class="taskmenu-tittle">{{treemore.name}}</span>
            </template>
            <el-menu-item v-for="(item5, index) in treemore.children" :key="index" :index="item5.route" class="zuobian">{{item5.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-for="(item6, index2) in treelist" :key="index2" :index="item6.route">
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
            if (item2.name === "支持") {
              for (const item3 of item2.children) {
                if (item3.name === "知识资源") {
                  for (const item4 of item3.children) {
                    if (item4.name === "缺陷管理") {
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

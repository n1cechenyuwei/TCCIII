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
          <el-submenu index="1" v-if="treemore.length !== 0">
            <template slot="title">
              <span class="taskmenu-tittle">{{treemore.name}}</span>
            </template>
            <el-menu-item v-for="(li, index2) in treemore.children" :key="index2" :index="li.route" class="zuobian">{{li.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.route" v-for="(item, index) in treelist" :key="index">
            <span slot="title" class="taskmenu-tittle">{{item.name}}</span>
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
      treeOne: [],
      treemore: "",
      treelist: []
    };
  },
  created() {
    this.router();
  },
  methods: {
    async router() {
      this.treeOne = [];
      const res = await this.$http.get("getpermistree");
      for (const item of res.data.permis_list) {
        if (item.name !== "更多") {
          this.treeOne.push(item);
        }
      }
      this.treemore = "";
      this.treelist = [];
      this.treeOne.forEach(element => {
        if (element.name === "任务") {
          element.children.forEach(item => {
            if (item.name === "任务") {
              this.treemore = item;
            } else {
              this.treelist.push(item);
            }
          });
        }
      });
      if (this.treemore === "") {
        this.newroute = this.treelist[0].route;
        this.$router.push({ path: this.newroute });
      } else if (this.treemore !== "" || this.treelist.length !== 0) {
        this.newroute = this.treemore.children[0].route;
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

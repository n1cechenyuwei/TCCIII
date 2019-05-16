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
          <el-submenu index="1">
            <template slot="title" v-if="treemore.length !== 0">
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
      newroute: "", // 默认选中
      treeTwo: "",
      treeOne: [],
      treemore: "",
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
      this.treeOne = [];
      this.treeTwo = "";
      const res = await this.$http.get("getpermistree");
      for (const item of res.data.permis_list) {
        if (item.name !== "更多") {
          this.treeOne.push(item);
        }
      }
      this.treemore = "";
      this.treelist = [];
      this.treeOne.forEach(element => {
        if (element.name === "项目") {
          element.children.forEach(item => {
            if (item.name === "项目") {
              this.treemore = item;
            } else {
              this.treelist.push(item);
            }
          });
        }
      });
      if (this.$route.params.id === undefined) {
        if (this.treemore === "") {
          this.newroute = this.treelist[0].route;
          this.$router.push({ path: this.newroute });
        } else if (this.treemore !== "" || this.treelist.length !== 0) {
          this.newroute = this.treemore.children[0].route;
          this.$router.push({ path: this.newroute });
        }
      } else {
        this.newroute = this.$route.params.path;
        this.$router.push({
          name: "projectdetails",
          params: {
            id: this.$route.params.id,
            path: this.$route.params.path,
            name: this.$route.params.name
          }
        });
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

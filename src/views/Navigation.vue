<template>
  <el-container class="sec">
    <el-header class="header">
      <el-row class="menu">
        <el-col :span="4">
          <div class="logo">
          </div>
        </el-col>
        <el-col :span="16">
          <el-menu 
          :router="true"
          mode="horizontal"
          default-active="/home"
          class="menuitem"
          @select="handleSelect"
          background-color="#004fa1"
          text-color="#fff"
          active-text-color="#fff">
            <el-menu-item index="/home" class="aaa">首页</el-menu-item>
            <el-menu-item index="/task" class="aaa">任务</el-menu-item>
            <el-menu-item index="/project" class="aaa">项目</el-menu-item>
            <el-submenu index="2" popper-class="more-menu">
              <template slot="title" >更多</template>
              <template>
                <el-row class="gengduo">
                  <el-col :span="6">
                    <p>检测流程</p>
                    <el-menu-item index="2-1" class="xuanxiang">审批申请</el-menu-item>
                    <el-menu-item index="2-1" class="xuanxiang">合同</el-menu-item>
                    <el-menu-item index="2-1" class="xuanxiang">项目</el-menu-item>
                    <el-menu-item index="2-1" class="xuanxiang">报告管理</el-menu-item>
                    <el-menu-item index="2-1" class="xuanxiang">设备管理</el-menu-item>
                  </el-col>
                  <el-col :span="6">
                    <p>支持</p>
                    <el-menu-item index="2-1" class="xuanxiang">知识资源</el-menu-item>
                    <el-menu-item index="2-1" class="xuanxiang">检测用例</el-menu-item>
                  </el-col>
                  <el-col :span="6">
                    <p>辅助</p>
                    <el-menu-item index="2-1" class="xuanxiang">文档管理</el-menu-item>
                    <el-menu-item index="2-1" class="xuanxiang">单位管理</el-menu-item>
                  </el-col>
                  <el-col :span="6">
                    <p>系统</p>
                    <el-menu-item index="2-1" class="xuanxiang">系统管理</el-menu-item>
                  </el-col>
                </el-row>
              </template>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <div class="user-right">
            <el-dropdown @command="handleCommandUser" class="user-dropdown" placement="bottom-start">
              <span class="el-dropdown-link">
                <i class="iconfont icon-weixintupian_"></i>                
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handlepassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="user-name">{{$store.state.username}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      data: "r"
    };
  },
  created() {
    this.router();
  },
  methods: {
    router() {
      // if (this.data === "leader") {
      //   this.$router.push({ name: "task" });
      // } else {
      this.$router.push({ name: "home" });
      // }
    },
    handleCommandUser(command) {
      if (command === "logout") {
        sessionStorage.clear();
        this.$router.push({ name: "login" });
        this.$message.success("退出成功");
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
.sec {
  height: 100%;
}
.header {
  padding: 0;
}
.menu {
  height: 60px;
  background-color: #004fa1;
  box-shadow: 0px 0px 4px 3px #507cce !important;
}
.logo {
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  background: url(../assets/LOGO.png) no-repeat;
  background-position: 10px 14px;
}
.menuitem {
  min-width: 500px;
}
.aaa {
  font-size: 20px !important;
  margin-right: 40px !important;
}
.gengduo {
  width: 424px;
  height: 200px;
  color: #000;
  background-color: #fff;
}
.header .gengduo p {
  font-size: 16px;
  line-height: 16px;
  margin: 18px 0px 6px 18px;
  height: 18px;
}
.xuanxiang {
  font-size: 14px !important;
  margin-left: 28px;
  border-right: 1px solid #f6f6f6;
}
.content {
  padding: 10px 0px 0px 0;
  height: 100%;
}
.icon-weixintupian_ {
  font-size: 24px;
  color: #fff;
  position: relative;
  top: 3px;
}
.user-name {
  position: relative;
  margin-left: 5px;
}
.user-dropdown {
  height: 24px;
  line-height: 24px;
}
.user-right {
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  margin-left: 50px;
}
</style>

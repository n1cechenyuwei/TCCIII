<template>
  <div>
    <Breadcrumb :path="$route.params.path" :name="$route.params.name" class="bread"></Breadcrumb>
    <div class="projectname">
      奔讯电子IPC协议检测项目
    </div>
    <div class="steps">
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="签订合同"></el-step>
        <el-step title="设备入库"></el-step>
        <el-step title="配置环境"></el-step>
        <el-step title="执行检测"></el-step>
        <el-step title="报告审核"></el-step>
        <el-step title="设备出库"></el-step>
      </el-steps>
    </div>
    <div class="protab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="protab">
        <el-tab-pane label="合同" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="设备" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="任务" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="外委" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="报告" name="fifth">角色管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first"
    }
  },
  methods: {
    route() {
      console.log(this.$route.params.path);
      console.log(this.$route.params.name);
    },
    handleClick(tab, event) {
      console.log(tab);
    }
  },
  created() {
    this.route();
  }
}
</script>

<style>
.bread {
  margin: 20px 0 0 20px;
}
.projectname {
  font-size: 24px;
  font-weight: 700px;
  text-align: center;
}
.steps {
  margin: 50px 0 0 330px;
}
.protab {
  width: 1400px;
  margin: 20px auto 0;
}
.protab-box .el-tabs__item{
  font-size: 18px;
}
</style>

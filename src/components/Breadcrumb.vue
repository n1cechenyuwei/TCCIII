<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: path }">{{this.name}}</el-breadcrumb-item>
    <el-breadcrumb-item>项目详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["path", "name"]
};
</script>

<style>
</style>

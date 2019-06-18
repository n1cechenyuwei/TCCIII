<template>
  <div class="dp">
    <el-steps :active="1" simple>
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  data() {
    return {
      pvpchart: "",
      chartdata: []
    };
  },
  methods: {

  },
  mounted() {
    
  }
};
</script>

<style>
.dp {
  width: 100%;
  height: 100%;
  background: url("../../assets/dpbg.jpg");
}
</style>

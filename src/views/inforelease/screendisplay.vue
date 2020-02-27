<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        width="80"
        align="center"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="展示名称">
      </el-table-column>
      <el-table-column
        prop="path"
        label="地址">
      </el-table-column>
      <el-table-column
        width="120"
        label="跳转">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openweb(scope.row.path)">打开网页</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "VMS/PIS年度项目统计",
          path: "pvprojectStatistical"
        },
        {
          name: "VMS检测进度",
          path: "vmsTestingProgress"
        },
        {
          name: "VMS检测流程",
          path: "vmsTestingProcess"
        },
        {
          name: "VMS员工信息统计",
          path: "vmsStaffInfo"
        },
        {
          name: "年度项目信息简介",
          path: "projectInfo"
        },
        {
          name: "PIS检测进度",
          path: "pisTestingProgress"
        },
        {
          name: "PIS检测流程",
          path: "pisTestingProcess"
        },
        {
          name: "PIS员工信息统计",
          path: "pisStaffInfo"
        }
      ]
    };
  },
  methods: {
    openweb(path) {
      let routeData = this.$router.resolve({
        name: path
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style>
</style>

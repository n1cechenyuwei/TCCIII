<template>
  <div class="tasked-box">
    <div class="mytask-content-top">
      <el-dropdown
        @command="handleCommand"
        placement="bottom-start"
        class="mytask-dropdown">
        <el-button type="primary" size="small">
          筛选<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">按开始时间(最新)</el-dropdown-item>
          <el-dropdown-item command="b">按结束时间(最新)</el-dropdown-item>
          <el-dropdown-item command="c">按任务进度(最新)</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入任务名称"
          v-model="taskedsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>
      <el-button type="primary" size="mini">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="table-box">
        <el-table
          :data="$store.state.tasked"
          stripe
          class="table"
          style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="任务编号"
            width="100">
          </el-table-column>
          <el-table-column
            label="任务名称">
            <template slot-scope="scope">
              <span class="tablespan" @click="taskedright(scope.row)">{{scope.row.taskname}}</span>
              <el-tag type="success" size="small">{{scope.row.sechedule}}%</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="reality_endtime"
            width="160"
            align="center"
            label="任务完成时间">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pagetwo"
        :current-page.sync="currentPage"
        @current-change="handlePageChange"
        :page-size="taskpagesize"
        layout="total, prev, pager, next, jumper"
        :total="$store.state.taskedtotal">
      </el-pagination>
    </div>
    <!-- 任务详情右滑 -->
    <div :class="{ 'hidden': $store.state.noShow, 'sard': $store.state.isShow }">
      <div class="taskright-title">
        <i class="iconfont icon-renwu"></i>
        <i class="fontt">任务</i>
        <i class="el-icon-close iicon" @click="close"></i>
      </div>
      <div class="height-auto">
        <Applyfor v-if="route === 'applyfor'" :taskid="taskid">
        </Applyfor>
        <ApprovalContract v-if="route === 'approvalcontract'">
        </ApprovalContract>
        <Contractor v-if="route === 'contractor'">
        </Contractor>
        <Detection v-if="route === 'detection'">
        </Detection>
        <Eqconfig v-if="route === 'eqconfig'">
        </Eqconfig>
        <PutStorage v-if="route === 'putstorage'">
        </PutStorage>
        <OutStorage v-if="route === 'outstorage'">
        </OutStorage>
        <ReportAudit v-if="route === 'reportaudit'">
        </ReportAudit>
        <DetectionAudit v-if="route === 'detectionaudit'">
        </DetectionAudit>
      </div>
    </div>
  </div>
</template>

<script>
import Applyfor from "../tasks/Applyfor";
import ApprovalContract from "../tasks/ApprovalContract";
import Contractor from "../tasks/Contractor";
import Detection from "../tasks/Detection";
import Eqconfig from "../tasks/Eqconfig";
import PutStorage from "../tasks/PutStorage";
import OutStorage from "../tasks/OutStorage";
import ReportAudit from "../tasks/ReportAudit";
import DetectionAudit from "../tasks/DetectionAudit";
export default {
  data() {
    return {
      taskedsearch: "", //搜索框
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页几条
      taskid: 0, //任务id
      route: "" //任务组件别名
    };
  },
  created() {
    this.$store.dispatch("loadingTasked", this.currentPage);
    this.$store.commit("taskhuakuaihidden"); // 关闭右滑任务详情
  },
  methods: {
    //按钮事件案例
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    //分页事件
    handlePageChange(val) {
      this.$store.dispatch("loadingTasked", val);
    },
    // 点击右弹出
    taskedright(row) {
      this.$store.commit("taskhuakuaishow");
      this.taskid = row.id;
      this.route = row.route;
      this.$store.dispatch("routerright", { taskid: row.id, route: row.route });
    },
    // 右侧滑块关闭按钮
    close() {
      this.$store.commit("taskhuakuaihidden");
    }
  },
  components: {
    Applyfor,
    ApprovalContract,
    Contractor,
    Detection,
    Eqconfig,
    PutStorage,
    OutStorage,
    ReportAudit,
    DetectionAudit
  }
};
</script>

<style>
.tasked-box {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 798px;
}
.mytask-content-top {
  height: 54px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
}
.mytasksearch {
  width: 300px;
  margin-top: 11px;
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
}
.sreach-icon {
  position: absolute;
  top: 0px;
}
.mytask-dropdown {
  margin-left: 30px;
}
.mytask-content-middle {
  border-top: 1px solid #c6e7ff;
  margin-top: 10px;
  min-height: 800px;
}
.mytask-content-middle .el-table::before {
  height: 0 !important;
}
.singular {
  background-color: #fafafa;
}
.table-box {
  height: 760px;
}
.pagetwo {
  margin-left: 20px;
}
.table {
  font-size: 16px;
}
.tablespan {
  margin-right: 10px;
}
.tablespan:hover {
  color: #409eff;
  cursor: Pointer;
}
</style>

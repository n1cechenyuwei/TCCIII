<template>
  <div class="aaaaa">
    <div class="mytask-boxbox">
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
            v-model="mytasksearch">
          </el-input>
          <i class="el-icon-search sreach-icon"></i>      
        </div>     
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
      <div class="mytask-content-middle">
        <div class="mytask-content-table">
          <el-table
            v-loading="loading"
            :data="$store.state.task"
            class="mytask-content-table-one"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              align="center"
              label="任务编号"
              width="120">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="名称">
              <template slot-scope="scope">
                <span class="colcell" @click="rownameclick(scope.row)">{{ scope.row.taskname }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="pro_name"
              width="300"
              label="所属项目">
            </el-table-column>
            <el-table-column
              prop="username"
              show-overflow-tooltip
              label="负责人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="start_end[0]"
              label="起始日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="start_end[1]"
              label="到期日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sechedule"
              width="100"
              label="进度">
              <template slot-scope="scope">
                <span>{{scope.row.sechedule}}%</span>
              </template>
            </el-table-column>
            <el-table-column
              width="150"
              label="状态">
              <template slot-scope="scope">
                <span v-show="scope.row.istimeout === '未超时'" >{{scope.row.state}}</span>
                <span v-show="scope.row.istimeout === '超时'" v-bind:class="{warning: (scope.row.istimeout === '超时')}">超时</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="taskpage"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
          :page-size="taskpagesize"
          layout="total, prev, pager, next, jumper"
          :total="$store.state.mytasktotal">
        </el-pagination>
        <div :class="{ 'hidden': $store.state.noShow, 'sard': $store.state.isShow }">
          <div class="taskright-title">
            <i class="iconfont icon-renwu"></i>
            <i class="fontt">任务</i>
            <i class="el-icon-close iicon" @click="close"></i>
          </div>
          <div class="height-auto">
            <Applyfor v-if="route === 'applyfor'" :taskid="taskid">
            </Applyfor>
            <ApprovalContract v-if="route === 'approvalcontract'" :taskid="taskid">
            </ApprovalContract>
            <Contractor v-if="route === 'contractor'" :taskid="taskid">
            </Contractor>
            <Detection v-if="route === 'detection'" :taskid="taskid">
            </Detection>
            <DetectionAudit v-if="route === 'detectionaudit'" :taskid="taskid">
            </DetectionAudit>
            <Eqconfig v-if="route === 'eqconfig'" :taskid="taskid">
            </Eqconfig>
            <PutStorage v-if="route === 'putstorage'" :taskid="taskid">
            </PutStorage>
            <OutStorage v-if="route === 'outstorage'" :taskid="taskid">
            </OutStorage>
            <ReportAudit v-if="route === 'reportaudit'" :taskid="taskid">
            </ReportAudit>
          </div>
        </div>
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
      mytasksearch: "", //搜索框内容
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      loading: false, //加载图标
      eqimgshow: false, //设备生产厂家照片显示
      eqimgdata: "", //生厂厂家照片
      taskid: 0, //任务id
      route: "" //任务组件别名
    };
  },
  created() {
    this.$store.dispatch("loadingMytask", this.currentPage);
    this.$store.commit("taskhuakuaihidden"); // 关闭右滑任务详情
  },
  methods: {
    //筛选按钮时间
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    handlePageChange(val) {
      this.$store.dispatch("loadingMytask", val);
    },
    //表格名称点击
    rownameclick(row) {
      this.$store.commit("taskhuakuaishow");
      this.taskid = row.id;
      this.route = row.route;
      this.$store.dispatch("routerright", { taskid: row.id, route: row.route });
    },
    close() {
      this.$store.commit("taskhuakuaihidden");
    },
    // 点击设备图标，查看图片
    async eqimg(id) {
      this.eqimgshow = true;
      const date = new Date().getTime();
      this.eqimgdata = `http://192.168.1.186:8888/api/v1.0/showdevicelicense/${id}?${date}`;
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
.aaaaa {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.mytask-boxbox {
  height: 798px;
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
  height: 100%;
}
.mytask-content-middle .page {
  margin-left: 30px;
}
.mytask-content-middle .colcell {
  cursor: Pointer;
}
.mytask-content-middle .colcell:hover {
  color: #409eff;
}
.mytask-content-table {
  height: 720px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.icon-renwu {
  font-size: 32px;
  color: #1ac7ff;
}
.box-card {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 500px;
}
.mytask-content-table {
  height: 760px;
}
.mytask-content-table .el-table::before {
  height: 0 !important;
}
.yyxxcla .el-dialog {
  background-color: transparent;
  background-color: #fff;
  box-shadow: none;
}
.taskpage {
  margin-left: 30px;
  margin-top: 20px;
}
</style>

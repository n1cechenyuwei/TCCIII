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
    <!-- 审批任务设备详情弹出框 -->
    <el-dialog
      title="设备详情"
      :visible.sync="$store.state.DialogEquipment"
      width="70%"
      center>
      <el-table
        :data="$store.state.appeqlist"
        border
        height="480"
        style="width: 100%">
        <el-table-column
          prop="temdid"
          align="center"
          label="设备编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="type"
          show-overflow-tooltip
          width="160"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="model"
          width="160"
          show-overflow-tooltip
          label="硬件型号">
        </el-table-column>
        <el-table-column
          prop="version"
          show-overflow-tooltip
          width="100"
          label="软件版本">
        </el-table-column>
        <el-table-column
          width="160"
          show-overflow-tooltip
          prop="serialnumber"
          label="出厂序列号">
        </el-table-column>
        <el-table-column
          width="200"
          prop="manufacturers"
          show-overflow-tooltip
          label="生产厂家">
        </el-table-column>
        <el-table-column
          width="140"
          align="center"
          show-overflow-tooltip
          label="生产厂家营业执照">
          <template slot-scope="scope">
            <i class="iconfont icon-yingyezhizhao" @click="eqimg(scope.row.filename)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="50%"
        center
        title="生产厂家营业执照"
        :visible.sync="eqimgshow"
        append-to-body>
        <div class="eqimgdata-box">
          <img :src="eqimgdata" alt="图片丢失了" class="eqimgdata">
        </div>
      </el-dialog>
    </el-dialog>
    <!-- 营业执照弹窗 -->
    <el-dialog
      class="yyxxcla"
      :visible.sync="$store.state.opyyzz"
      width="50%">
      <div class="oppforimg-box">
        <img class="oppforimg" :src="$store.state.appforcompany.license" alt="照片丢失了">
      </div>
    </el-dialog>
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
      eqimgshow: false, //设备生产厂家照片显示
      eqimgdata: "", //生厂厂家照片
      taskid: 0, //任务id
      route: "" //任务组件别名
    };
  },
  created() {
    this.$store.dispatch("loadingTasked", this.currentPage);
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
    },
    // 点击设备图标，查看图片
    async eqimg(img) {
      this.eqimgshow = true;
      this.eqimgdata = "http://192.168.1.186:8888/api/v1.0/show/" + img;
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

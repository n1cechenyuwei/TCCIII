<template>
  <div class="tasked-box">
    <div class="mytask-content-top">
      <el-popover
        placement="bottom-start"
        width="220"
        transition="el-zoom-in-bottom"
        trigger="click">
        <div>
          <div class="sx_li">任务名称：</div>
          <el-input size="small" class="sx_input sx_li" @keyup.enter.native="allsearch" v-model.trim="sxform.search" placeholder="请输入任务名称"></el-input>
          <div class="sx_li">项目名称筛选：</div>
          <el-select v-model="sxform.proid" class="sx_li sx_input" size="small" placeholder="请选择">
            <el-option
              v-for="item in projectoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <div class="sx_li">开始时间(按任务完成日期筛选)：</div>
          <el-date-picker
            v-model="sxform.stime"
            size="mini"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="sx_li sx_input"
            placeholder="选择日期时间">
          </el-date-picker>
          <div class="sx_li">结束时间(按任务完成日期筛选)：</div>
          <el-date-picker
            v-model="sxform.etime"
            size="mini"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="sx_li sx_input"
            placeholder="选择日期时间">
          </el-date-picker>
          <div class="sx_btn_box">
            <el-button type="primary" size="mini" @click="reqest">重置</el-button>
            <el-button type="primary" size="mini" @click="sx">筛选</el-button>
          </div>
        </div>
        <el-button style="margin: 10px 0 0 20px" slot="reference" type="primary" size="small">筛选<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </el-popover>
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
            width="120">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="任务名称">
            <template slot-scope="scope">
              <span class="tablespan" @click="taskedright(scope.row)">{{scope.row.taskname}}</span>
              <el-tag type="success" size="small">{{scope.row.sechedule}}%</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="reality_endtime"
            width="300"
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
// import Applyfor from "../tasks/Applyfor";
// import ApprovalContract from "../tasks/ApprovalContract";
// import Contractor from "../tasks/Contractor";
// import Detection from "../tasks/Detection";
// import Eqconfig from "../tasks/Eqconfig";
// import PutStorage from "../tasks/PutStorage";
// import OutStorage from "../tasks/OutStorage";
// import ReportAudit from "../tasks/ReportAudit";
// import DetectionAudit from "../tasks/DetectionAudit";
export default {
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页几条
      taskid: 0, //任务id
      route: "", //任务组件别名
      sxform: {
        proid: null,
        stime: "",
        etime: "",
        search: ""
      },
      projectoptions: []
    };
  },
  created() {
    this.allsearch();
    this.projectlist();
    this.$store.commit("taskhuakuaihidden"); // 关闭右滑任务详情
  },
  methods: {
    // 筛选和获取所有数据请求
    allsearch() {
      let data = {};
      data.sxform = this.sxform;
      data.page = this.currentPage;
      this.$store.dispatch("loadingTasked", data);
    },
    //分页事件
    handlePageChange(val) {
      this.currentPage = val;
      this.allsearch();
    },
    // 点击右弹出
    taskedright(row) {
      this.taskid = row.id;
      this.route = row.route;
      this.$store.dispatch("routerright", { taskid: row.id, route: row.route });
    },
    // 右侧滑块关闭按钮
    close() {
      this.$store.commit("taskhuakuaihidden");
    },
    // 重置按钮
    reqest() {
      this.sxform.proid = null;
      this.sxform.stime = "";
      this.sxform.etime = "";
      this.sxform.search = "";
      this.currentPage = 1;
      this.allsearch();
    },
    // 筛选按钮
    sx() {
      this.currentPage = 1;
      this.allsearch();
    },
    async projectlist() {
      const res = await this.$http.get(`projectname/1`);
      if (res.data.status === 200) {
        this.projectoptions = res.data.info;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  components: {
    // Applyfor,
    // ApprovalContract,
    // Contractor,
    // Detection,
    // Eqconfig,
    // PutStorage,
    // OutStorage,
    // ReportAudit,
    // DetectionAudit
    Applyfor: resolve => {
      require(["./Applyfor"], resolve);
    },
    ApprovalContract: resolve => {
      require(["./ApprovalContract"], resolve);
    },
    Contractor: resolve => {
      require(["./Contractor"], resolve);
    },
    Detection: resolve => {
      require(["./Detection"], resolve);
    },
    Eqconfig: resolve => {
      require(["./Eqconfig"], resolve);
    },
    PutStorage: resolve => {
      require(["./PutStorage"], resolve);
    },
    OutStorage: resolve => {
      require(["./OutStorage"], resolve);
    },
    ReportAudit: resolve => {
      require(["./ReportAudit"], resolve);
    },
    DetectionAudit: resolve => {
      require(["./DetectionAudit"], resolve);
    }
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
.sard {
  top: 0;
  right: 0;
  position: absolute;
  background-color: #f0f4f8;
  box-shadow: 0px 0px 4px 3px #acd2fa;
  border-radius: 6px;
  height: 100%;
  width: 940px;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  -os-transition: all 0.5s;
  -os-transform: translateX(0%);
  z-index: 2;
  transform: translateX(0%);
}
.hidden {
  top: 0;
  right: 0;
  z-index: 99999;
  position: absolute;
  background-color: #f0f4f8;
  box-shadow: 0px 0px 4px 3px #acd2fa;
  border-radius: 6px;
  height: 100%;
  z-index: 2;
  width: 940px;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  -os-transition: all 0.5s;
  -os-transform: translateX(110%);
  transform: translateX(110%);
}
</style>

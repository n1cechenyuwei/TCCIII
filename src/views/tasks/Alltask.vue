<template>
  <div class="aaaaa">
    <div class="mytask-boxbox">
      <div class="mytask-content-top">
        <el-popover
          placement="bottom-start"
          width="220"
          transition="el-zoom-in-bottom"
          trigger="click">
          <div>
            
            <div class="sx_li">项目名称筛选：</div>
            <el-select v-model="$store.state.allsxform.sxform.proid" class="sx_li sx_input" size="small" placeholder="请选择">
              <el-option
                v-for="item in projectoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="sx_li">负责人筛选：</div>
            <el-select v-model="$store.state.allsxform.sxform.userid" class="sx_li sx_input" size="small" placeholder="请选择">
              <el-option
                v-for="item in peopleoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="sx_li">任务状态筛选：</div>
            <el-select v-model="$store.state.allsxform.sxform.state" class="sx_li sx_input" size="small" placeholder="请选择">
              <el-option
                v-for="item in stateoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="sx_li">开始时间(按任务到期日筛选)：</div>
            <el-date-picker
              size="mini"
              v-model="$store.state.allsxform.sxform.stime"
              type="date"
              value-format="yyyy-MM-dd"
              class="sx_li sx_input"
              placeholder="选择日期">
            </el-date-picker>
            <div class="sx_li">结束时间(按任务到期日筛选)：</div>
            <el-date-picker
              size="mini"
              v-model="$store.state.allsxform.sxform.etime"
              value-format="yyyy-MM-dd"
              class="sx_li sx_input"
              type="date"
              placeholder="选择日期">
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
        <div class="mytask-content-table">
          <el-table
            :data="$store.state.alltask"
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
              prop="pro_name"
              width="300"
              show-overflow-tooltip
              label="所属项目">
            </el-table-column>
            <el-table-column
              prop="username"
              label="负责人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="starttime"
              label="起始日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="endtime"
              label="到期日"
              width="180">
            </el-table-column>
            <el-table-column
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
                <span v-show="scope.row.istimeout === 0">{{scope.row.state}}</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state !== '已完成')" v-bind:class="{warning: (scope.row.istimeout === 1 )}">超时</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state === '已完成')">{{scope.row.state}}</span>
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
          :total="$store.state.alltasktotal">
        </el-pagination>
        <div :class="{ 'hidden': $store.state.noShow, 'sard': $store.state.isShow }"
          v-loading="$store.state.loading"
          element-loading-text="任务提交中，请稍后"
          element-loading-spinner="el-icon-loading">
          <div class="taskright-title">
            <i class="iconfont icon-renwu"></i>
            <i class="fontt">任务</i>
            <i class="el-icon-close iicon" @click="close"></i>
          </div>
          <div class="height-auto">
            <Applyfor v-if="route === 'applyfor'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </Applyfor>
            <ApprovalContract v-if="route === 'approvalcontract'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </ApprovalContract>
            <Contractor v-if="route === 'contractor'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </Contractor>
            <Detection v-if="route === 'detection'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </Detection>
            <DetectionAudit v-if="route === 'detectionaudit'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </DetectionAudit>
            <Eqconfig v-if="route === 'eqconfig'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </Eqconfig>
            <PutStorage v-if="route === 'putstorage'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </PutStorage>
            <OutStorage v-if="route === 'outstorage'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </OutStorage>
            <ReportAudit v-if="route === 'reportaudit'" :taskid="taskid" ht="alltask" :page="$store.state.allsxform.page">
            </ReportAudit>
          </div>
        </div>
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
      taskpagesize: 14, //每页显示几条
      taskid: 0, //任务id
      route: "", //任务组件别名
      // sxform: {
      //   proid: null,
      //   stime: "",
      //   etime: "",
      //   search: "",
      //   userid: null,
      //   state: ""
      // },
      projectoptions: [],
      peopleoptions: [],
      stateoptions: [
        {
          id: "未开始",
          name: "未开始"
        },
        {
          id: "已完成",
          name: "已完成"
        }
      ]
    };
  },
  created() {
    this.sxqq();
    this.projectlist();
    this.peoplelist();
    this.$store.commit("taskhuakuaihidden"); // 关闭右滑任务详情
  },
  methods: {
    handlePageChange(val) {
      this.$store.state.allsxform.page = val;
      this.sxqq();
    },
    //表格名称点击
    rownameclick(row) {
      this.taskid = row.id;
      this.route = row.route;
      this.$store.dispatch("routerright", { taskid: row.id, route: row.route });
    },
    close() {
      this.$store.commit("taskhuakuaihidden");
    },
    // 重置按钮
    reqest() {
      this.$store.state.allsxform.sxform.proid = null;
      this.$store.state.allsxform.sxform.stime = "";
      this.$store.state.allsxform.sxform.etime = "";
      this.$store.state.allsxform.sxform.search = "";
      this.$store.state.allsxform.sxform.userid = null;
      this.$store.state.allsxform.sxform.state = "";
      this.$store.state.allsxform.page = 1;
      this.sxqq();
    },
    // 筛选按钮
    sx() {
      this.currentPage = 1;
      this.sxqq();
    },
    // 数据和筛选请求
    async sxqq() {
      // let data = {};
      // data.sxform = this.$store.state.allsxform;
      // data.page = this.currentPage;
      this.$store.dispatch("loadingAlltask", this.$store.state.allsxform);
    },
    // 所有项目列表
    async projectlist() {
      const res = await this.$http.get(`projectname/2`);
      if (res.data.status === 200) {
        this.projectoptions = res.data.info;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 所有负责人员列表
    async peoplelist() {
      const res = await this.$http.get(`username`);
      if (res.data.status === 200) {
        this.peopleoptions = res.data.userinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  components: {
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
  },
  watch: {
    mytasksearch(val) {
      if (val === "") {
        this.searchtype = "1";
        this.$store.dispatch("loadingAlltask", 1);
      }
    }
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
.taskpage {
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
.mytask-content-table .el-table::before {
  height: 0 !important;
}
.yyxxcla .el-dialog {
  background-color: transparent;
  background-color: #fff;
  box-shadow: none;
}
.eqimgdata-box {
  text-align: center;
}
.eqimgdata {
  max-width: 850px;
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

<template>
  <div class="aaaaa">
    <div class="mytask-boxbox">
      <div class="mytask-content-top">
        <el-popover
          placement="bottom-start"
          width="220"
          popper-class="sx_cla"
          transition="el-zoom-in-bottom"
          trigger="click">
          <div>
            <div class="sx_li">任务名称：</div>
            <el-input size="small" class="sx_input sx_li" @keyup.enter.native="mysearch" v-model.trim="$store.state.mysxform.search" placeholder="请输入任务名称"></el-input>
            <div class="sx_li">项目名称筛选：</div>
            <el-select v-model="$store.state.mysxform.proid" class="sx_li sx_input" size="small" placeholder="请选择">
              <el-option
                v-for="item in projectoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="sx_li">开始时间(按任务到期日筛选)：</div>
            <el-date-picker
              size="mini"
              value-format="yyyy-MM-dd"
              v-model="$store.state.mysxform.stime"
              type="date"
              class="sx_li sx_input"
              placeholder="选择日期">
            </el-date-picker>
            <div class="sx_li">结束时间(按任务到期日筛选)：</div>
            <el-date-picker
              size="mini"
              value-format="yyyy-MM-dd"
              v-model="$store.state.mysxform.etime"
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
            :data="$store.state.task"
            class="mytask-content-table-one"
            stripe
            height="730"
            v-loading="$store.state.mytaskloading"
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
                <span v-show="scope.row.istimeout === 0">{{scope.row.state}}</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state !== '已完成')" v-bind:class="{warning: (scope.row.istimeout === 1 )}">超时</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state === '已完成')">{{scope.row.state}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="taskpage"
          :current-page.sync="sxform.currentPage"
          @current-change="handlePageChange"
          :page-size="taskpagesize"
          layout="total, prev, pager, next, jumper"
          :total="$store.state.mytasktotal">
        </el-pagination>
        <div
          :class="{ 'hidden': $store.state.noShow, 'sard': $store.state.isShow }"
          v-loading="$store.state.loading"
          element-loading-text="任务提交中，请稍后"
          element-loading-spinner="el-icon-loading">
          <div class="taskright-title">
            <i class="iconfont icon-renwu"></i>
            <i class="fontt">任务</i>
            <i class="el-icon-close iicon" @click="close"></i>
          </div>
          <div class="height-auto">
            <Applyfor v-if="route === 'applyfor'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </Applyfor>
            <ApprovalContract v-if="route === 'approvalcontract'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </ApprovalContract>
            <Contractor v-if="route === 'contractor'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </Contractor>
            <Detection v-if="route === 'detection'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </Detection>
            <DetectionAudit v-if="route === 'detectionaudit'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </DetectionAudit>
            <Eqconfig v-if="route === 'eqconfig'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </Eqconfig>
            <PutStorage v-if="route === 'putstorage'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </PutStorage>
            <OutStorage v-if="route === 'outstorage'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </OutStorage>
            <ReportAudit v-if="route === 'reportaudit'" :taskid="taskid" ht="mytask" :page="$store.state.mysxform.currentPage">
            </ReportAudit>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      // mytasksearch: "", //搜索框内容
      // currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqimgshow: false, //设备生产厂家照片显示
      eqimgdata: "", //生厂厂家照片
      taskid: 0, //任务id
      route: "", //任务组件别名
      searchtype: "1", // 根据类型不同发送不同请求
      sxform: {
        proid: null,
        stime: "",
        etime: "",
        currentPage: 1,
        search: ""
      },
      projectoptions: []
    };
  },
  created() {
    this.$store.dispatch("loadingMytask", this.$store.state.mysxform);
    this.projectlist();
    this.$store.state.mytaskloading = true;
    this.$store.commit("taskhuakuaihidden"); // 关闭右滑任务详情
  },
  methods: {
    handlePageChange(val) {
      this.$store.mysxform.currentPage = val;
      this.$store.dispatch("loadingMytask", this.$store.state.mysxform);
    },
    mysearch() {
      this.sxform.currentPage = 1;
      this.$store.dispatch("loadingMytask",this.$store.state.mysxform);
    },
    //表格名称点击
    rownameclick(row) {
      // this.$store.commit("taskhuakuaishow");
      this.taskid = row.id;
      this.route = row.route;
      this.$store.dispatch("routerright", { taskid: row.id, route: row.route });
    },
    close() {
      this.$store.dispatch("loadingMytask", this.$store.state.mysxform);
      this.$store.commit("taskhuakuaihidden");
    },
    // 重置按钮
    reqest() {
      this.$store.state.mysxform.proid = null;
      this.$store.state.mysxform.sxform.stime = "";
      this.$store.state.mysxform.sxform.etime = "";
      this.$store.state.mysxform.sxform.search = "";
      this.$store.state.mysxform.sxform.currentPage = 1;
      this.$store.dispatch("loadingMytask", this.$store.state.mysxform);
    },
    // 筛选按钮
    sx() {
      this.$store.dispatch("loadingMytask", this.$store.state.mysxform);
    },
    async projectlist() {
      const res = await this.$http.get(`projectname/0`);
      if (res.data.status === 200) {
        this.projectoptions = res.data.info;
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

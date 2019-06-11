<template>
  <div class="pd">
    <Breadcrumb :path="$route.params.path" :name="$route.params.name" class="bread"></Breadcrumb>
    <div class="projectname">
      {{proname}}
    </div>
    <div class="steps">
      <el-steps :space="240" :active="pro_pragress" finish-status="success" align-center>
        <el-step title="签订合同"></el-step>
        <el-step title="设备入库"></el-step>
        <el-step title="配置环境"></el-step>
        <el-step title="执行检测"></el-step>
        <el-step title="报告审核"></el-step>
        <el-step title="设备出库"></el-step>
      </el-steps>
    </div>
    <div class="protab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true" class="protab" type="border-card">
        <el-tab-pane label="合同" name="first">
          <div class="hetong_row_box row_box_left">
            <div class="hetongrow"><span>合同名称：</span>{{hetong.name}}</div>
            <div class="hetongrow"><span>合同编号：</span>{{hetong.no}}</div>
            <div class="hetongrow"><span>签订状态：</span>{{hetong.state}}</div>
          </div>
          <div class="hetong_row_box row_box_left">
            <div class="hetongrow"><span>甲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方：</span>{{hetong.first_party}}</div>
            <div class="hetongrow"><span>乙&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方：</span>检测中心</div>
          </div>
          <div class="hetong_row_box row_box_right">
            <div class="hetongrow"><span>签订时间：</span>{{hetong.signing_time}}</div>
            <div class="hetongrow"><span>合同期限：</span>{{hetong.com_starttime}} 至 {{hetong.com_endtime}}</div>
          </div>
          <el-table
            :data="hetongdata"
            class="httable"
            max-height="400">
            <el-table-column
              align="center"
              label="终稿">
              <el-table-column
                prop="name"
                label="合同名称">
              </el-table-column>
              <el-table-column
                prop="createtime"
                label="上传日期"
                width="180">
              </el-table-column>
              <el-table-column
                width="150"
                label="下载">
                <template slot-scope="scope">
                  <a :href="scope.row.download_url" :download="scope.row.download_url">
                    <el-button icon="el-icon-download" size="mini" type="primary"></el-button>
                  </a>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设备" name="second">
          <el-table
            :data="equipmentdata"
            stripe
            height="640"
            style="width: 100%">
            <el-table-column
              type="index"
              label="编号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="eq_name"
              show-overflow-tooltip
              label="设备名称">
            </el-table-column>
            <el-table-column
              prop="eq_type"
              width="150"
              show-overflow-tooltip
              label="设备类型">
            </el-table-column>
            <el-table-column
              prop="eq_model"
              show-overflow-tooltip
              label="设备型号">
            </el-table-column>
            <el-table-column
              prop="eq_serialnumber"
              show-overflow-tooltip
              label="设备序列号">
            </el-table-column>
            <el-table-column
              prop="eq_state"
              show-overflow-tooltip
              width="120"
              label="设备状态">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="任务" name="third">
          <el-table
            :data="taskdata"
            class="mytask-content-table-one"
            stripe
            max-height="640"
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
              prop="user"
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
              width="100"
              label="进度">
              <template slot-scope="scope">
                <span>{{scope.row.sechedule}}%</span>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              label="状态">
              <template slot-scope="scope">
                <span v-show="scope.row.istimeout === 0">{{scope.row.state}}</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state !== '已完成')" v-bind:class="{warning: (scope.row.istimeout === 1 )}">超时</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state === '已完成')">{{scope.row.state}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="外委" name="fourth">
          <el-table
            :data="proentrustdata"
            class="mytask-content-table-one"
            stripe
            max-height="640"
            style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="entrust_name"
              show-overflow-tooltip
              label="外委单位">
            </el-table-column>
            <el-table-column
              prop="device_name"
              show-overflow-tooltip
              label="外委设备"
              width="180">
            </el-table-column>
            <el-table-column
              prop="de_serialnumber"
              show-overflow-tooltip
              label="设备序列号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="starttime"
              label="起始日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="endtime"
              width="180"
              label="到期日">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="报告" name="fifth">
          <el-table
            :data="proreportdata"
            class="mytask-content-table-one"
            stripe
            max-height="640"
            style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="re_name"
              show-overflow-tooltip
              label="名称">
            </el-table-column>
            <el-table-column
              prop="re_type"
              label="报告类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="device_name"
              show-overflow-tooltip
              label="所属设备"
              width="180">
            </el-table-column>
            <el-table-column
              prop="createtime"
              label="生成时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="endtime"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <a :href="scope.row.download_link" :download="scope.row.download_link">
                  <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
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
      <div style="height: 100% ; min-height: 875px">
        <Applyfor v-if="route === 'applyfor'" :taskid="taskid" ht="mytask">
        </Applyfor>
        <ApprovalContract v-if="route === 'approvalcontract'" :taskid="taskid" ht="mytask">
        </ApprovalContract>
        <Contractor v-if="route === 'contractor'" :taskid="taskid" ht="mytask">
        </Contractor>
        <Detection v-if="route === 'detection'" :taskid="taskid" ht="mytask">
        </Detection>
        <DetectionAudit v-if="route === 'detectionaudit'" :taskid="taskid" ht="mytask">
        </DetectionAudit>
        <Eqconfig v-if="route === 'eqconfig'" :taskid="taskid" ht="mytask">
        </Eqconfig>
        <PutStorage v-if="route === 'putstorage'" :taskid="taskid" ht="mytask">
        </PutStorage>
        <OutStorage v-if="route === 'outstorage'" :taskid="taskid" ht="mytask">
        </OutStorage>
        <ReportAudit v-if="route === 'reportaudit'" :taskid="taskid" ht="mytask">
        </ReportAudit>
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
      activeName: "first",
      proname: "", // 项目名
      pro_pragress: 0, // 项目进度
      equipmentdata: [], // 设备列表
      taskdata: [], // 任务列表
      proentrustdata: [], // 外委列表
      proreportdata: [], // 报告列表
      route: "", //任务组件别名
      hetong: "", // 合同信息
      hetongdata: []
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.name === "first") {
        this.procompact();
      } else if (tab.name === "second") {
        this.prodevicelist();
      } else if (tab.name === "third") {
        this.protasks();
      } else if (tab.name === "fourth") {
        this.proentrust();
      } else if (tab.name === "fifth") {
        this.proreport();
      }
    },
    // 任务表格名称点击
    rownameclick(row) {
      this.taskid = row.id;
      this.route = row.route;
      this.$store.dispatch("routerright", { taskid: row.id, route: row.route });
    },
    close() {
      // this.$store.dispatch("loadingMytask", this.currentPage);
      this.$store.commit("taskhuakuaihidden");
    },
    async comprojectlist() {
      const res = await this.$http.get(`prodetail/${this.$route.params.id}`);
      if (res.data.status === 200) {
        this.pro_pragress = res.data.phases_id;
        this.proname = res.data.pro_name;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 合同信息
    async procompact() {
      const res = await this.$http.get(`procompact/${this.$route.params.id}`);
      if (res.data.status === 200) {
        this.hetong = res.data.compact_info[0];
        this.hetongdata = res.data.compact_info[0].final_accessory_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 设备信息
    async prodevicelist() {
      const res = await this.$http.get(
        `prodevicelist/${this.$route.params.id}`
      );
      if (res.data.status === 200) {
        this.equipmentdata = res.data.device_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 任务列表
    async protasks() {
      const res = await this.$http.get(`protasks/${this.$route.params.id}`);
      if (res.data.status === 200) {
        this.taskdata = res.data.task_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 外委任务
    async proentrust() {
      const res = await this.$http.get(`proentrust/${this.$route.params.id}`);
      if (res.data.status === 200) {
        this.proentrustdata = res.data.entrust_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 报告任务
    async proreport() {
      const res = await this.$http.get(`proreport/${this.$route.params.id}`);
      if (res.data.status === 200) {
        this.proreportdata = res.data.report_list;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.comprojectlist();
    this.procompact();
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
      require(["../tasks/Applyfor"], resolve);
    },
    ApprovalContract: resolve => {
      require(["../tasks/ApprovalContract"], resolve);
    },
    Contractor: resolve => {
      require(["../tasks/Contractor"], resolve);
    },
    Detection: resolve => {
      require(["../tasks/Detection"], resolve);
    },
    Eqconfig: resolve => {
      require(["../tasks/Eqconfig"], resolve);
    },
    PutStorage: resolve => {
      require(["../tasks/PutStorage"], resolve);
    },
    OutStorage: resolve => {
      require(["../tasks/OutStorage"], resolve);
    },
    ReportAudit: resolve => {
      require(["../tasks/ReportAudit"], resolve);
    },
    DetectionAudit: resolve => {
      require(["../tasks/DetectionAudit"], resolve);
    }
  }
};
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
  margin: 50px 0 0 120px;
}
.protab {
  width: 1400px;
  height: 700px;
  margin: 20px auto 0;
}
.protab-box .el-tabs__item {
  font-size: 18px;
}
.pd {
  width: 100%;
  position: relative;
  overflow: hidden;
  min-height: 875px;
  height: 100%;
}
.hetong_row_box {
  display: inline-block;
  vertical-align: top;
  margin-top: 20px;
}
.row_box_left {
  margin: 20px 100px 0px 30px;
}
.row_box_right {
  margin: 20px 0px 0px 30px;
}
.hetongrow {
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 30px;
  border-bottom: 1px dashed #7e8b8e;
}
.hetongrow span {
  font-size: 16px;
  color: #7e8b8e;
}
.httable {
  width: 1314px;
  margin: 0 auto;
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

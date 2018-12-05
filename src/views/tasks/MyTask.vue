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
    <!-- 弹出框 -->
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
    <!-- 设备入库任务操作弹出框 -->
    <el-dialog
      class="dialogeq-open-box"
      title="设备详情"
      :visible.sync="$store.state.Dialogshebei"
      width="30%">
      <div class="dialogeq-open">
        <el-form label-width="100px" :model="$store.state.diaeqopen" label-suffix=":" size="small">
          <el-form-item label="设备名称">
            <span class="wwwwww" :model="$store.state.diaeqopen.eqname">{{$store.state.diaeqopen.eqname}}</span>
          </el-form-item>
          <el-form-item label="设备类型">
            <span class="wwwwww" :model="$store.state.diaeqopen.eqtype">{{$store.state.diaeqopen.eqtype}}</span>
          </el-form-item>
          <el-form-item label="设备型号">
            <span class="wwwwww" :model="$store.state.diaeqopen.xinghao">{{$store.state.diaeqopen.xinghao}}</span>
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input class="wwwwww" v-model="$store.state.diaeqopen.bianhao" placeholder="请填写设备编号"></el-input>
          </el-form-item>
          <el-form-item label="出厂序列号">
            <el-input class="wwwwww" v-model="$store.state.diaeqopen.iem" placeholder="请填写出厂序列号"></el-input>
          </el-form-item>
          <el-form-item label="送检人">
            <el-input class="wwwwww" v-model="$store.state.diaeqopen.people" placeholder="请填写送检人"></el-input>
          </el-form-item>
          <el-form-item label="送检时间">
            <el-date-picker
              class="wwwwww"
              v-model="$store.state.diaeqopen.time"
              value-format="yyyy-MM-dd">
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备外观">
            <el-select class="dialog-open-select wwwwww" v-model="$store.state.diaeqopen.waiguan" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上电检查">
            <el-select class="dialog-open-select wwwwww" v-model="$store.state.diaeqopen.dian" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-select class="dialog-open-select wwwwww" v-model="$store.state.diaeqopen.status" placeholder="请选择">
              <el-option label="已入库" value="已入库"></el-option>
              <el-option label="未入库" value="未入库"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogeq-open-btn">
        <el-button plain type="success" size="small" @click="$store.commit('putstoragedialogclose')">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="$store.dispatch('putstoragedialogsubmit')">确定</el-button>
      </div>
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
.dialogeq-open {
  padding-left: 80px;
  width: 320px;
}
.dialog-open-select {
  width: 220px;
}
.dialogeq-open-box .el-dialog__body {
  padding: 15px 25px 30px 25px;
}
.dialogeq-open-btn {
  text-align: center;
}
.wwwwww {
  margin-left: 10px;
}
.dialogbtn-right {
  margin-left: 30px !important;
}
.oppforimg-box {
  text-align: center;
}
.oppforimg {
  height: 600px;
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
.taskpage {
  margin-left: 30px;
  margin-top: 20px;
}
</style>

<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/mytask"
          @select="handleSelect"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="1">
            <template slot="title">
              <span class="taskmenu-tittle">任务</span>
            </template>
            <el-menu-item index="/mytask" class="zuobian">我的任务</el-menu-item>
            <el-menu-item index="/tasked" class="zuobian">已完成任务</el-menu-item>
            <el-menu-item index="/alltask" class="zuobian">全部任务</el-menu-item>
          </el-submenu>
          <el-menu-item index="/taskStatistical">
            <span slot="title" class="taskmenu-tittle">任务统计</span>
          </el-menu-item>
          <el-menu-item index="/taskallot">
            <span slot="title" class="taskmenu-tittle">任务分配</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="task-content">
      <div class="task-content-box">
        <router-view></router-view>
      </div>
    </el-main>
    <!-- 审批任务设备详情弹出框 -->
    <!-- <el-dialog
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
          prop="serialnumber1"
          label="设备一出厂序列号">
        </el-table-column>
        <el-table-column
          width="160"
          show-overflow-tooltip
          prop="serialnumber2"
          label="设备二出厂序列号">
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
            <i class="iconfont icon-yingyezhizhao" @click="eqimg(scope.row.temdid)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="50%"
        @close="yyzzimgclose"
        center
        title="生产厂家营业执照"
        :visible.sync="eqimgshow"
        append-to-body>
        <img id="eqimgloading" :src="eqimgdata" alt="图片丢失了" width="100%">
      </el-dialog>
    </el-dialog> -->
    <!-- 营业执照弹窗 -->
    <!-- <el-dialog
      :visible.sync="$store.state.opyyzz"
      @closed="$store.commit('closeyyzz')"
      width="50%">
      <img width="100%" :src="$store.state.license" alt="照片丢失了">
    </el-dialog> -->
    <!-- 设备入库任务操作弹出框 -->
    <!-- <el-dialog
      class="dialogeq-open-box"
      title="设备详情"
      @closed="eqputclose"
      :visible.sync="$store.state.Dialogshebei"
      width="30%">
      <div class="dialogeq-open">
        <el-form label-width="130px" :model="$store.state.diaeqopen" ref="putfrom" :rules="putfromrules" label-suffix=":" size="small">
          <el-form-item label="设备名称">
            <span class="wwwwww">{{$store.state.diaeqopen.divicename}}</span>
          </el-form-item>
          <el-form-item label="设备类型">
            <span class="wwwwww">{{$store.state.diaeqopen.devicetype}}</span>
          </el-form-item>
          <el-form-item label="设备型号">
            <span class="wwwwww">{{$store.state.diaeqopen.model}}</span>
          </el-form-item>
          <el-form-item label="设备编号">
            <span class="wwwwww">{{$store.state.diaeqopen.id}}</span>
          </el-form-item>
          <el-form-item label="出厂序列号" prop="serialnumber">
            <el-input class="timeselect" v-model="$store.state.diaeqopen.serialnumber" placeholder="请填写出厂序列号"></el-input>
          </el-form-item>
          <el-form-item label="送检人" prop="deliverer">
            <el-input class="timeselect" v-model="$store.state.diaeqopen.deliverer" placeholder="请填写送检人"></el-input>
          </el-form-item>
          <el-form-item label="送检时间" prop="deliver_time">
            <el-date-picker
              class="timeselect"
              v-model="$store.state.diaeqopen.deliver_time"
              value-format="yyyy-MM-dd">
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备外观" prop="appearance">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaeqopen.appearance" placeholder="请选择">
              <el-option label="完好" value="完好"></el-option>
              <el-option label="破损" value="破损"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上电检查" prop="power_on">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaeqopen.power_on" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备尺寸（cm）" prop="de_size">
            <el-input class="timeselect" v-model="$store.state.diaeqopen.de_size" placeholder="请填写设备尺寸"></el-input>
          </el-form-item>
          <el-form-item label="入库状态" prop="state">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaeqopen.state" placeholder="请选择">
              <el-option label="已入库" value="已入库"></el-option>
              <el-option label="未入库" value="未入库"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogeq-open-btn">
        <el-button plain type="success" size="small" @click="$store.commit('putstoragedialogclose')">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="putsubmit">确定</el-button>
      </div>
    </el-dialog> -->
    <!-- 检测任务日志弹窗 -->
    <!-- <el-dialog
      title="报文详情"
      @closed="detectionclose"
      :visible.sync="$store.state.caselogshow"
      width="50%">
      <div class="baowen">{{$store.state.log.data}}</div>
    </el-dialog> -->
    <!-- 检测任务照片弹窗 -->
    <!-- <el-dialog
      title="照片详情"
      @closed="detectionimgclose"
      :visible.sync="$store.state.caseimgshow"
      width="50%">
      <img width="100%" :src="$store.state.caseimage" alt="照片丢失了">
    </el-dialog> -->
    <!-- 检测任务视频弹窗 -->
    <!-- <el-dialog
      @close="detectionvideoclose"
      :visible.sync="$store.state.casevideoshow"
      width="50%">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="$store.state.playerOptions">
      </video-player>
    </el-dialog> -->
    <!-- 报告审核测试用例弹窗 -->
    <!-- <el-dialog
      title="用例详情"
      :visible.sync="$store.state.caselistshow"
      width="30%">
      <el-tree
        :data="$store.state.caselist"
        show-checkbox
        ref="tree"
        node-key="id"
        v-loading="$store.state.caseloading"
        element-loading-text="用例拼命加载中"
        accordion
        :props="{ label: 'name', children: 'case_list' }">
      </el-tree>
      <div class="dialog-open-dec">
        <el-button plain type="success" size="small" @click="$store.state.caselistshow = false">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="handleCheckChange">生成报告</el-button>
      </div>
    </el-dialog> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      abc: ""
    };
  },
  created() {
    this.$router.push({ name: "mytask" });
  },
  methods: {
    // 选中菜单关闭右侧滑块
    handleSelect() {
      this.$store.commit("taskhuakuaihidden");
    }
    // // 点击设备图标，查看图片
    // async eqimg(id) {
    //   this.eqimgshow = true;
    //   const date = new Date().getTime();
    //   this.eqimgdata = `http://192.168.1.150:8888/api/v1.0/showdevicelicense/${id}?${date}`;
    // },
    // // dialog关闭设备营业图片消失
    // yyzzimgclose() {
    //   this.eqimgdata = "";
    // },
    // // 设备入库提交设备信息
    // putsubmit() {
    //   this.$refs.putfrom.validate(async valid => {
    //     if (!valid) {
    //       return this.$message.error("请完整填写设备信息");
    //     }
    //     this.$store.dispatch(
    //       "putstoragedialogsubmit",
    //       this.$store.state.diaeqopen.id
    //     );
    //   });
    // },
    // // 设备入库dialog关闭
    // eqputclose() {
    //   this.$refs.putfrom.resetFields();
    // },
    // // 日志弹窗关闭
    // detectionclose() {
    //   this.$store.state.log = "";
    // },
    // // 检测用例照片弹窗关闭
    // detectionimgclose() {
    //   this.$store.state.caseimage = "";
    // },
    // // 检测用例视频弹窗关闭
    // detectionvideoclose() {
    //   this.$refs.videoPlayer.player.pause();
    // },
    // // 报告审核选择用例
    // async handleCheckChange() {
    //   const checkedKeys = this.$refs.tree.getCheckedKeys();
    //   let newArr = checkedKeys.filter(item => item != undefined);
    //   const res = await this.$http.post(`generatereport/${this.$store.state.devid}`, { caseid_list: newArr });
    //   if(res.status === 200) {
    //     this.$message.success("报告生成成功");
    //     this.$store.state.caselistshow = false;
    //     this.$store.dispatch("draft_report", this.$store.state.devid);
    //   } else {
    //     this.$message.error(res.msg);
    //   }
    // }
  }
};
</script>

<style>
.zuobian {
  margin-left: 30px;
  font-size: 16px;
}
.task-content {
  padding: 0 0 0 10px;
  height: 100%;
  min-height: 800px;
}
</style>

<template>
  <div class="big-box-home">
    <!-- 左边模块 -->
    <div class="left-box">
      <div class="card">
        <div>
          <div class="circle-progress inblock">
            <el-progress :width="100" :show-text="false" type="circle" :percentage="80" color="#67C23A"></el-progress>
            <div class="circle-progress-tittle one">{{number.pis_count}}/{{number.vms_count}}</div>
          </div>
          <div class="circle-progress inblock">
            <el-progress :width="100" :show-text="false" type="circle" :percentage="80" color="#E6A23C"></el-progress>
            <div class="circle-progress-tittle two">{{number.entrust_count}}</div>
          </div>
          <div class="circle-progress inblock">
            <el-progress :width="100" :show-text="false" type="circle" :percentage="100" color="#1ac7fe"></el-progress>
            <div class="circle-progress-tittle three">{{number.outeruser_count}}</div>
          </div>
        </div>
        <div>
          <i class="tittle-ps">PIS/VMS</i>
          <i class="tittle-waiwei">外委单位数量</i>
          <i class="tittle-shoujian">受检单位数量</i>
        </div>
        <div class="richeng">日程安排</div>
        <div id="calendar">
        <calendar
          ref="calendar"
          :events="calendar.events" 
          :lunar="calendar.lunar" 
          :value="calendar.value" 
          :weeks="calendar.weeks" 
          :months="calendar.months"
          @select="select">
        </calendar>
        <el-button type="text" class="dangqian" @click="today">Today</el-button>
        <div class="events-box">
          <div class="evente-title-box">
            <div class="evente-title">{{screenlisttime[0]}} 年 {{screenlisttime[1]}} 月 {{screenlisttime[2]}} 日</div>
          </div>
          <div class="events-content">
            <div class="events-list-box scrollbar">
              <div v-if="screenlist.length === 0" class="noevents">
                当前时间没有任务
              </div>
              <div class="events-list" v-for="(item, index) in screenlist" :key="index">
                <div class="events-list-dian"></div>
                <el-tooltip :content="item.title" placement="top">
                  <div class="events-list-name" @click="taskright(item)">{{item.title}}</div>
                </el-tooltip>
                <div class="events-list-time">{{item.date}}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div> 
    <!-- 中间模块 -->
    <div class="center-box" v-if="true">
      <div class="card2">
        <el-tabs v-model="activeName" class="tabs" >
          <el-tab-pane label="当前项目" name="first" class="tabs1">
            <Mytabs url="currentprojects"></Mytabs>
          </el-tab-pane>
          <el-tab-pane label="已完成项目" name="second" class="tabs1">
            <Mytabs url="comprojects"></Mytabs>
          </el-tab-pane>
          <el-tab-pane label="全部项目" name="third" class="tabs1">
            <Mytabs url="projects"></Mytabs>
          </el-tab-pane>
        </el-tabs>
      </div>     
      <!-- </el-row> -->
      <!-- 任务模块 -->
      <!-- <el-row class="center-bottom"> -->
      <div class="MyTask">
        <div class="MyTaskTop">我的任务</div>
        <div class="MyTaskcontent-box">
          <div class="MyTaskcontent scrollbar">
            <div class="MyTaskcontent-list" v-for="(item, index) in demoEventsone" :key="index">
              <i class="el-icon-bell MyTaskcontent-icon"></i>
              <span class="MyTaskcontent-list-span" @click="taskright(item)">{{item.taskname}}</span>
              <div class="MyTaskcontent-time">{{item.start_end[0]}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧模块 -->
    <div class="right-box" v-if="true">
      <!-- 公告模块 -->
      <div class="rightbox">
        <!-- 公告模块 -->
        <div class="rbtop">
          <!-- 公告标题 -->
          <div class="rbtoptittle">公告</div>
          <!-- 公告内容 -->
          <div class="announcementbox">
            <!-- 主体内容 -->
            <div class="announcement" v-if="seehistoryone">
              <div class="announcement-tittle">{{news.title}}</div>
              <div class="announcement-connet">
                {{news.content}}
              </div>
            </div>
            <!-- 历史内容 -->
            <div class="achistory scrollbar" v-if="seehistorytwo">
              <div v-for="item in history" :key="item.noti_id" class="historylist">
                <div class="hislisttittle inblock" @click="showannouncement(item.noti_id)">{{item.title}}</div>
                <div class="hislisttime inblock">{{item.datetime}}</div>
              </div>
            </div>
          </div>
          <!-- 公告底栏 -->
          <div class="botton-bar" v-if="seehistoryone">
            <el-button plain size="mini" class="btnone" @click="dialogannouncement = true">新增</el-button>
            <el-button plain size="mini" class="btntwo" @click="seehistoryone = false, seehistorytwo = true">历史</el-button>
          </div>
          <div class="botton-bartwo" v-if="seehistorytwo">
            <el-button type="text" @click="seehistorytwo = false, seehistoryone = true">返回</el-button> 
          </div>
        </div>
      </div>
      <!-- 文档模块 -->
      <div class="TheDocumentBox">
        <div class="TheDocumentBox-tittle">文档</div>
        <div class="TheDocumentBox-contentbox">
          <div class="TheDocumentBox-content scrollbar">
            <div class="document-list" v-for="(item, index) in doclist" :key="index">
              <i class="el-icon-document DocumentBox-content-icon"></i>
              <span class="DocumentBox-content-name">{{item.filename}}</span>
              <a :href="item.down_path" :download="item.down_path">
                <el-button class="document-dlbtn" type="primary" size="mini" plain>下载</el-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- 图表模块 -->
    <Chart v-if="false" class="chart-box-home">
    </Chart>
    <!-- 任务右滑模块 -->
    <div
      :class="{ 'hiddenhome': $store.state.noShow, 'sardhome': $store.state.isShow }"
      v-loading="loading"
      element-loading-text="任务提交中，请稍后"
      element-loading-spinner="el-icon-loading">
      <div class="taskright-title">
        <i class="iconfont icon-renwu"></i>
        <i class="fontt">任务</i>
        <i class="el-icon-close iicon" @click="close"></i>
      </div>
      <div class="home-right-write">
        <Applyfor v-if="route === 'applyfor'" :taskid="taskid">
        </Applyfor>
        <ApprovalContract v-if="route === 'approvalcontract'" :taskid="taskid">
        </ApprovalContract>
        <Contractor v-if="route === 'contractor'" :taskid="taskid">
        </Contractor>
        <Detection v-if="route === 'detection'" :taskid="taskid">
        </Detection>
        <Eqconfig v-if="route === 'eqconfig'" :taskid="taskid">
        </Eqconfig>
        <PutStorage v-if="route === 'putstorage'" :taskid="taskid">
        </PutStorage>
        <OutStorage v-if="route === 'outstorage'" :taskid="taskid">
        </OutStorage>
        <ReportAudit v-if="route === 'reportaudit'" :taskid="taskid">
        </ReportAudit>
        <DetectionAudit v-if="route === 'detectionaudit'" :taskid="taskid">
        </DetectionAudit>
      </div>
    </div>
    <!-- 新增公告dialog模块 -->
    <el-dialog title="新增公告" :visible.sync="dialogannouncement" width="40%" @close="closegonggao">
      <el-form label-position="right" label-width="80px" :model="NewAnnouncement" size="medium" :rules="NewAnnouncementRules" ref="NewAnnouncement">
        <el-form-item label="公告标题" prop="title">
          <el-input placeholder="请输入公告标题" v-model="NewAnnouncement.title" class="input"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            :rows="5"
            type="textarea"
            placeholder="请输入公告详情"
            v-model="NewAnnouncement.content">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" class="NewAnnouncementBtn" @click="SubmitNewAnnouncement">发布公告</el-button>
    </el-dialog>
    <!-- 公告详情dialog模块 -->
    <el-dialog title="公告详情" :visible.sync="dialogannouncementcontent" width="50%">
      <div class="announcementTwo-boxbox">
        <div class="announcementTwo-tittle">
          {{announcementTwo.title}}
        </div>
        <div class="announcementTwo-content scrollbar">  
          <p>{{announcementTwo.content}}</p>
        </div>
      </div>
    </el-dialog>
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
        <img :src="eqimgdata" alt="图片丢失了" width="100%">
      </el-dialog>
    </el-dialog>
    <!-- 营业执照弹窗 -->
    <el-dialog
      :visible.sync="$store.state.opyyzz"
      @closed="$store.commit('closeyyzz')"
      width="50%">
      <img width="100%" :src="$store.state.license" alt="照片丢失了">
    </el-dialog>
    <!-- 设备入库任务操作弹出框 -->
    <el-dialog
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
    </el-dialog>
    <!-- 检测任务日志弹窗 -->
    <el-dialog
      title="报文详情"
      @closed="detectionclose"
      :visible.sync="$store.state.caselogshow"
      width="50%">
      <!-- <el-input
        type="textarea"
        spellcheck ="false"
        :autosize="{ minRows: 14, maxRows: 15}"
        v-model="$store.state.log.data">
      </el-input> -->
      <div class="baowen">{{$store.state.log.data}}</div>
      <!-- <div class="dialog-open-dec">
        <el-button plain type="success" size="small" @click="$store.state.caselogshow = false">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right">确定</el-button>
      </div> -->
    </el-dialog>
    <!-- 检测任务照片弹窗 -->
    <el-dialog
      title="照片详情"
      @closed="detectionimgclose"
      :visible.sync="$store.state.caseimgshow"
      width="50%">
      <img width="100%" :src="$store.state.caseimage" alt="照片丢失了">
    </el-dialog>
    <!-- 检测任务视频弹窗 -->
    <el-dialog
      @close="detectionvideoclose"
      :visible.sync="$store.state.casevideoshow"
      width="50%">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="$store.state.playerOptions">
      </video-player>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import calendar from "../components/calendar.vue";
import Mytabs from "../components/Mytabs";
import Chart from "./Chart";
import Applyfor from "./tasks/Applyfor";
import ApprovalContract from "./tasks/ApprovalContract";
import Contractor from "./tasks/Contractor";
import Detection from "./tasks/Detection";
import Eqconfig from "./tasks/Eqconfig";
import PutStorage from "./tasks/PutStorage";
import OutStorage from "./tasks/OutStorage";
import ReportAudit from "./tasks/ReportAudit";
import DetectionAudit from "./tasks/DetectionAudit";
export default {
  data() {
    return {
      activeName: "first",
      NewAnnouncement: {
        title: "",
        content: ""
      }, //新增公告
      currentPage3: 5,
      dialogannouncement: false,
      seehistory: false, //新增历史dialog控制弹出
      seehistoryone: true, //公告内容是否显示
      seehistorytwo: false, //历史公告是否显示
      history: [], //公告历史
      NewAnnouncementRules: {
        title: [
          {
            required: true,
            message: "请输入公告标题",
            trigger: "blur"
          },
          { max: 66, message: "标题最多 66 个字符", trigger: "blur" }
        ],
        content: [
          {
            required: true,
            message: "请输入公告详情",
            trigger: "blur"
          },
          { max: 1300, message: "内容最多 1300 个字符", trigger: "blur" }
        ]
      }, //新增历史验证规则
      dialogannouncementcontent: false, //历史公告详情弹出
      announcementTwo: "", //公告详情内容
      number: "", //左上角数量
      news: "", //最新公告内容
      doclist: [], //文档列表
      taskid: 0, //任务id
      route: "", //任务组件别名
      eqimgshow: false, //设备生产厂家照片显示
      eqimgdata: "", //生厂厂家照片
      putfromrules: {
        serialnumber: [
          { required: true, message: "请输入出厂序列号", trigger: "blur" }
        ],
        deliverer: [
          { required: true, message: "请输入送检人", trigger: "blur" }
        ],
        deliver_time: [
          { required: true, message: "请选择送检时间", trigger: "blur" }
        ],
        appearance: [
          {
            required: true,
            message: "请选择设备外观",
            trigger: ["blur", "change"]
          }
        ],
        power_on: [
          {
            required: true,
            message: "请选择上电检查",
            trigger: ["blur", "change"]
          }
        ],
        de_size: [
          { required: true, message: "请选择设备尺寸", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择入库状态", trigger: "blur" }]
      } // 设备入库任务dialog form规则
    };
  },
  created() {
    this.aaa();
    this.newnotice();
    this.noticehostory();
    this.$store.dispatch("hometask");
    this.docment();
    this.calendarTwo();
    this.$store.commit("taskhuakuaihidden");
  },
  methods: {
    // dialog关闭设备营业图片消失
    yyzzimgclose() {
      this.eqimgdata = "";
    },
    // 日历模块数据处理
    initialize() {
      this.demoEventsone.forEach(element => {
        const date = element.start_end;
        const s1 = new Date(date[0]);
        const s2 = new Date(date[1]);
        const days = s2.getTime() - s1.getTime();
        const time = parseInt(days / (1000 * 60 * 60 * 24));
        for (let i = 0; i < time + 1; i++) {
          const obj = {};
          const s3 = s1.getTime() + 1000 * 60 * 60 * 24 * i;
          const s4 = this.formatDate(s3);
          obj.date = s4;
          obj.title = element.taskname;
          obj.taskid = element.taskid;
          obj.route = element.route;
          if (element.desc) {
            obj.desc = element.desc;
          }
          this.demoEvents.push(obj);
        }
      });
      this.demoEvents.sort(function(a, b) {
        return a.date > b.date;
      });
    },
    //时间处理函数
    formatDate(now) {
      const date = new Date(now);
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      return Y + "-" + M + "-" + D;
    },
    //提交公告
    async SubmitNewAnnouncement() {
      this.$refs.NewAnnouncement.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入内容");
        }
        const resdata = await this.$http.post("notice", this.NewAnnouncement);
        if (resdata.status === 201) {
          this.$message.success("添加成功");
          //清空表单
          for (let key in this.NewAnnouncement) {
            this.NewAnnouncement[key] = "";
          }
          //重新加载历史和当前最新公告
          this.newnotice();
          this.noticehostory();
          this.dialogannouncement = false;
        } else {
          this.$message.error(resdata.msg);
        }
      });
    },
    // 添加公告关闭清空信息
    closegonggao() {
      this.$refs.NewAnnouncement.resetFields();
    },
    //历史公告详情
    async showannouncement(id) {
      this.dialogannouncementcontent = true;
      const resdata = await this.$http.get(`notidetail/${id}`);
      if (resdata.status === 200) {
        this.announcementTwo = resdata;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //单位数量
    async aaa() {
      const resdata = await this.$http.get("count");
      if (resdata.status === 200) {
        this.number = resdata;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //获取最新公告
    async newnotice() {
      const resdata = await this.$http.get("newnotice");
      if (resdata.status === 200) {
        this.news = resdata;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //获取历史公告
    async noticehostory() {
      const resdata = await this.$http.get("notice");
      if (resdata.status === 200) {
        this.history = resdata.data;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //获取文档列表
    async docment() {
      const resdata = await this.$http.get("doclist");
      if (resdata.status === 200) {
        this.doclist = resdata.data;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    // v2.0日历初始化函数
    calendarTwo() {
      const date = new Date();
      const Y = date.getFullYear();
      const M = date.getMonth() + 1;
      const D = date.getDate();
      this.calendar.value[0] = Y;
      this.calendar.value[1] = M;
      this.calendar.value[2] = D;
    },
    // 日历点击出现任务
    select(value) {
      const datestring = value[0] + "-" + value[1] + "-" + value[2];
      this.$store.commit("handlescreenlist", datestring);
    },
    // 日历点击今天
    today() {
      this.yaerisshow = true;
      this.$refs.calendar.setToday();
      const todaytime = this.formatDate(new Date());
      this.$store.commit("handlescreenlist", todaytime);
    },
    //点击任务右滑
    taskright(item) {
      this.$store.commit("taskhuakuaishow");
      this.taskid = item.taskid;
      this.route = item.route;
      this.$store.dispatch("routerright", {
        taskid: item.taskid,
        route: item.route
      });
    },
    close() {
      this.$store.commit("taskhuakuaihidden");
    },
    // 点击设备图标，查看图片
    async eqimg(id) {
      this.eqimgshow = true;
      const date = new Date().getTime();
      this.eqimgdata = `http://192.168.1.150:8888/api/v1.0/showdevicelicense/${id}?${date}`;
    },
    // 提交设备信息
    putsubmit() {
      this.$refs.putfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整填写设备信息");
        }
        this.$store.dispatch(
          "putstoragedialogsubmit",
          this.$store.state.diaeqopen.id
        );
      });
    },
    // 设备入库dialog关闭
    eqputclose() {
      this.$refs.putfrom.resetFields();
    },
    // 日志弹窗关闭
    detectionclose() {
      this.$store.state.log = "";
    },
    // 检测用例照片弹窗关闭
    detectionimgclose() {
      this.$store.state.caseimage = "";
    },
    // 检测用例视频弹窗关闭
    detectionvideoclose() {
      this.$refs.videoPlayer.player.pause();
    }
  },
  components: {
    Mytabs,
    calendar,
    Chart,
    Applyfor,
    ApprovalContract,
    Contractor,
    Detection,
    Eqconfig,
    PutStorage,
    OutStorage,
    ReportAudit,
    DetectionAudit
  },
  computed: mapState({
    demoEventsone: "hometaskdata",
    demoEvents: "demoEvents",
    screenlist: "screenlist",
    screenlisttime: "screenlisttime",
    calendar: "calendar",
    loading: "loading"
  })
};
</script>

<style>
.big-box-home {
  width: 100%;
  min-width: 1903px;
  position: relative;
  overflow: hidden;
  min-height: 875px;
  height: 100%;
}
.left-box {
  display: inline-block;
  width: 400px;
  vertical-align: top;
}
.center-box {
  display: inline-block;
  width: 850px;
  vertical-align: top;
}
.right-box {
  display: inline-block;
  width: 34.2%;
  /* width: auto; */
  vertical-align: top;
}
.home-right-write {
  height: 500px;
}
.card {
  background-color: #fff;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  margin-left: 8px;
  min-width: 380px;
  /* height: 880px; */
}
.circle-progress {
  margin: 18px 12px 0 11px;
  position: relative;
}
.circle-progress-tittle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
}
.circle-progress-tittle.one {
  color: #67c23a;
}
.circle-progress-tittle.two {
  color: #e6a23c;
}
.circle-progress-tittle.three {
  color: #409eff;
}
.card2 {
  height: 400px;
  margin-left: 8px;
  background-color: #fff;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  padding: 0 20px 0 20px;
  min-width: 800px;
}
.tabs {
  font-size: 16px;
  height: 100%;
}
.tabs .el-tabs__item {
  font-size: 16px;
}

.rightbox {
  min-width: 63px;
  margin-left: 8px;
}
.rbtop {
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  height: 400px;
  background-color: #fff;
}
.rightbox .rbtoptittle {
  background-color: #fbfbfb;
  padding-left: 30px;
  height: 38px;
  border-radius: 6px 6px 0 0;
  line-height: 38px;
  border-bottom: 2px solid #d4d7d7;
  color: #515b6f;
  font-size: 20px;
  font-weight: 700;
}
.announcement {
  overflow: auto;
  height: 286px;
}
.announcementbox {
  padding: 10px 15px 20px 30px;
  border-bottom: 2px solid #d4d7d7;
  height: 280px;
}
.announcementbox .announcement-tittle {
  width: 574px;
  word-break: break-all;
  word-wrap: break-word;
  color: #515b6f;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px dashed #d4d7d7;
}
.announcementbox .announcement-connet {
  word-wrap: break-word;
  line-height: 30px;
  text-indent: 2em;
  margin-top: 10px;
}
.botton-bar {
  margin: 0 auto;
  width: 200px;
  position: relative;
  margin-top: 10px;
}
.botton-bar .btnone {
  position: absolute;
  left: 0;
}
.botton-bar .btntwo {
  position: absolute;
  right: 0;
}
.botton-bartwo {
  text-align: center;
}
.announcementbox .achistory {
  padding-top: 10px;
  overflow: auto;
  height: 270px;
}
.announcementbox .historylist {
  height: 40px;
  position: relative;
}
.historylist .hislisttittle {
  cursor: pointer;
  vertical-align: middle;
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.historylist .hislisttime {
  position: absolute;
  right: 20px;
}
.NewAnnouncementBtn {
  margin-left: 45%;
}
.announcementTwo-boxbox {
  overflow: auto;
}
.announcementTwo-tittle {
  word-break: break-all;
  word-wrap: break-word;
  font-size: 18px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #d4d7d7;
}
.announcementTwo-content {
  word-break: break-all;
  word-wrap: break-word;
  text-indent: 2em;
  height: 300px;
  width: 100%;
  line-height: 24px;
}
.tittle-ps {
  margin-left: 30px;
  font-size: 16px;
}
.tittle-waiwei {
  margin-left: 40px;
}
.tittle-shoujian {
  margin-left: 30px;
}
.richeng {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  background-color: #fbfbfb;
  border-bottom: 1px solid #e8e8e8;
}
.TheDocumentBox {
  background-color: #fff;
  height: 470px;
  margin: 8px 0 0 8px;
  background-color: #fff;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
}
.TheDocumentBox-tittle {
  height: 50px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 20px;
  line-height: 50px;
  font-size: 22px;
  color: #4f5a6e;
}
.TheDocumentBox-contentbox {
  height: 398px;
  padding: 10px 0;
}
.TheDocumentBox-content {
  overflow: auto;
  height: 100%;
}
.document-list {
  position: relative;
  height: 46px;
  line-height: 46px;
  font-size: 18px;
  vertical-align: middle;
  color: #444;
}
.DocumentBox-content-icon {
  color: #33a7e0;
  font-size: 24px;
  margin-left: 20px;
}
.DocumentBox-content-name {
  margin-left: 10px;
}
.document-dlbtn {
  position: absolute;
  right: 20px;
  top: 9px;
}
.MyTask {
  background-color: #fff;
  height: 470px;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  margin: 8px 0 0 8px;
}
.MyTaskTop {
  height: 50px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 20px;
  line-height: 50px;
  font-size: 22px;
  color: #4f5a6e;
}
.MyTaskcontent-box {
  /* overflow: hidden; */
  height: 398px;
  padding: 10px 0;
}
.MyTaskcontent-box .MyTaskcontent {
  height: 100%;
  overflow-y: auto;
}
.MyTaskcontent-list {
  position: relative;
  height: 46px;
  line-height: 46px;
  font-size: 18px;
  color: #444;
}
.MyTaskcontent-icon {
  color: #409efe;
  font-size: 24px;
  margin-left: 20px;
  vertical-align: middle;
}
.MyTaskcontent-time {
  position: absolute;
  right: 20px;
  top: 0;
  height: 46px;
  line-height: 46px;
  font-weight: 500;
  color: #525a71;
}
.tabs1 {
  height: 100%;
}
.events-box {
  height: 322px;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.evente-title-box {
  background-color: #409eff;
}
.evente-title {
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.events-content {
  height: 282px;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
}
.events-list-box {
  overflow: auto;
  height: 262px;
}
.events-list {
  box-sizing: border-box;
  padding-top: 3px;
  background-color: #fff;
  height: 70px;
  border-radius: 4px;
  border: 1px solid #c0c4cc;
  margin-bottom: 4px;
  margin-right: 10px;
}
.events-list-dian {
  margin-left: 4px;
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: blue;
}
.events-list-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  margin-left: 10px;
  overflow: hidden;
  margin-top: 4px;
  width: 328px;
  color: #303133;
  height: 24px;
  line-height: 20px;
  border-bottom: 1px dashed #606266;
}
.events-list-time {
  margin-left: 10px;
  width: 328px;
  margin-top: 4px;
  color: #606266;
  font-size: 14px;
}
.noevents {
  text-align: center;
  color: #606266;
}
.dangqian {
  position: absolute;
  left: 280px;
  top: 0px;
  font-size: 14px;
}
#calendar {
  position: relative;
}
.MyTaskcontent-list-span {
  margin-left: 10px;
  cursor: pointer;
  position: relative;
  top: 2px;
}
.sardhome {
  overflow: hidden;
  top: 0;
  right: 0;
  position: absolute;
  background-color: #f0f4f8;
  box-shadow: 0px 0px 4px 3px #acd2fa;
  border-radius: 6px;
  height: 882px;
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
.hiddenhome {
  overflow: hidden;
  top: 0;
  right: 0;
  z-index: 2;
  position: absolute;
  background-color: #f0f4f8;
  box-shadow: 0px 0px 4px 3px #acd2fa;
  border-radius: 6px;
  height: 882px;
  z-index: 9999;
  width: 940px;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  -os-transition: all 0.5s;
  -os-transform: translateX(110%);
  transform: translateX(110%);
}
.icon-renwu {
  font-size: 32px;
  color: #1ac7ff;
}
.chart-box-home {
  display: inline-block;
  width: 78.6%;
  min-width: 1497px;
  margin-left: 6px;
}
.dialogeq-open-box .el-dialog__body {
  padding: 15px 25px 30px 25px;
}
.dialogeq-open {
  padding-left: 80px;
  width: 320px;
}
.dialogeq-open-btn {
  text-align: center;
}
.dialog-open-select {
  width: 220px;
}
.wwwwww {
  margin-left: 10px;
}
.dialogbtn-right {
  margin-left: 30px !important;
}
.aaaaaa {
  width: 30px;
  height: 20px;
}
</style>

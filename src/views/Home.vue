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
            <!-- <Mytabs url="currentprojects"></Mytabs> -->
            <el-tabs
              tab-position="top"
              @tab-click="handleTabClickDate"
              class="tabs-date"
              v-model="datedate">
              <el-tab-pane :label="item" v-for="(item, index) in date" :key="index">
                <div class="list">
                  <div class="list1" v-for="item in projectlist" :key="item.id">
                    <el-tooltip :content="item.pro_name" placement="top">
                      <i class="listname">{{item.pro_name}}</i>
                    </el-tooltip>
                    <div class="progress-line"><el-progress :percentage="item.sechedule" :status="item.status"></el-progress></div>
                    <div class="objtime">{{item.starttime}}</div>
                  </div>
                  <div v-if="projectlist.length === 0">当前没有项目</div>
                </div>
                <div class="page">
                  <el-pagination
                    :current-page.sync="currentPage"
                    @current-change="handleCurrentChange"
                    :page-size="projectpagesize"
                    layout="total, prev, pager, next, jumper"
                    :total="projectpagetotal">
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
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
              <i v-show="item.file_ext !== 'xlsx' && item.file_ext !== 'doc' && item.file_ext !== 'docx' && item.file_ext !== 'pptx' && item.file_ext !== 'pdf' && item.file_ext !== 'txt' && item.file_ext !== 'mpg' && item.file_ext !== 'mp4' && item.file_ext !== 'rmvb' && item.file_ext !== 'mpeg'" class="el-icon-document wenjian1"></i>
              <i v-show="item.file_ext === 'xlsx'" class="iconfont icon-excel docexcel1"></i>
              <i v-show="item.file_ext === 'doc' || item.file_ext === 'docx'" class="iconfont icon-excel docword1"></i>
              <i v-show="item.file_ext === 'pptx'" class="iconfont icon-ppt1 docppt1"></i>
              <i v-show="item.file_ext === 'pdf'" class="iconfont icon-pdf docpdf1"></i>
              <i v-show="item.file_ext === 'txt'" class="iconfont icon-txt doctxt1"></i>
              <i v-show="item.file_ext === 'mp4' || item.file_ext === 'rmvb' || item.file_ext === 'mpeg' || item.file_ext === 'mpg'" class="iconfont icon-video docvideo1"></i>
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
    <Chart1 v-if="false" class="chart-box-home">
    </Chart1>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
// import calendar from "../components/calendar.vue";
// import Mytabs from "../components/Mytabs";
// import Chart from "./Chart";
// import Applyfor from "./tasks/Applyfor";
// import ApprovalContract from "./tasks/ApprovalContract";
// import Contractor from "./tasks/Contractor";
// import Detection from "./tasks/Detection";
// import Eqconfig from "./tasks/Eqconfig";
// import PutStorage from "./tasks/PutStorage";
// import OutStorage from "./tasks/OutStorage";
// import ReportAudit from "./tasks/ReportAudit";
// import DetectionAudit from "./tasks/DetectionAudit";
// import Chart1 from "./chart1";
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
      projectlist: [], //项目数据
      datedate: "", //年份tab绑定数据
      projectpagesize: 5, //顶部项目模块分页每页多少条
      projectpagetotal: 0, //顶部项目模块总共多少条
      currentPage: 1, //默认第几页
      date: [], //年
      datetwo: "", //请求日期
      tabsloading: true //加载效果
    };
  },
  created() {
    this.tabTime();
    this.tabsget();
    this.aaa();
    this.newnotice();
    this.noticehostory();
    this.$store.dispatch("hometask");
    this.docment();
    this.calendarTwo();
    this.$store.commit("taskhuakuaihidden");
    console.log("     \\\\            //\n" + 
      "      \\\\          //\n" +
      "       \\\\        //\n" +
      "##DDDDDDDDDDDDDDDDDDDDDD##\n"+
      "## DDDDDDDDDDDDDDDDDDDD ##   ________   ___   ___        ___   ________   ___   ___        ___\n"+
      "## hh                hh ##   |\\   __  \\ |\\  \\ |\\  \\      |\\  \\ |\\   __  \\ |\\  \\ |\\  \\      |\\  \\ \n"+
      "## hh    //    \\\\    hh ##   \\ \\  \\|\\ /_\\ \\  \\\\ \\  \\     \\ \\  \\\\ \\  \\|\\ /_\\ \\  \\\\ \\  \\     \\ \\  \\ \n"+
      "## hh   //      \\\\   hh ##    \\ \\  \\|\\ /_\\ \\  \\\\ \\  \\     \\ \\  \\\\ \\  \\|\\ /_\\ \\  \\\\ \\  \\     \\ \\  \\ \n"+
      "## hh  //        \\\\  hh ##     \\ \\   __  \\\\ \\  \\\\ \\  \\     \\ \\  \\\\ \\   __  \\\\ \\  \\\\ \\  \\     \\ \\  \\ \n"+
      "## hh                hh ##      \\ \\  \\|\\  \\\\ \\  \\\\ \\  \\____ \\ \\  \\\\ \\  \\|\\  \\\\ \\  \\\\ \\  \\____ \\ \\  \\ \n"+
      "## hh      wwww      hh ##       \\ \\_______\\\\ \\__\\\\ \\_______\\\\ \\__\\\\ \\_______\\\\ \\__\\\\ \\_______\\\\ \\__\\ \n"+
      "## hh                hh ##        \\|_______| \\|__| \\|_______| \\|__| \\|_______| \\|__| \\|_______| \\|__| \n"+
      "## MMMMMMMMMMMMMMMMMMMM ##\n"+
      "##MMMMMMMMMMMMMMMMMMMMMM##\n"+
      "     \\/            \\/"
    )
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
      const date = new Date().getTime();
      const resdata = await this.$http.get(`newnotice?${date}`);
      if (resdata.status === 200) {
        this.news = resdata;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //获取历史公告
    async noticehostory() {
      const date = new Date().getTime();
      const resdata = await this.$http.get(`notice?${date}`);
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
    //日期tab点击发送时间
    handleTabClickDate(tab) {
      this.currentPage = 1;
      this.datetwo = tab.label;
      this.tabsget();
    },
    // 项目是否完成处理函数
    project(pro) {
      pro.forEach(obj => {
        if (obj.sechedule === 100) {
          obj.status = "success";
        } else {
          obj.status = "";
        }
      });
    },
    //tabs栏时间处理函数
    tabTime() {
      const timeone = new Date();
      let Y = timeone.getFullYear();
      Y = Y + "";
      this.date.push(Y);
      for (let i = 0; i < 2; i++) {
        Y--;
        Y = Y + "";
        this.date.push(Y);
      }
      this.datetwo = this.date[0];
    },
    //tabs栏发请求
    async tabsget() {
      const resdata = await this.$http.get(
        `currentprojects/${this.datetwo}/${this.currentPage}`
      );
      if (resdata.status === 200) {
        this.projectpagetotal = resdata.data_total;
        this.projectlist = resdata.pro_list;
        this.project(this.projectlist);
        this.tabsloading = false;
      } else {
        this.$message.error(resdata.msg);
      }
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tabsget();
    }
  },
  components: {
    calendar: resolve => {
      require(["../components/calendar.vue"], resolve)
    }, 
    Mytabs: resolve => {
      require(["../components/Mytabs"], resolve)
    },
    Chart: resolve => {
      require(["./Chart"], resolve)
    },
    Applyfor: resolve => {
      require(["./tasks/Applyfor"], resolve)
    },
    ApprovalContract: resolve => {
      require(["./tasks/ApprovalContract"], resolve)
    },
    Contractor: resolve => {
      require(["./tasks/Contractor"], resolve)
    },
    Detection: resolve => {
      require(["./tasks/Detection"], resolve)
    },
    Eqconfig: resolve => {
      require(["./tasks/Eqconfig"], resolve)
    },
    PutStorage: resolve => {
      require(["./tasks/PutStorage"], resolve)
    },
    OutStorage: resolve => {
      require(["./tasks/OutStorage"], resolve)
    },
    ReportAudit: resolve => {
      require(["./tasks/ReportAudit"], resolve)
    },
    DetectionAudit: resolve => {
      require(["./tasks/DetectionAudit"], resolve)
    },
    Chart1: resolve => {
      require(["./chart1"], resolve)
    },
    // Mytabs,
    // calendar,
    // Chart,
    // Applyfor,
    // ApprovalContract,
    // Contractor,
    // Detection,
    // Eqconfig,
    // PutStorage,
    // OutStorage,
    // ReportAudit,
    // DetectionAudit,
    // Chart1
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
.tabs-date {
  height: 100%;
}
.list {
  height: 230px;
}
.list1 {
  height: 30px;
  line-height: 30px;
  position: relative;
  margin-bottom: 20px;
}
.listname {
  position: absolute;
  top: 0;
  display: inline-block;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #606266;
}
.progress-line {
  display: inline-block;
  width: 500px;
  position: absolute;
  top: 5px;
  left: 170px;
}
.objtime {
  position: absolute;
  right: 0;
  color: #505b6f;
}
.page {
  margin-top: 20px;
  text-align: center;
}
.wenjian1 {
  font-size: 24px;
  margin: 0 8px 0 6px;
  color: #409eff;
}
.docword1 {
  font-size: 20px;
  margin: 0 10px 0 8px;
  color: #409eff;
}
.docexcel1 {
  font-size: 20px;
  margin: 0 10px 0 8px;
  color: #67c23a;
}
.docppt1 {
  font-size: 26px;
  margin: 0 8px 0 4px;
  color: #d04626;
}
.docpdf1 {
  font-size: 26px;
  margin: 0 8px 0 4px;
  color: #d04626;
}
.doctxt1 {
  font-size: 26px;
  margin: 0 6px 0 6px;
  color: #909399;
}
.docvideo1 {
  font-size: 20px;
  margin: 0 10px 0 8px;
  color: #088fff;
}
</style>

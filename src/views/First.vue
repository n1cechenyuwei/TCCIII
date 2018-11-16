<template>
  <div>
    <el-row class="big">
      <!-- 左边模块 -->
      <el-col :span="5">
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
                  <div class="events-list-name">{{item.title}}</div>
                  <div class="events-list-time">{{item.date}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <vue-event-calendar
            :events="demoEvents">
          </vue-event-calendar> -->
         </div>
        </div>
      </el-col>
      <!-- 中间模块 -->
      <el-col :span="11">
        <el-row class="center-top">
          <!-- 顶部项目模块 -->
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
        </el-row>
        <!-- 文档模块 -->
        <el-row class="center-bottom">
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
        </el-row>
      </el-col>
      <!-- 右侧模块 -->
      <el-col :span="8" class="rbtwo">
        <div class="rightbox">
          <!-- 公告模块 -->
          <div class="rbtop">
            <!-- 公告标题 -->
            <div class="rbtoptittle">公告</div>
            <!-- 公告内容 -->
            <div class="announcementbox">
              <!-- 主体内容 -->
              <div class="announcement" v-show="seehistoryone">
                <div class="announcement-tittle">{{news.title}}</div>
                <div class="announcement-connet scrollbar">
                  {{news.content}}
                </div>
              </div>
              <!-- 历史内容 -->
              <div class="achistory scrollbar" v-show="seehistorytwo">
                <div v-for="item in history" :key="item.noti_id" class="historylist">
                  <div class="hislisttittle inblock" @click="showannouncement(item.noti_id)">{{item.title}}</div>
                  <div class="hislisttime inblock">{{item.datetime}}</div>
                </div>
              </div>
            </div>
            <!-- 公告底栏 -->
            <div class="botton-bar" v-show="seehistoryone">
              <el-button plain size="mini" class="btnone" @click="dialogannouncement = true">新增</el-button>
              <el-button plain size="mini" class="btntwo" @click="seehistoryone = false, seehistorytwo = true">历史</el-button>
            </div>
            <div class="botton-bartwo" v-show="seehistorytwo">
              <el-button type="text" @click="seehistorytwo = false, seehistoryone = true">返回</el-button> 
            </div>
          </div>
        </div>
        <div class="MyTask">
          <div class="MyTaskTop">我的任务</div>
          <div class="MyTaskcontent-box">
            <div class="MyTaskcontent scrollbar">
              <div class="MyTaskcontent-list" v-for="(item, index) in demoEventsone" :key="index">
                <i class="el-icon-bell MyTaskcontent-icon"></i>
                {{item.taskname}}
                <div class="MyTaskcontent-time">{{item.start_end[0]}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 新增公告dialog模块 -->
    <el-dialog title="新增公告" :visible.sync="dialogannouncement" width="40%">
      <el-form label-position="right" label-width="80px" :model="NewAnnouncement" size="medium" :rules="NewAnnouncementRules" ref="NewAnnouncement">
        <el-form-item label="公告名称" prop="title">
          <el-input placeholder="请输入公告标题" v-model="NewAnnouncement.title" class="input"></el-input>
        </el-form-item>
        <el-form-item label="公告详情" prop="content">
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
import calendar from "../components/calendar.vue";
import Mytabs from "../components/Mytabs";
export default {
  data() {
    return {
      demoEvents: [], //日历绑定数据
      demoEventsone: [],
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
          }
        ],
        content: [
          {
            required: true,
            message: "请输入公告详情",
            trigger: "blur"
          }
        ]
      }, //新增历史验证规则
      dialogannouncementcontent: false, //历史公告详情弹出
      announcementTwo: "", //公告详情内容
      number: "", //左上角数量
      news: "", //最新公告内容
      doclist: [], //文档列表
      calendar: {
        value: [2018, 9, 6], //默认日期
        weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        events: {
          "2017-7-7": "$408",
          "2017-7-20": "$408",
          "2017-7-21": "$460",
          "2017-7-22": "$500"
        },
        lunar: true //是否显示农历
      },
      screenlist: [], // 日历任务列表
      screenlisttime: [] //任务列表标题时间
    };
  },
  created() {
    this.aaa();
    this.newnotice();
    this.noticehostory();
    this.task();
    this.docment();
    this.calendarTwo();
  },
  methods: {
    // 日历模块数据处理
    initialize() {
      this.demoEventsone.forEach(element => {
        const date = element.start_end;
        // const s1 = new Date(date[0].replace(/-/g, "/"));
        const s1 = new Date(date[0]);
        const s2 = new Date(date[1]);
        // const s2 = new Date(date[1].replace(/-/g, "/"));
        const days = s2.getTime() - s1.getTime();
        const time = parseInt(days / (1000 * 60 * 60 * 24));
        for (let i = 0; i < time + 1; i++) {
          const obj = {};
          const s3 = s1.getTime() + 1000 * 60 * 60 * 24 * i;
          const s4 = this.formatDate(s3);
          obj.date = s4;
          obj.title = element.taskname;
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
        // date.getMonth() + 1 < 10
        //   ? "0" + (date.getMonth() + 1)
        //   : date.getMonth() + 1;
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
        if (resdata.status === 200) {
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
          this.$message.error(resdata.data.msg);
        }
      });
    },
    //历史公告详情
    async showannouncement(id) {
      this.dialogannouncementcontent = true;
      const resdata = await this.$http.get(`notidetail/${id}`);
      if (resdata.status === 200) {
        this.announcementTwo = resdata.data;
      } else {
        this.$message.error(resdata.data.msg);
      }
    },
    //单位数量
    async aaa() {
      const resdata = await this.$http.get("count");
      if (resdata.status === 200) {
        this.number = resdata.data;
      } else {
        this.$message.error(resdata.data.msg);
      }
    },
    //获取最新公告
    async newnotice() {
      const resdata = await this.$http.get("newnotice");
      if (resdata.status === 200) {
        this.news = resdata.data;
      } else {
        this.$message.error(resdata.data.msg);
      }
    },
    //获取历史公告
    async noticehostory() {
      const resdata = await this.$http.get("notice");
      if (resdata.status === 200) {
        this.history = resdata.data.data;
      } else {
        this.$message.error(resdata.data.msg);
      }
    },
    //获取任务
    async task() {
      const resdata = await this.$http.get("tasklist");
      if (resdata.data.status === 200) {
        this.demoEventsone = resdata.data.data;
        this.initialize();
        this.screenall();
      } else {
        this.$message.error(resdata.data.msg);
      }
    },
    //获取文档列表
    async docment() {
      const resdata = await this.$http.get("doclist");
      if (resdata.status === 200) {
        this.doclist = resdata.data.data;
      } else {
        this.$message.error(resdata.data.msg);
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
      let screen = this.demoEvents.filter(canshu => {
        return canshu.date === datestring ? true : false;
      });
      const titletime = datestring.split("-");
      this.screenlisttime = titletime;
      this.screenlist = screen;
    },
    // 所有日历任务转换为calendar的任务,并且默认显示当天的任务
    screenall() {
      const eventslist = {};
      this.demoEvents.forEach(element => {
        eventslist[element.date] = element.title;
      });
      this.calendar.events = eventslist;
      const todaytime = this.formatDate(new Date());
      let screentwo = this.demoEvents.filter(value => {
        return value.date === todaytime ? true : false;
      });
      const titletimetwo = todaytime.split("-");
      this.screenlisttime = titletimetwo;
      this.screenlist = screentwo;
    }
  },
  components: {
    Mytabs,
    calendar
  }
};
</script>

<style>
.big {
  min-width: 1900px;
  padding-right: 10px;
}
.card {
  background-color: #fff;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  margin-left: 8px;
  min-width: 380px;
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
.announcementbox {
  padding: 10px 15px 20px 30px;
  border-bottom: 2px solid #d4d7d7;
  height: 280px;
}
.announcementbox .announcement-tittle {
  height: 40px;
  line-height: 40px;
  color: #515b6f;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px dashed #d4d7d7;
}
.announcementbox .announcement-connet {
  height: 230px;
  word-wrap: break-word;
  line-height: 30px;
  margin-top: 10px;
  overflow: auto;
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
  /* vertical-align: middle; */
  position: absolute;
  right: 20px;
}
.NewAnnouncementBtn {
  margin-left: 45%;
}
.announcementTwo-tittle {
  font-size: 18px;
  margin-bottom: 20px;
}
.announcementTwo-content {
  text-indent: 2em;
  height: 300px;
  line-height: 24px;
  overflow: auto;
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
  margin: 10px 0 0 8px;
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
  font-weight: 600;
  vertical-align: middle;
  color: #333333;
  /* background-color: #ccc; */
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
  font-weight: 600;
  color: #333333;
  /* background-color: #ccc; */
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
.center-top {
  height: 400px;
}
.center-bottom {
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
</style>

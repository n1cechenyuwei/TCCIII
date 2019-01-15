import Vue from "vue";
import Vuex from "vuex";
import http from "@/components/vuexajax";
import { Message } from "element-ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseurl: "localhost:8888/api/v1.0/", //上传ip
    isShow: false, //显示右侧卡片
    noShow: true, //控制是否滑出卡片
    task: [], //我的任务列表
    mytasktotal: 0, //我的任务总条数
    tasked: [], //已完成任务列表
    taskedtotal: 0, //已完成任务总条数
    taskid: 0,
    DialogEquipment: false, //审批任务设备详情dialog是否显示
    Dialogshebei: false, //设备入库设备操作是否显示
    equipment: [], // 设备入库信息
    diaeqopen: {}, // 设备dialog信息
    opyyzz: false, //营业执照dialog
    appfordata: "", // 申请审批详情
    appforcompany: "", // 审批详情公司信息
    tasksechedule: 0, //任务进度
    disable: false, //任务进度条是否可以调整
    appeqlist: [], // 申请页面设备列表数据
    taskinfo: "", // 任务信息
    appconbb: "", // 甲方信息
    appcompactinfo: "", // 合同信息
    draftfile: [], //合同初稿数据
    finalfile: [], //合同上传终稿数据
    comtime: [], //合同期限
    dateishow: false,
    dateshow: true,
    appcomfrom: {
      com_money: "",
      com_starttime: "",
      com_endtime: ""
    },
    filehetongid: {
      com_no: 0
    },
    uploadloding: false, // 上传列表动画
    license: "", // 营业执照
    hometaskdata: [], // 首页任务
    demoEvents: [], // 日历绑定数据
    screenlist: [], // 日历任务列表
    screenlisttime: [], //任务列表标题时间
    calendar: {
      value: [2018, 9, 6], //默认日期
      weeks: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      events: {},
      lunar: true //是否显示农历
    },
    loading: false, // 右滑动画
    sbnumber: [], // 设备待入库已入库总数
    deviceinfo: "", // 环境配置设备信息
    workbenchinfo: "", // 环境配置工作台信息
    out_entrust_info: "", // 外委单位信息
    contradeviceinfo: "", // 外委设备信息
    uptaskid: {
      did: 0
    }, // 外委报告上传需要的设备id
    ctupfilelist: [], // 外委报告上传的文件列表
    ctuploading: false, // 报告上传列表加载动画
    uploadbtn: false, // 上传按钮是否disable
    tasktype: "", // 任务类型
    workbenchid: 0, // 工作台编号
    usecaseinfo: [], // 检测用例列表
    log: "", // 单个日志信息
    caselogshow: false, // 日志是否显示
    toolsvalue: "", // 选择工具绑定值
    hrefvalue: "#", // 启动工具绑定值
    dis: true, // 启动工具按钮是否点击
    caseimgshow: false, // 检测用例照片是否显示
    caseimage: "", // 检测用例照片地址
    casevideoshow: false, // 检测用例视频显示
    // casevideourl: "", // 检测用例视频url
    playerOptions: {
      playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
      autoplay: false, //如果true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: false, // 导致视频一结束就重新开始。
      preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: "zh-CN",
      aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [
        {
          type: "video/mp4",
          src: "" //url地址
        }
      ],
      // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", //你的封面地址
      // width: document.documentElement.clientWidth,
      notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: false,
        fullscreenToggle: true //全屏按钮
      }
    }, // 视频播放器配置
    issubmitok: true, // 检测任务检测结果
    final_report: [], // 报告审核终稿
    draft_report: [], // 报告审核初稿
    caselist: [], // 检测用例列表
    caselistshow: false, // 检测用例列表弹窗
    caseloading: false, // 用例加载动画
    devid: 0, // 设备id
    outdialog: false, // 设备出库dialog显示
    diaoutopen: {}, // 设备出库daialog详情信息
    decissubmitok: true,
    tasklistdata1: [], // 任务分配所有数据
    tasklisttotal: 0, // 任务分配总条数
    chartone: "", // 任务分配表实例
    alltask: [], // 全部任务数据
    alltasktotal: 0 // 全部任务总数据条数
  },
  mutations: {
    // 任务读取
    loadingMytask(state, data) {
      this.state.task = data.data;
      this.state.mytasktotal = data.total;
    },
    // 全部任务读取
    loadingAlltask(state, data) {
      this.state.alltask = data.data;
      this.state.alltasktotal = data.total;
    },
    // 已完成任务读取
    loadingTasked(state, data) {
      this.state.tasked = data.data;
      this.state.taskedtotal = data.total;
    },
    //右侧滑块显示
    taskhuakuaishow(state) {
      state.noShow = false;
      state.isShow = true;
    },
    //右侧滑块隐藏
    taskhuakuaihidden(state) {
      state.noShow = true;
      state.isShow = false;
    },
    // 我的任务点击表格发请求并带入任务id  和刷新右侧页面
    routerright(state, data) {
      state.taskid = data.id;
      if (data.route === "applyfor") {
        state.appfordata = data.data;
        state.appforcompany = data.data.companyinfo;
        state.tasksechedule = data.data.sechedule;
        if (data.data.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "approvalcontract") {
        state.comtime = [];
        state.comtime[0] = data.data.compactinfo.starttime;
        state.comtime[1] = data.data.compactinfo.endtime;
        state.taskinfo = data.data.taskinfo;
        state.appconbb = data.data.companyinfo;
        state.appcompactinfo = data.data.compactinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.draftfile = data.data.draftlist;
        state.finalfile = data.data.finallist;
        state.filehetongid.com_no = data.data.compactinfo.com_no;
        state.dateishow = false;
        state.dateshow = true;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "putstorage") {
        state.taskinfo = data.data.taskinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.appconbb = data.data.companyinfo;
        state.equipment = data.data.devicelist;
        state.sbnumber[0] = data.data.pending_storage;
        state.sbnumber[1] = data.data.warehousing;
        state.sbnumber[2] = data.data.device_total;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "eqconfig") {
        state.taskinfo = data.data.taskinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.appconbb = data.data.companyinfo;
        state.deviceinfo = data.data.deviceinfo;
        state.workbenchinfo = data.data.workbenchinfo;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "contractor") {
        state.taskinfo = data.data.taskinfo;
        state.out_entrust_info = data.data.out_entrust_info;
        state.contradeviceinfo = data.data.deviceinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.uptaskid.did = data.data.deviceinfo.device_id;
        state.ctupfilelist = data.data.report_list;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "detection") {
        state.taskinfo = data.data.taskinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.deviceinfo = data.data.deviceinfo;
        state.workbenchid = data.data.workbenchid;
        state.usecaseinfo = data.data.usecaseinfo;
        state.issubmitok = true;
        state.tasktype = data.data.tasktype;
        state.toolsvalue = "";
        state.hrefvalue = "#";
        state.dis = true;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "detectionaudit") {
        state.taskinfo = data.data.taskinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.deviceinfo = data.data.deviceinfo;
        state.workbenchid = data.data.workbenchid;
        state.usecaseinfo = data.data.usecaseinfo;
        data.data.usecaseinfo.forEach(obj => {
          if (obj.audit_result === 0) {
            obj.audit_result = "";
          }
        });
        state.usecaseinfo = data.data.usecaseinfo;
        state.tasktype = data.data.tasktype;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "reportaudit") {
        state.taskinfo = data.data.taskinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.appconbb = data.data.company_info;
        state.deviceinfo = data.data.device_info;
        state.final_report = data.data.final_report;
        state.draft_report = data.data.draft_report;
        state.uptaskid.did = data.data.device_info.id;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      } else if (data.route === "outstorage") {
        state.taskinfo = data.data.taskinfo;
        state.tasksechedule = data.data.taskinfo.sechedule;
        state.appconbb = data.data.companyinfo;
        state.equipment = data.data.devicelist;
        state.sbnumber[0] = data.data.outing_storage;
        state.sbnumber[1] = data.data.outstock;
        state.sbnumber[2] = data.data.device_total;
        if (data.data.taskinfo.state === "已完成") {
          state.disable = true;
        } else {
          state.disable = false;
        }
      }
    },
    //审批任务设备详情dialog是否显示
    applyEquipment(state, appeqlist) {
      state.DialogEquipment = true;
      state.appeqlist = appeqlist;
    },
    //设备入库任务设备详情dialog显示
    putstoragedialog(state, data) {
      state.Dialogshebei = true;
      state.diaeqopen = data;
    },
    // 设备出库任务设备详情dialog显示
    outstoragedialog(state, data) {
      state.outdialog = true;
      state.diaoutopen = data;
    },
    //设备入库任务设备详情dialog关闭
    putstoragedialogclose(state) {
      state.Dialogshebei = false;
    },
    //设备出库任务设备详情dialog关闭
    outstoragedialogclose(state) {
      state.outdialog = false;
    },
    //设备入库任务设备详情dialog确定按钮提交
    putstoragedialogsubmit(state) {
      state.Dialogshebei = false;
    },
    //打开申请营业执照
    openyyzz(state) {
      state.license = state.appforcompany.license;
      state.opyyzz = true;
    },
    // 关闭营业执照清空
    closeyyzz(state) {
      state.license = "";
    },
    // 生成初稿刷新初稿列表
    handlecreatdraftfile(state, chugaolist) {
      state.draftfile = chugaolist;
    },
    // 获取终稿
    handleuploaddata(state, list) {
      state.finalfile = list;
    },
    // 首页任务
    hometask(state, data) {
      state.hometaskdata = data;
      state.demoEvents = [];
      state.hometaskdata.forEach(element => {
        const date = element.start_end;
        const s1 = new Date(date[0]);
        const s2 = new Date(date[1]);
        const days = s2.getTime() - s1.getTime();
        const time = parseInt(days / (1000 * 60 * 60 * 24));
        for (let i = 0; i < time + 1; i++) {
          const obj = {};
          const s3 = s1.getTime() + 1000 * 60 * 60 * 24 * i;
          const dateone = new Date(s3);
          const Y = dateone.getFullYear();
          const M = dateone.getMonth() + 1;
          const D = dateone.getDate();
          const s4 = Y + "-" + M + "-" + D;
          obj.date = s4;
          obj.title = element.taskname;
          obj.taskid = element.taskid;
          obj.route = element.route;
          if (element.desc) {
            obj.desc = element.desc;
          }
          state.demoEvents.push(obj);
        }
      });
      state.demoEvents.sort(function(a, b) {
        return a.date > b.date;
      });
      const eventslist = {};
      state.demoEvents.forEach(element => {
        eventslist[element.date] = element.title;
      });
      state.calendar.events = eventslist;
      const datetwo = new Date();
      const y = datetwo.getFullYear();
      const m = datetwo.getMonth() + 1;
      const d = datetwo.getDate();
      const todaytime = y + "-" + m + "-" + d;
      this.commit("handlescreenlist", todaytime);
      // const todaytime = this.formatDate(new Date());
      // let screentwo = state.demoEvents.filter(value => {
      //   return value.date === todaytime ? true : false;
      // });
      // const titletimetwo = todaytime.split("-");
      // state.screenlisttime = titletimetwo;
      // state.screenlist = screentwo;
    },
    handlescreenlist(state, todaytime) {
      let screentwo = state.demoEvents.filter(value => {
        return value.date === todaytime ? true : false;
      });
      const titletimetwo = todaytime.split("-");
      state.screenlisttime = titletimetwo;
      state.screenlist = screentwo;
    },
    // 任务提交，loading动画显示
    tasksubmitloadingshow(state) {
      state.loading = true;
    },
    // 任务提交，loading动画隐藏
    tasksubmitloadinghidden(state) {
      state.loading = false;
    },
    // 外委获取上传合同列表
    ctuploadlist(state, data) {
      state.ctupfilelist = data;
    },
    // 合同上传动画开启
    startctuploading(state) {
      state.ctuploading = true;
    },
    // 合同上传动画关闭
    endctuploading(state) {
      state.ctuploading = false;
      state.uploadbtn = false;
    },
    // 合同上传时按钮禁止点击
    stopupbtn(state) {
      state.uploadbtn = true;
    },
    // 获取测试用例下相关的日志信息
    caseloglist(state, data) {
      state.usecaseinfo.forEach(obj => {
        if (obj.id === data.id) {
          obj.accessory_info.caselog_info = data.data;
        }
      });
    },
    // 获取单个日志内容
    caselogcontent(state, data) {
      state.caselogshow = true;
      state.log = data;
    },
    // 按钮工具可以点击
    closedis(state) {
      state.dis = false;
    },
    // 获取建议数据
    handlecasecomment(state, data) {
      state.usecaseinfo.forEach(obj => {
        if (obj.id === data.id) {
          obj.accessory_info.casecomment_info = data.data;
        }
      });
    },
    // 点击检测用例图片按钮，打开dialog，添加img
    handlecaseimgopen(state, img) {
      state.caseimage = img;
      state.caseimgshow = true;
    },
    // 用例照片list
    caseimglist(state, data) {
      state.usecaseinfo.forEach(obj => {
        if (obj.id === data.id) {
          obj.accessory_info.caseimage_info = data.data;
        }
      });
    },
    // 用例视频list
    casevideolist(state, data) {
      state.usecaseinfo.forEach(obj => {
        if (obj.id === data.id) {
          obj.accessory_info.casevideo_info = data.data;
        }
      });
    },
    // 点击视频按钮
    handlecasevideoopen(state, video) {
      state.playerOptions.sources[0].src = video;
      state.casevideoshow = true;
    },
    // 报告初稿弹窗开启
    opencreatedraft(state) {
      state.caselistshow = true;
      state.caseloading = true;
    },
    // 报告审核初稿按钮
    handlecreatedraft(state, data) {
      state.caselist = data.data;
      state.devid = data.devid;
      state.caseloading = false;
    },
    // 报告审核获取初稿列表
    draft_report(state, data) {
      state.draft_report = data;
    },
    // 报告审核终稿列表
    rauploadlist(state, data) {
      state.final_report = data;
    },
    // 报告审核成功更新信息
    daresult(state, data) {
      state.usecaseinfo.forEach(obj => {
        if (obj.id === data.id) {
          obj.auditor = data.auditor;
          obj.audit_result = data.audit_result;
        }
      });
    }
  },
  actions: {
    //审批任务设备详情dialog是否显示
    async applyEquipment(context, applyid) {
      const resapplyeqdata = await http.get(`temdevicies/${applyid}`);
      if (resapplyeqdata.status === 200) {
        context.commit("applyEquipment", resapplyeqdata.divice_list);
      }
    },
    //设备入库任务设备详情dialog显示
    async putstoragedialog(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`devicies/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("putstoragedialog", res.data.deviceinfo);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 设备出库任务设备详情dialog显示
    async outstoragedialog(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`outdevicies/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("outstoragedialog", res.data.deviceinfo);
      } else {
        this.$message.error(res.msg);
      }
    },
    //设备入库任务设备详情dialog确定按钮提交
    async putstoragedialogsubmit(context, id) {
      const res = await http.put(`devicies/${id}`, this.state.diaeqopen);
      if (res.status === 200) {
        context.commit("putstoragedialogsubmit");
        this.dispatch("routerright", {
          taskid: this.state.taskid,
          route: "putstorage"
        });
        Message.success("设备信息保存成功");
      } else {
        Message.error(res.msg);
      }
    },
    // 设备出库任务设备详情dialog确定按钮提交
    async outstoragedialogsubmit(context, id) {
      const res = await http.put(`outdevicies/${id}`, this.state.diaoutopen);
      if (res.status === 200) {
        context.commit("outstoragedialogclose");
        this.dispatch("routerright", {
          taskid: this.state.taskid,
          route: "outstorage"
        });
        Message.success("设备信息保存成功");
      } else {
        Message.error(res.msg);
      }
    },
    // 任务读取
    async loadingMytask(context, page) {
      const date = new Date().getTime();
      const res = await http.get(`tasks/${page}?${date}`);
      if (res.status === 200) {
        context.commit("loadingMytask", { data: res.data, total: res.total });
      }
    },
    // 全部任务读取
    async loadingAlltask(context, page) {
      const date = new Date().getTime();
      const res = await http.get(`alltasklist/${page}?${date}`);
      if (res.status === 200) {
        context.commit("loadingAlltask", { data: res.data, total: res.total });
      } else {
        Message.error(res.msg);
      }
    },
    // 已完成任务
    async loadingTasked(context, page) {
      const date = new Date().getTime();
      const res = await http.get(`comtasks/${page}?${date}`);
      if (res.status === 200) {
        context.commit("loadingTasked", { data: res.data, total: res.total });
      }
    },
    // 我的任务点击表格发请求并带入任务id  和刷新右侧页面
    async routerright(context, reqdata) {
      const date = new Date().getTime();
      const resdataappfor = await http.get(
        `${reqdata.route}/${reqdata.taskid}?${date}`
      );
      // console.log(resdataappfor);
      // console.log(reqdata.route);
      if (resdataappfor.data.status === 200) {
        context.commit("routerright", {
          data: resdataappfor.data,
          route: reqdata.route,
          id: reqdata.taskid
        });
      } else {
        Message.error(resdataappfor.data.msg);
      }
    },
    // 任务进度提交
    async handletasksechedule(context, taskid) {
      const res = await http.put(`updatesechedule/${taskid}`, {
        sechedule: this.state.tasksechedule
      });
      if (res.status === 200) {
        Message.success("任务进度更新成功");
      } else {
        Message.error(res.msg);
      }
    },
    // 合同页面保存信息按钮
    async handlesave(context, hetongid) {
      this.state.appcomfrom.com_money = this.state.appcompactinfo.com_money;
      this.state.appcomfrom.com_starttime = this.state.comtime[0];
      this.state.appcomfrom.com_endtime = this.state.comtime[1];
      const res = await http.put(
        `updatecompact/${hetongid}`,
        this.state.appcomfrom
      );
      if (res.status === 200) {
        Message.success("信息保存成功");
      } else {
        Message.error(res.msg);
      }
    },
    // 生成合同初稿
    async handlecreatdraftfile(context, hetongid) {
      const date = new Date().getTime();
      const res = await http.get(`generatecompact/${hetongid}?${date}`);
      if (res.status === 200) {
        Message.success("合同初稿生成成功");
        const resdata = await http.get(
          `draftaccessorylist/${hetongid}?${date}`
        );
        if (resdata.data.status === 200) {
          context.commit("handlecreatdraftfile", resdata.data.draft_list);
        } else {
          Message.error(resdata.data.msg);
        }
      } else {
        Message.error(res.msg);
      }
    },
    // 获取终稿信息
    async handleuploaddata(context, hetongid) {
      const date = new Date().getTime();
      const res = await http.get(`finalaccessorylist/${hetongid}?${date}`);
      if (res.data.status === 200) {
        context.commit("handleuploaddata", res.data.final_list);
      }
    },
    // 首页任务获取
    async hometask(context) {
      const date = new Date().getTime();
      const resdata = await http.get(`tasklist?${date}`);
      if (resdata.status === 200) {
        context.commit("hometask", resdata.data);
      } else {
        Message.error(resdata.msg);
      }
    },
    // 外委获取上传合同列表
    async ctuploadlist(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`dereportlist/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("ctuploadlist", res.data.reportlist);
      }
    },
    // 获取测试用例下相关的日志信息
    async caseloglist(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`caseloglist/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("caseloglist", { id: id, data: res.data.caselog });
      }
    },
    // 获取单个日志内容
    async caselogcontent(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`caselogs/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("caselogcontent", res.data.log);
      }
    },
    // 更新日志
    // async handlelog() {
    //   const res = await http.put(`caselogs/${this.state.log.id}`, {
    //     data: this.state.log.data
    //   });
    //   if (res.status === 200) {
    //     this.state.caselogshow = false;
    //     Message.success(res.msg);
    //   } else {
    //     Message.error(res.msg);
    //   }
    // },
    // 获取建议数据
    async handlecasecomment(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`casecommentlist/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("handlecasecomment", {
          id: id,
          data: res.data.comment_info
        });
      }
    },
    // 获取用例照片列表
    async caseimglist(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`caseimagelist/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("caseimglist", {
          id: id,
          data: res.data.image_info
        });
      }
    },
    // 获取用例视频列表
    async casevideolist(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`casevideolist/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("casevideolist", {
          id: id,
          data: res.data.video_info
        });
      }
    },
    // 报告审核生成初稿按钮获取用例列表
    async handlecreatedraft(context, devid) {
      const date = new Date().getTime();
      const res = await http.get(`getcase/${devid}?${date}`);
      if (res.data.status === 200) {
        context.commit("handlecreatedraft", {
          devid: devid,
          data: res.data.case_info
        });
      } else {
        Message.error(res.msg);
      }
    },
    // 报告审核获取初稿列表
    async draft_report(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`drafttestreport/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("draft_report", res.data.reportlist);
      } else {
        Message.error(res.data.msg);
      }
    },
    // 获取报告审核终稿
    async rauploadlist(context, id) {
      const date = new Date().getTime();
      const res = await http.get(`finaltestreport/${id}?${date}`);
      if (res.data.status === 200) {
        context.commit("rauploadlist", res.data.reportlist);
      } else {
        Message.error(res.data.msg);
      }
    },
    // 检测审核获取审核员信息与审核结果
    async daresult(context, rowid) {
      const date = new Date().getTime();
      const res = await http.get(`caserecords/${rowid}?${date}`);
      if (res.data.status === 200) {
        context.commit("daresult", res.data.info);
      } else {
        Message.error(res.data.msg);
      }
    }
  }
});

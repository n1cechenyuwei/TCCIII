import Vue from "vue";
import Vuex from "vuex";
import http from "@/components/vuexajax";
import { Message } from "element-ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    caselogshow: false // 日志是否显示
  },
  mutations: {
    // 任务读取
    loadingMytask(state, data) {
      this.state.task = data.data;
      this.state.mytasktotal = data.total;
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
        state.tasktype = data.data.tasktype;
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
    //设备入库任务设备详情dialog关闭
    putstoragedialogclose(state) {
      state.Dialogshebei = false;
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
    // 任务读取
    async loadingMytask(context, page) {
      const date = new Date().getTime();
      const res = await http.get(`tasks/${page}?${date}`);
      if (res.status === 200) {
        context.commit("loadingMytask", { data: res.data, total: res.total });
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
      console.log(resdataappfor);
      console.log(reqdata.route);
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
    async handlelog() {
      const res = await http.put(`caselogs/${this.state.log.id}`, {
        data: this.state.log.data
      });
      if (res.status === 200) {
        this.state.caselogshow = false;
        Message.success(res.msg);
      } else {
        Message.error(res.msg);
      }
    }
  }
});

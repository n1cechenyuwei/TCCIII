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
    DialogEquipment: false, //审批任务设备详情dialog是否显示
    username: "", //login存入的用户名，home页面使用
    Dialogshebei: false, //设备入库设备操作是否显示
    equipment: [
      {
        eqid: 1,
        eqname: "海康威视球机",
        eqtype: "球机",
        xinghao: "dw89797",
        iem: "dds5465465",
        people: "郝佳贺",
        time: "2018-11-13",
        waiguan: "正常",
        dian: "正常",
        bianhao: "1001",
        status: "已入库"
      }
    ],
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
    license: "" // 营业执照
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
      }
    },
    //审批任务设备详情dialog是否显示
    applyEquipment(state, appeqlist) {
      state.DialogEquipment = true;
      state.appeqlist = appeqlist;
    },
    //login存入的用户名，home页面使用
    handleusername(state, user) {
      state.username = user;
    },
    //设备入库任务设备详情dialog显示
    putstoragedialog(state, eq) {
      state.Dialogshebei = true;
      state.diaeqopen = eq;
    },
    //设备入库任务设备详情dialog关闭
    putstoragedialogclose(state) {
      state.Dialogshebei = false;
    },
    //设备入库任务设备详情dialog确定按钮提交
    putstoragedialogsubmit(state) {
      state.Dialogshebei = false;
      Message.success("修改成功");
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
    //login存入的用户名，home页面使用
    handleusername(context, user) {
      context.commit("handleusername", user);
    },
    //设备入库任务设备详情dialog显示
    putstoragedialog(context, eq) {
      context.commit("putstoragedialog", eq);
    },
    //设备入库任务设备详情dialog确定按钮提交
    putstoragedialogsubmit(context) {
      context.commit("putstoragedialogsubmit");
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
      if (resdataappfor.data.status === 200) {
        context.commit("routerright", {
          data: resdataappfor.data,
          route: reqdata.route
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
        const resdata = await http.get(`draftaccessorylist/${hetongid}?${date}`);
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
    }
  }
});

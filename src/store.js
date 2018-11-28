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
    appeqlist: [] // 申请页面设备列表数据
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
        // console.log(state.appfordata)
        state.appforcompany = data.data.companyinfo;
        state.tasksechedule = data.data.sechedule;
        if (data.data.state === "已完成") {
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
      state.opyyzz = true;
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
      const res = await http.get(`tasks/${page}`);
      if (res.status === 200) {
        context.commit("loadingMytask", { data: res.data, total: res.total });
      }
    },
    // 已完成任务
    async loadingTasked(context, page) {
      const res = await http.get(`comtasks/${page}`);
      if (res.status === 200) {
        context.commit("loadingTasked", { data: res.data, total: res.total });
      }
    },
    // 我的任务点击表格发请求并带入任务id  和刷新右侧页面
    async routerright(context, reqdata) {
      const resdataappfor = await http.get(
        `${reqdata.route}/${reqdata.taskid}`
      );
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
    async handletasksechedule(comtext, taskid) {
      const res = await http.put(`updatesechedule/${taskid}`, {
        sechedule: this.state.tasksechedule
      });
      if (res.status === 200) {
        Message.success("任务状态更新成功");
      } else {
        Message.error(res.msg);
      }
    }
  }
});

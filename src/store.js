import Vue from "vue";
import Vuex from "vuex";
import http from "@/components/vuexajax";
import { Message } from "element-ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    diaeqopen: {} // 设备dialog信息
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
    //审批任务设备详情dialog是否显示
    applyEquipment(state) {
      state.DialogEquipment = true;
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
    }
  },
  actions: {
    //审批任务设备详情dialog是否显示
    applyEquipment(context) {
      context.commit("applyEquipment");
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
    }
  }
});

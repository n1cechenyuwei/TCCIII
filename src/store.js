import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    task: [
      {
        objid: 1,
        objname: "大华公司申请审批任务",
        objtime: ["2018-11-16", "2018-11-27"],
        objtype: "申请审批任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 2,
        objname: "大华公司合同签订任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "合同签订",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 3,
        objname: "大华公司设备入库任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "设备入库",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 80,
        objstatus: "超时",
        objpeople: "郝佳贺"
      },
      {
        objid: 4,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 5,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "超时",
        objpeople: "郝佳贺"
      },
      {
        objid: 6,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 7,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 8,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 9,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      },
      {
        objid: 10,
        objname: "大华公司检测配置任务",
        objtime: ["2018-11-05", "2018-11-15"],
        objtype: "检测配置任务",
        objproject: "浙江大华公司入围检测项目",
        objprogress: 50,
        objstatus: "进行中",
        objpeople: "郝佳贺"
      }
    ],
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
    }
  }
});

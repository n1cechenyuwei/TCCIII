import Vue from "vue";
import Vuex from "vuex";

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
    DialogEquipment: false //审批任务设备详情dialog是否显示
  },
  mutations: {
    applyEquipment(state) {
      state.DialogEquipment = true;
    }
  },
  actions: {
    applyEquipment(context) {
      context.commit("applyEquipment");
    }
  }
});

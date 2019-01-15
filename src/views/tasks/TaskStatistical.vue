<template>
  <div class="tsbox">
    <el-radio-group @change="pvchange" v-model="PVtabPosition" size="small" class="tstop">
      <el-radio-button label="PIS">PIS检测人员</el-radio-button>
      <el-radio-button label="VMS">VMS检测人员</el-radio-button>
    </el-radio-group>
    <div id="tsGone"></div>
    <div id="slider"></div>
    <!-- 图表鼠标移上去显示模块 -->
    <div id="tools" v-show="tools" class="tubiao-tool" :style="'top:' + yoffset + 'px' + ';' + 'left:' + xoffset + 'px'">
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审核'), sysjc: (tasktype === '实验室检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">任务名称：{{taskname}}</div>
      </div>
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审核'), sysjc: (tasktype === '实验室检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">任务类型：{{tasktype}}</div>
      </div>
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审核'), sysjc: (tasktype === '实验室检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">开始时间：{{taskstarttime}}</div>
      </div>
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审核'), sysjc: (tasktype === '实验室检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">结束时间：{{taskendtime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { DataSet } from "@antv/data-set";
export default {
  data() {
    return {
      activeName: "first",
      jcrylist: [
        {
          taskname: "三号线仿真环境审批申请",
          taskpeople: "郝佳贺",
          tasktype: "申请审批",
          starttime: "2018-11-10",
          endtime: "2018-11-14"
        },
        {
          taskname: "四号线仿真环境审批申请",
          taskpeople: "郝佳贺",
          tasktype: "申请审批",
          starttime: "2018-11-15",
          endtime: "2018-11-19"
        },
        {
          taskname: "五号线仿真环境审批申请",
          taskpeople: "郝佳贺",
          tasktype: "申请审批",
          starttime: "2018-11-20",
          endtime: "2018-11-28"
        },
        {
          taskname: "六号线仿真环境审批申请",
          taskpeople: "郝佳贺",
          tasktype: "申请审批",
          starttime: "2018-11-29",
          endtime: "2018-12-12"
        },
        {
          taskname: "三号线仿真环境合同签订",
          taskpeople: "赵龙",
          tasktype: "合同签订",
          starttime: "2018-11-15",
          endtime: "2018-11-19"
        },
        {
          taskname: "四号线仿真环境合同签订",
          taskpeople: "赵龙",
          tasktype: "合同签订",
          starttime: "2018-11-20",
          endtime: "2018-11-25"
        },
        {
          taskname: "五号线仿真环境合同签订",
          taskpeople: "赵龙",
          tasktype: "合同签订",
          starttime: "2018-11-26",
          endtime: "2018-12-05"
        },
        {
          taskname: "六号线仿真环境合同签订",
          taskpeople: "赵龙",
          tasktype: "合同签订",
          starttime: "2018-12-06",
          endtime: "2018-12-14"
        },
        {
          taskname: "三号线仿真环境合同签订",
          taskpeople: "赵龙",
          tasktype: "合同签订",
          starttime: "2018-12-15",
          endtime: "2018-12-22"
        },
        {
          taskname: "四号线仿真环境设备入库",
          taskpeople: "罗霁阳",
          tasktype: "设备入库",
          starttime: "2018-11-10",
          endtime: "2018-11-14"
        },
        {
          taskname: "五号线仿真环境设备入库",
          taskpeople: "罗霁阳",
          tasktype: "设备入库",
          starttime: "2018-11-15",
          endtime: "2018-11-20"
        },
        {
          taskname: "六号线仿真环境设备入库",
          taskpeople: "罗霁阳",
          tasktype: "设备入库",
          starttime: "2018-11-21",
          endtime: "2018-11-28"
        },
        {
          taskname: "三号线仿真环境设备入库",
          taskpeople: "罗霁阳",
          tasktype: "设备入库",
          starttime: "2018-11-29",
          endtime: "2018-12-06"
        },
        {
          taskname: "四号线仿真环境编码器配置",
          taskpeople: "冯嘻嘻",
          tasktype: "环境配置",
          starttime: "2018-11-25",
          endtime: "2018-11-29"
        },
        {
          taskname: "五号线仿真环境编码器配置",
          taskpeople: "冯嘻嘻",
          tasktype: "环境配置",
          starttime: "2018-11-30",
          endtime: "2018-12-06"
        },
        {
          taskname: "六号线仿真环境编码器配置",
          taskpeople: "冯嘻嘻",
          tasktype: "环境配置",
          starttime: "2018-12-07",
          endtime: "2018-12-14"
        },
        {
          taskname: "三号线仿真环境编码器配置",
          taskpeople: "冯嘻嘻",
          tasktype: "环境配置",
          starttime: "2018-12-15",
          endtime: "2018-12-24"
        },
        {
          taskname: "四号线仿真环境设备检测",
          taskpeople: "王鹏飞",
          tasktype: "实验室检测",
          starttime: "2018-11-06",
          endtime: "2018-11-16"
        },
        {
          taskname: "五号线仿真环境设备检测",
          taskpeople: "王鹏飞",
          tasktype: "实验室检测",
          starttime: "2018-11-17",
          endtime: "2018-11-26"
        },
        {
          taskname: "六号线仿真环境设备检测",
          taskpeople: "王鹏飞",
          tasktype: "实验室检测",
          starttime: "2018-11-27",
          endtime: "2018-12-10"
        },
        {
          taskname: "三号线仿真环境设备检测",
          taskpeople: "王鹏飞",
          tasktype: "实验室检测",
          starttime: "2018-12-11",
          endtime: "2018-12-20"
        },
        {
          taskname: "四号线仿真环境检测审核",
          taskpeople: "张国进",
          tasktype: "检测审核",
          starttime: "2018-11-10",
          endtime: "2018-11-12"
        },
        {
          taskname: "五号线仿真环境检测审核",
          taskpeople: "张国进",
          tasktype: "检测审核",
          starttime: "2018-11-13",
          endtime: "2018-11-16"
        },
        {
          taskname: "六号线仿真环境检测审核",
          taskpeople: "张国进",
          tasktype: "检测审核",
          starttime: "2018-11-18",
          endtime: "2018-11-22"
        },
        {
          taskname: "三号线仿真环境检测审核",
          taskpeople: "张国进",
          tasktype: "检测审核",
          starttime: "2018-11-23",
          endtime: "2018-11-29"
        },
        {
          taskname: "四号线仿真环境外委检测",
          taskpeople: "于忠徐",
          tasktype: "外委检测",
          starttime: "2018-11-05",
          endtime: "2018-11-15"
        },
        {
          taskname: "五号线仿真环境外委检测",
          taskpeople: "于忠徐",
          tasktype: "外委检测",
          starttime: "2018-11-16",
          endtime: "2018-11-28"
        },
        {
          taskname: "六号线仿真环境外委检测",
          taskpeople: "于忠徐",
          tasktype: "外委检测",
          starttime: "2018-11-29",
          endtime: "2018-12-12"
        },
        {
          taskname: "三号线仿真环境外委检测",
          taskpeople: "于忠徐",
          tasktype: "外委检测",
          starttime: "2018-12-13",
          endtime: "2018-12-26"
        },
        {
          taskname: "四号线仿真环境报告审核",
          taskpeople: "刘利飞",
          tasktype: "报告审核",
          starttime: "2018-11-25",
          endtime: "2018-11-28"
        },
        {
          taskname: "五号线仿真环境报告审核",
          taskpeople: "刘利飞",
          tasktype: "报告审核",
          starttime: "2018-11-29",
          endtime: "2018-12-02"
        },
        {
          taskname: "六号线仿真环境报告审核",
          taskpeople: "刘利飞",
          tasktype: "报告审核",
          starttime: "2018-12-03",
          endtime: "2018-12-06"
        },
        {
          taskname: "三号线仿真环境报告审核",
          taskpeople: "刘利飞",
          tasktype: "报告审核",
          starttime: "2018-12-07",
          endtime: "2018-12-14"
        },
        {
          taskname: "四号线仿真环境设备出库",
          taskpeople: "王刚",
          tasktype: "设备出库",
          starttime: "2018-11-05",
          endtime: "2018-11-12"
        },
        {
          taskname: "五号线仿真环境设备出库",
          taskpeople: "王刚",
          tasktype: "设备出库",
          starttime: "2018-11-14",
          endtime: "2018-11-24"
        },
        {
          taskname: "六号线仿真环境设备出库",
          taskpeople: "王刚",
          tasktype: "设备出库",
          starttime: "2018-11-25",
          endtime: "2018-12-04"
        },
        {
          taskname: "三号线仿真环境设备出库",
          taskpeople: "王刚",
          tasktype: "设备出库",
          starttime: "2018-12-05",
          endtime: "2018-12-14"
        },
        {
          taskname: "三号线仿真环境外委检测",
          taskpeople: "王刚",
          tasktype: "外委检测",
          starttime: "2018-12-13",
          endtime: "2018-12-25"
        }
      ],
      chartlist: [],
      taskstarttime: "", // 人员任务开始时间
      taskendtime: "", // 人员任务结束时间
      taskname: "", // 人员任务名称
      tasktype: "", //人员任务类型
      xoffset: 0, //鼠标x轴位置
      yoffset: 0, //鼠标y轴位置
      tools: false,
      jcrydata: [],
      tsGone: "",
      datenow: "",
      PVtabPosition: "VMS",
      divwidth: 0
    };
  },
  methods: {
    // 获取鼠标位置
    getMousePos(event) {
      this.tools = true;
      var e = event || window.event;
      let bb = 1900 - e.clientX - 300;
      if (bb < this.divwidth) {
        this.xoffset = e.clientX - this.divwidth - 20;
        this.yoffset = e.clientY - 20;
      } else {
        this.xoffset = e.clientX + 50;
        this.yoffset = e.clientY - 20;
      }
    },
    // pis vms选中读取数值
    pvchange() {
      if (this.PVtabPosition === "PIS") {
        this.jcrydata = this.jcrylist.reverse();
        this.tsGone.changeData(this.jcrydata);
      } else {
        this.jcrydata = this.jcrylist.reverse();
        this.tsGone.changeData(this.jcrydata);
      }
    },
    // 表格
    charttwo() {
      const _DataSet = DataSet,
        DataView = _DataSet.DataView;
      let data = this.chartlist;
      var dv = new DataView().source(data);
      data = dv.rows;
      this.tsGone = new G2.Chart({
        container: "tsGone", // 指定图表容器 ID
        width: 1600, // 指定图表宽度
        height: 700, // 指定图表高度
        padding: [0, 60, 80, 80]
      });
      // chartone.legend(fasle);
      this.tsGone.source(data, {
        range: {
          type: "time",
          tickCount: 19
        },
        starttime: {
          alias: "开始时间"
        },
        tasktype: {
          alias: "任务类型"
        },
        endtime: {
          alias: "结束时间"
        },
        taskname: {
          alias: "任务名称"
        }
      });
      this.tsGone
        .coord()
        .transpose()
        .scale(1, 1);
      this.tsGone.legend({
        position: "bottom"
      });
      this.tsGone.tooltip(false);
      // this.tsGone.tooltip({
      //   useHtml: true,
      //   htmlContent: function() {
      //     return '<div style="visible:hidden">';
      //   }
      // });
      this.tsGone
        .interval()
        .position("taskpeople*range")
        // .label("tasktype")
        .shape("rect")
        .color("tasktype", tasktype => {
          if (tasktype === "设备出库") {
            return "#409EFF";
          } else if (tasktype === "报告审核") {
            return "#0B0EE7";
          } else if (tasktype === "外委检测") {
            return "#2FC25B";
          } else if (tasktype === "检测审核") {
            return "#E6A23C";
          } else if (tasktype === "实验室检测") {
            return "#F56C6C";
          } else if (tasktype === "环境配置") {
            return "#909399";
          } else if (tasktype === "设备入库") {
            return "#B258F8";
          } else if (tasktype === "合同签订") {
            return "#0488A9";
          } else if (tasktype === "申请审批") {
            return "#F61C11";
          }
        })
        .style({ cursor: "pointer" })
        .tooltip("taskname*tasktype*starttime*endtime")
        .select(true, {
          mode: "single",
          // style: {
          //   fill: "#1890ff" // 选中的样式
          // },
          cancelable: true, // 选中之后是否允许取消选中，默认允许取消选中
          animate: true // 选中是否执行动画，默认执行动画
        });
      // 表格线
      this.tsGone.axis("range", {
        position: "bottom",
        grid: {
          type: "line",
          lineStyle: {
            stroke: "#d9d9d9",
            lineWidth: 1,
            lineDash: [2, 4]
          }
        }
      });
      // 鼠标移入事件，获取到柱状体信息
      this.tsGone.on("interval:mouseenter", ev => {
        this.taskname = ev.data._origin.taskname;
        this.tasktype = ev.data._origin.tasktype;
        this.taskstarttime = ev.data._origin.starttime;
        this.taskendtime = ev.data._origin.endtime;
        this.divwidth = 96 + ev.data._origin.taskname.length * 14;
        this.getMousePos();
      });
      // 鼠标移动事件，获取到鼠标位置
      this.tsGone.on("interval:mousemove", () => {
        this.getMousePos();
      });
      // 鼠标移出事件，隐藏掉提示信息
      this.tsGone.on("interval:mouseleave", () => {
        this.tools = false;
      });
      this.tsGone.guide().line({
        top: true,
        start: { range: this.datenow, taskpeople: "郝佳贺" },
        end: { range: this.datenow, taskpeople: "王刚" },
        lineStyle: {
          stroke: "red",
          lineWidth: 2,
          lineDash: [4, 4]
        }
      });
      this.tsGone.render(); //柱状图结束
    },
    // 请求图表信息
    async alltisklistdatatwo() {
      const date = new Date().getTime();
      const res = await this.$http.get(`taskcharts/1?${date}`);
      if (res.status === 200) {
        // const mindate = Math.min.apply(Math, res.taskinfo.map(function(o) {return new Date(o.starttime.replace(/-/g, '/'))}));
        // const maxdate = Math.max.apply(Math, res.taskinfo.map(function(o) {return new Date(o.endtime.replace(/-/g, '/'))}));
        // const diffdate = (maxdate - mindate) / 1000 / 60 / 60 / 24;
        // if (diffdate > 18) {
        //   this.tickCountNumber = 18;
        // } else {
        //   this.tickCountNumber = diffdate;
        // }
        res.taskinfo.forEach(obj => {
          if (obj.taskname !== "") {
            obj.range = [obj.starttime, obj.endtime];
            // obj.range = [];
            // obj.range[0] = obj.starttime + " " + "00:30:00";
            // const enddate = new Date(obj.endtime.replace(/-/g, '/')).getTime() + (1000 * 60 * 60 * 24);
            // const Y = new Date(enddate).getFullYear();
            // const M = new Date(enddate).getMonth()+1;
            // const D = new Date(enddate).getDate();
            // obj.range[1] = Y + "-" + M + "-" + D + " 00:10:01";
            // console.log(obj.range[1])
            // obj.range[1] = obj.endtime + " " + "23:00:00";
          } else {
            obj.range = [obj.starttime, obj.endtime];
          }
        });
        this.chartlist = res.taskinfo;
        this.tasklisttotal = res.data_total;
        this.charttwo();
      } else {
        this.$message.error(res.msg);
      }
    }
  },
  mounted() {
    this.alltisklistdatatwo();
  }
};
</script>

<style>
.tsbox {
  padding: 0 10px 0 10px;
  height: 100%;
  box-sizing: border-box;
}
.tstabs {
  height: 99.9%;
}
.tsbox .el-tabs--border-card {
  border: none;
  box-shadow: none;
}
.tstop {
  margin: 10px 0 10px 40px;
}
</style>

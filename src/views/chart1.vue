<template>
  <div class="chart-box">
    <!-- 图表模块 -->
    <div class="tubiao-box" >
      <!-- <div class="gzt-box"> -->
        <!-- <div class="gongzuotaione">
          <div class="gone-title">工作台统计</div>
          <div id="chartGone"></div>
        </div>
        <div class="gongzuotaithree">
          <div class="gone-title">项目统计</div>
          <div id="chartTwo"></div>
        </div> -->
        <!-- <div class="gongzuotaifour">
          <div class="gone-title">任务统计</div>
          <div id="chartThree"></div>
        </div> -->
      <!-- </div> -->
      <div class="renyuan-two-box">
        <div>
          <el-radio-group @change="pvchange" v-model="PVtabPosition" size="small" class="chart-b">
            <el-radio-button label="PIS">PIS检测人员</el-radio-button>
            <el-radio-button label="VMS">VMS检测人员</el-radio-button>
          </el-radio-group>
        </div>
        <div class="onetwo-title-box">
          <span class="gtwo-title">人员统计</span>
          <span class="gthree-title">任务统计</span>
        </div>
        <div id="chartFour" class="rty"></div>
        <div id="chartThree" class="rty"></div>
        <!-- <div class="gongzuotaifour"> -->
          <!-- <div class="gone-title">任务统计</div> -->
          <!-- <div id="chartThree"></div> -->
        <!-- </div> -->
      </div>
    </div>
    <!-- 图表鼠标移上去显示模块 -->
    <div id="toolone" v-show="xoffset !== 0" class="tubiao-tool" :style="'top:' + yoffset + 'px' + ';' + 'left:' + xoffset + 'px'">
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
export default {
  data() {
    return {
      PVtabPosition: "VMS",
      jcrylist: [
        {
          taskname: "奔讯电子有限公司入围检测项目申请审批",
          taskpeople: "郝佳贺",
          tasktype: "申请审批",
          starttime: "2018-11-15",
          endtime: "2018-11-28"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目合同签订",
          taskpeople: "赵龙",
          tasktype: "合同签订",
          starttime: "2018-11-28",
          endtime: "2018-12-20"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目设备入库",
          taskpeople: "罗霁阳",
          tasktype: "设备入库",
          starttime: "2018-12-20",
          endtime: "2019-01-04"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目环境配置",
          taskpeople: "冯嘻嘻",
          tasktype: "环境配置",
          starttime: "2019-01-04",
          endtime: "2019-01-20"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目协议检测",
          taskpeople: "王鹏飞",
          tasktype: "实验室检测",
          starttime: "2019-01-20",
          endtime: "2019-01-30"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目协议检测审核",
          taskpeople: "张国进",
          tasktype: "检测审核",
          starttime: "2019-02-02",
          endtime: "2019-02-15"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目功能与性能检测",
          taskpeople: "商庆涛",
          tasktype: "实验室检测",
          starttime: "2019-02-15",
          endtime: "2019-02-28"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目检测审核",
          taskpeople: "刘友明",
          tasktype: "检测审核",
          starttime: "2019-02-28",
          endtime: "2019-03-15"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目仿真环境检测",
          taskpeople: "薛宝满",
          tasktype: "实验室检测",
          starttime: "2019-03-15",
          endtime: "2019-03-25"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目仿真环境检测审核",
          taskpeople: "卫东",
          tasktype: "检测审核",
          starttime: "2019-03-25",
          endtime: "2019-04-10"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目外委检测",
          taskpeople: "于忠徐",
          tasktype: "外委检测",
          starttime: "2019-01-15",
          endtime: "2019-02-20"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目报告审核",
          taskpeople: "刘利飞",
          tasktype: "报告审核",
          starttime: "2019-04-10",
          endtime: "2019-04-24"
        },
        {
          taskname: "奔讯电子有限公司入围检测项目设备出库",
          taskpeople: "王刚",
          tasktype: "设备出库",
          starttime: "2019-04-24",
          endtime: "2019-05-06"
        }
      ], // pis检测人员
      jcrydata: [],
      taskstarttime: "", // 人员任务开始时间
      taskendtime: "", // 人员任务结束时间
      taskname: "", // 人员任务名称
      tasktype: "", //人员任务类型
      xoffset: 0, //鼠标x轴位置
      yoffset: 0, //鼠标y轴位置
      projectdata: [
        {
          name: "PIS已完成项目",
          number: 19
        },
        {
          name: "PIS进行中项目",
          number: 11
        },
        {
          name: "VMS已完成项目",
          number: 7
        },
        {
          name: "VMS进行中项目",
          number: 5
        }
      ],
      taskdatalist: [
        {
          taskname: "VMS已完成任务",
          tasknumber: 43
        },
        {
          taskname: "VMS进行中任务",
          tasknumber: 52
        },
        {
          taskname: "VMS已超时任务",
          tasknumber: 40
        },
        {
          taskname: "PIS已完成任务",
          tasknumber: 46
        },
        {
          taskname: "PIS进行中任务",
          tasknumber: 40
        },
        {
          taskname: "PIS已超时任务",
          tasknumber: 23
        }
      ],
      chartGone: "", // 工作台统计
      chartTwo: "", // 项目统计
      chartThree: "", // 任务统计
      chartFour: "" // 人员统计
    };
  },
  methods: {
    // 获取鼠标位置
    getMousePos(event) {
      var e = event || window.event;
      let bb = 1900 - e.clientX - 160;
      if (bb < this.divwidth) {
        this.xoffset = e.clientX - this.divwidth - 50;
        this.yoffset = e.clientY - 100;
      } else {
        this.xoffset = e.clientX + 50;
        this.yoffset = e.clientY - 100;
      }
    },
    // pis vms选中读取数值
    pvchange() {
      if (this.PVtabPosition === "PIS") {
        this.jcrydata = this.jcrylist.reverse();
        this.chartFour.changeData(this.jcrydata);
      } else {
        this.jcrydata = this.jcrylist.reverse();
        this.chartFour.changeData(this.jcrydata);
      }
    },
    // 请求检测人员数据
    jcrydatarese() {
      this.jcrylist.forEach(function(obj) {
        obj.range = [obj.starttime, obj.endtime];
      });
      this.jcrydata = this.jcrylist;
    },
    // 人员统计图表
    gtwo() {
      // gtwo图表
      this.chartFour = new G2.Chart({
        container: "chartFour", // 指定图表容器 ID
        width: 1100, // 指定图表宽度
        height: 760, // 指定图表高度
        padding: [0, 50, 200, 60]
      });
      this.chartFour.source(this.jcrydata, {
        range: {
          type: "time",
          tickCount: 13
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
      this.chartFour
        .coord()
        .transpose()
        .scale(1, 1);
      this.chartFour.legend({
        position: "bottom",
        offsetX: 50,
        offsetY: 20
      });
      this.chartFour.tooltip({
        useHtml: true,
        htmlContent: function() {
          return '<div style="visible:hidden">';
        }
      });
      this.chartFour
        .interval()
        .position("taskpeople*range")
        // .label("tasktype")
        .shape("rect")
        .color("tasktype", tasktype => {
          if (tasktype === "申请审批") {
            return "#F61C11";
          } else if (tasktype === "合同签订") {
            return "#0488A9";
          } else if (tasktype === "设备入库") {
            return "#B258F8";
          } else if (tasktype === "环境配置") {
            return "#909399";
          } else if (tasktype === "实验室检测") {
            return "#F56C6C";
          } else if (tasktype === "检测审核") {
            return "#E6A23C";
          } else if (tasktype === "外委检测") {
            return "#2FC25B";
          } else if (tasktype === "报告审核") {
            return "#0B0EE7";
          } else if (tasktype === "设备出库") {
            return "#409EFF";
          }
        })
        .style({ cursor: "pointer" })
        .tooltip("taskname*tasktype*starttime*endtime")
        .select(true, {
          mode: "single",
          style: {
            fill: "#1890ff" // 选中的样式
          },
          cancelable: true, // 选中之后是否允许取消选中，默认允许取消选中
          animate: true // 选中是否执行动画，默认执行动画
        });
      this.chartFour.axis("range", {
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
      this.chartFour.on("interval:mouseenter", ev => {
        this.taskname = ev.data._origin.taskname;
        this.tasktype = ev.data._origin.tasktype;
        this.taskstarttime = ev.data._origin.starttime;
        this.taskendtime = ev.data._origin.endtime;
        this.divwidth = 96 + ev.data._origin.taskname.length * 14;
      });
      // 鼠标移动事件，获取到鼠标位置
      this.chartFour.on("interval:mousemove", () => {
        this.getMousePos();
      });
      // 鼠标移出事件，隐藏掉提示信息
      this.chartFour.on("interval:mouseleave", () => {
        this.xoffset = 0;
        this.yoffset = 0;
      });
      this.chartFour.render(); //柱状图结束
    },
    // 任务统计图表
    gthree() {
      const taskdatalist = this.taskdatalist;
      this.chartThree = new G2.Chart({
        container: "chartThree",
        height: 760,
        width: 400,
        padding: [0, 0, 200, 0]
      });
      this.chartThree.source(taskdatalist);
      this.chartThree.coord("polar", {
        innerRadius: 0.2
      });
      this.chartThree.legend({
        position: "bottom",
        offsetY: -10,
        offsetX: -10
      });
      this.chartThree.axis(false);
      this.chartThree
        .interval()
        .position("taskname*tasknumber")
        .color("taskname", G2.Global.colors_pie_16)
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      this.chartThree.render();
    }
  },
  mounted() {
    this.gtwo();
    this.gthree();
  },
  created() {
    this.jcrydatarese();
  }
};
</script>

<style>
.chart-box {
  display: inline-block;
  width: 100%;
}
.tubiao-box {
  box-sizing: border-box;
  width: 100%;
  height: 882px;
  display: inline-block;
  border-radius: 6px;
}
.gone-title {
  height: 20px;
  line-height: 30px;
  font-size: 14px;
  color: #e6a23c;
}
.onetwo-title-box {
  /* text-align: center; */
  height: 40px;
  line-height: 40px;
}
.gtwo-title {
  position: relative;
  margin-left: 500px;
  font-size: 16px;
  color: #e6a23c;
}
.gthree-title {
  position: relative;
  margin-left: 700px;
  font-size: 16px;
  color: #e6a23c;
}
.gzt-box {
  width: 100%;
}
.gongzuotaione {
  vertical-align: top;
  display: inline-block;
  background-color: #fff;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #d4d7d7;
  width: 31.4%;
}
.gongzuotaithree {
  vertical-align: top;
  display: inline-block;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #d4d7d7;
  width: 33%;
  height: 396px;
  box-sizing: border-box;
  margin-left: 6px;
  margin-right: 6px;
  text-align: center;
}
.gongzuotaifour {
  vertical-align: top;
  display: inline-block;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #d4d7d7;
  width: 518px;
  height: 396px;
  box-sizing: border-box;
  text-align: center;
}
#chartGone {
  width: 480px;
  margin-right: 6px;
}
.renyuan-two-box {
  background-color: #fff;
  width: 99.65%;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  height: 880px;
  box-sizing: border-box;
}
.chart-b {
  margin: 10px 0 10px 40px;
}
.rty {
  display: inline-block;
  vertical-align: top;
}
</style>

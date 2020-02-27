<template>
  <div class="chart-box">
    <!-- 图表模块 -->
    <div class="tubiao-box" >
      <div class="gzt-box1">
        <el-card shadow="always" class="gongzuotaione1">
          <div class="gone-title">工作台统计</div>
          <div id="chartGone1"></div>
        </el-card>
        <el-card shadow="always" class="gongzuotaifour1">
          <div class="gone-title">任务统计</div>
          <div id="chartThree1"></div>
        </el-card>
      </div>
      <el-card shadow="always" class="renyuan-gtwo-box1">
        <div class="gtwo-title-box"><span class="g-title">工作台任务统计</span></div>
        <div>
          <el-radio-group @change="pvchange" v-model="PVtabPosition" size="small" class="chart-b">
            <el-radio-button label="VMS">VMS检测工作台</el-radio-button>
            <el-radio-button label="PIS">PIS检测工作台</el-radio-button>
          </el-radio-group>
          <div id="chartFour1"></div>
          <el-pagination
            class="tapage"
            @current-change="handleGoneChange"
            :current-page="tacurrentpage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="tasklisttotal">
          </el-pagination>
        </div>
      </el-card>
    </div>
    <!-- 图表鼠标移上去显示模块 -->
    <div id="tools" v-show="tools" class="tubiao-tool" :style="'top:' + yoffset + 'px' + ';' + 'left:' + xoffset + 'px'">
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审批'), sysjc: (tasktype === '检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">任务名称：{{taskname}}</div>
      </div>
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审批'), sysjc: (tasktype === '检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">任务类型：{{tasktype}}</div>
      </div>
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审批'), sysjc: (tasktype === '检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
        <div class="tool-span">开始时间：{{taskstarttime}}</div>
      </div>
      <div class="tool-box">
        <i v-bind:class="{sbck: (tasktype === '设备出库'), bgsh: (tasktype === '报告审核'), wwjc: (tasktype === '外委检测'), jcsh: (tasktype === '检测审批'), sysjc: (tasktype === '检测'), hjpz: (tasktype === '环境配置'), sbrk: (tasktype === '设备入库'), htqd: (tasktype === '合同签订'), sqsp: (tasktype === '申请审批')}" style="display: inline-block; height: 6px; width: 6px; border-radius: 3px; margin-right: 8px"></i>
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
      gone: [],
      PVtabPosition: "VMS",
      chartlist: [],
      taskstarttime: "", // 人员任务开始时间
      taskendtime: "", // 人员任务结束时间
      taskname: "", // 人员任务名称
      tasktype: "", //人员任务类型
      xoffset: 0, //鼠标x轴位置
      yoffset: 0, //鼠标y轴位置
      taskdatalist: [],
      chartGone1: "", // 工作台统计
      chartTwo: "", // 项目统计
      chartThree1: "", // 任务统计
      chartone: "", // 人员统计
      divwidth: 0, // div宽度
      tacurrentpage: 1,
      tasklisttotal: 0, // 数据总数
      selectishow: false, // 判断是否是外委任务来决定选择框是否显示
      spanishow: false, // 判断是否是外委任务来判断检测单位span是否显示
      tools: false
    };
  },
  methods: {
    // pis vms选中读取数值
    pvchange() {
      if (this.PVtabPosition === "PIS") {
        this.tacurrentpage = 1;
        this.chartslistdata(1);
        // this.jcrydata = this.jcrylist.reverse();
        // this.chartFour1.changeData(this.jcrydata);
      } else {
        this.tacurrentpage = 1;
        this.chartslistdata(1);
        // this.jcrydata = this.jcrylist.reverse();
        // this.chartFour1.changeData(this.jcrydata);
      }
    },
    // 工作台图表
    workschart() {
      // gone图表
      const gzt = this.gone;
      let asd = [];
      gzt.forEach(function(obj) {
        let qwe = "";
        for (let i = 0; i < obj.gzt.length; i++) {
          obj["gztid" + i] = obj.gzt[i];
          qwe += "gztid" + i + "*";
        }
        qwe = qwe.substr(0, qwe.length - 1);
        asd.push(qwe);
      });
      let max = asd[0];
      for (let i = 0; i < asd.length; i++) {
        if (max < asd[i]) max = asd[i];
      }
      this.chartGone1 = new G2.Chart({
        container: "chartGone1",
        width: 780,
        padding: [20, 220, 30, 40], // 上，右，下，左
        // forceFit: true,
        height: 370
      });
      this.chartGone1.legend(false);
      this.chartGone1.axis(gzt.length, {
        title: null,
        line: {
          lineWidth: 2 // 设置线的宽度
        }
      });
      this.chartGone1.axis("name", {
        label: {
          textStyle: {
            textAlign: "center", // 文本对齐方向，可取值为： start middle end
            textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
          }
        }
      });
      this.chartGone1.source(gzt);
      this.chartGone1.scale("number", {
        tickInterval: 1,
        alias: "数量（台）"
      });
      this.chartGone1.tooltip({
        showTitle: true,
        position: "left",
        itemTpl:
          '<li style="text-align: left"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{value}</li>'
      });
      this.chartGone1.legend({
        position: "right",
        offsetY: -100,
        offsetX: 60
      });
      this.chartGone1
        .interval()
        .position("name*number")
        .tooltip(max)
        .color("name", ["#02B541", "#E6A23C", "#22DC02", "#FFAB0F"])
        .label("number", val => {
          if (val < 1) {
            return false;
          }
          return {
            position: "middle",
            offset: -10,
            // textStyle: {
            //   fill: '#fff',
            //   fontSize: 12,
            //   shadowBlur: 2,
            //   shadowColor: 'rgba(0, 0, 0, .45)'
            // },
          }
        });
      this.chartGone1.render();
    },
    // 工作台数据加渲染
    async worksdata() {
      const res = await this.$http.get(`workbenchcharts`);
      if (res.data.status === 200) {
        this.gone = res.data.data;
        this.workschart();
      }
      // this.workschart();
    },
    // 任务统计图表
    taskchart() {
      const taskdatalist = this.taskdatalist;
      this.chartThree1 = new G2.Chart({
        container: "chartThree1",
        height: 370,
        width: 760,
        padding: [30, 100, 0, 0]
      });
      this.chartThree1.source(taskdatalist);
      this.chartThree1.coord("polar", {
        innerRadius: 0.2
      });
      this.chartThree1.legend({
        position: "right",
        offsetY: -130,
        offsetX: -50
      });
      this.chartThree1.axis(false);
      this.chartThree1
        .interval()
        .position("taskname*tasknumber")
        .color("taskname", [
          "#02b541",
          "#e6a23c",
          "#f56c6c",
          "#22dc02",
          "#ffab0f",
          "#e11631"
        ])
        .style({
          lineWidth: 1,
          stroke: "#fff"
        })
        .label("tasknumber", val => {
          if (val < 1) {
            return false;
          }
          return {
            position: "middle",
            offset: 6,
            // textStyle: {
            //   fill: '#fff',
            //   fontSize: 12,
            //   shadowBlur: 2,
            //   shadowColor: 'rgba(0, 0, 0, .45)'
            // },
          }
        });
      this.chartThree1.render();
    },
    // 任务统计数据
    async taskchartdata() {
      const res = await this.$http.get(`taskstatisticcharts`);
      if (res.data.status === 200) {
        this.taskdatalist = res.data.data;
        this.taskchart();
      }
    },
    // 图表信息页数改变
    async handleGoneChange(val) {
      this.tacurrentpage = val;
      this.chartslistdata(val);
    },
    // 图表
    newchartone() {
      const _DataSet = DataSet,
        DataView = _DataSet.DataView;
      let data = this.chartlist;
      var dv = new DataView().source(data);
      data = dv.rows;
      this.chartone = new G2.Chart({
        container: "chartFour1", // 指定图表容器 ID
        width: 1500, // 指定图表宽度
        height: 300, // 指定图表高度
        padding: [0, 170, 30, 120]
      });
      this.chartone.source(data, {
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
      this.chartone
        .coord()
        .transpose()
        .scale(1, 1);
      this.chartone.legend({
        position: "right-top",
        offsetY: 50,
        offsetX: 50
      });
      this.chartone.tooltip(false);
      this.chartone
        .interval()
        .position("taskbench*range")
        .animate({
          enter: {
            animation: "scaleInX", // 动画名称
            delay: 0, // 动画延迟执行时间
            duration: 500 // 动画执行时间
          },
          appear: {
            animation: "scaleInX", // 动画名称
            delay: 0, // 动画延迟执行时间
            duration: 500 // 动画执行时间
          },
          // update: {
          //   animation: "fadeIn", // 动画名称
          //   delay: 0, // 动画延迟执行时间
          //   duration: 500 // 动画执行时间
          // },
          leave: {
            animation: "lineWidthOut", // 动画名称
            delay: 0, // 动画延迟执行时间
            duration: 0 // 动画执行时间
          }
        })
        .shape("rect")
        .color("tasktype", tasktype => {
          if (tasktype === "设备出库") {
            return "#409EFF";
          } else if (tasktype === "报告审核") {
            return "#0B0EE7";
          } else if (tasktype === "外委检测") {
            return "#2FC25B";
          } else if (tasktype === "检测审批") {
            return "#E6A23C";
          } else if (tasktype === "检测") {
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
        // .tooltip("taskname*tasktype*starttime*endtime")
        .select(true, {
          mode: "single",
          // style: {
          //   fill: "#1890ff" // 选中的样式
          // },
          cancelable: true, // 选中之后是否允许取消选中，默认允许取消选中
          animate: true // 选中是否执行动画，默认执行动画
        });
      this.chartone.axis("range", {
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
      this.chartone.on("interval:mouseenter", ev => {
        this.taskname = ev.data._origin.taskname;
        this.tasktype = ev.data._origin.tasktype;
        this.taskstarttime = ev.data._origin.starttime;
        this.taskendtime = ev.data._origin.endtime;
        this.divwidth = 96 + ev.data._origin.taskname.length * 14;
        this.getMousePos();
      });
      // 鼠标移动事件，获取到鼠标位置
      this.chartone.on("interval:mousemove", () => {
        this.getMousePos();
      });
      // 鼠标移出事件，隐藏掉提示信息
      this.chartone.on("interval:mouseleave", () => {
        this.tools = false;
      });
      this.chartone.render(); //柱状图结束
    },
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
    // 请求图表信息
    async alltisklistdatatwo(type) {
      const res = await this.$http.get(`workbenchtaskcharts/${type}/1`);
      if (res.data.status === 200) {
        res.data.taskinfo.forEach(obj => {
          if (obj.taskname !== "") {
            obj.starttime = obj.starttime + " 01:00:00";
            obj.endtime = obj.endtime + " 23:00:00";
            obj.range = [obj.starttime, obj.endtime];
          } else {
            obj.range = [obj.starttime, obj.endtime];
          }
        });
        this.chartlist = res.data.taskinfo;
        this.tasklisttotal = res.data.total_num;
        this.newchartone();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 请求图表数据并刷新
    async chartslistdata(page) {
      const res = await this.$http.get(
        `workbenchtaskcharts/${this.PVtabPosition}/${page}`
      );
      if (res.data.status === 200) {
        res.data.taskinfo.forEach(obj => {
          if (obj.taskname !== "") {
            obj.starttime = obj.starttime + " 01:00:00";
            obj.endtime = obj.endtime + " 23:00:00";
            obj.range = [obj.starttime, obj.endtime];
          } else {
            obj.range = [obj.starttime, obj.endtime];
          }
        });
        this.chartlist = res.data.taskinfo;
        this.tasklisttotal = res.data.total_num;
        this.chartone.changeData(this.chartlist);
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  mounted() {
    // 工作台图表
    this.worksdata();
    // 任务统计图表
    this.taskchartdata();
    this.alltisklistdatatwo("vms");
  }
};
</script>

<style>
.chart-box {
  display: inline-block;
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
.gtwo-title-box {
  text-align: center;
  height: 24px;
  line-height: 40px;
}
.g-title {
  position: relative;
  font-size: 16px;
  color: #e6a23c;
}
.gzt-box1 {
  width: 1660px;
  box-sizing: border-box;
}
.gongzuotaione1 {
  vertical-align: top;
  display: inline-block;
  background-color: #fff;
  text-align: center;
  width: 49%;
  height: 396px;
  margin: 10px 10px 0 10px;
}
.gongzuotaione1 .el-card__body {
  padding: 0 20px 0 20px;
}
.gongzuotaifour1 .el-card__body {
  padding: 0 20px 0 20px;
}
.gongzuotaifour1 {
  vertical-align: top;
  display: inline-block;
  background-color: #fff;
  width: 49%;
  height: 396px;
  box-sizing: border-box;
  text-align: center;
  margin: 10px 0px 0px 0px;
}
#chartGone1 {
  width: 480px;
  margin-right: 6px;
}
.renyuan-gtwo-box1 {
  background-color: #fff;
  width: 98.76%;
  margin-top: 6px;
  height: 480px;
  box-sizing: border-box;
  margin: 10px 0 0 10px;
}
.chart-b {
  margin: 10px 0 10px 40px;
}
</style>

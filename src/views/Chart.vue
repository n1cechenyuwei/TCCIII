<template>
  <div class="chart-box">
    <!-- 图表模块 -->
    <div class="tubiao-box" >
      <div class="gzt-box">
        <div class="gongzuotaione">
          <div class="gone-title">工作台统计</div>
          <div id="chartGone"></div>
        </div>
        <div class="gongzuotaithree">
          <div class="gone-title">项目统计</div>
          <div id="chartTwo"></div>
        </div>
        <div class="gongzuotaifour">
          <div class="gone-title">任务统计</div>
          <div id="chartThree"></div>
        </div>
      </div>
      <div class="renyuan-gtwo-box">
        <div class="gtwo-title-box"><span class="g-title">人员统计</span></div>
        <div>
          <el-radio-group @change="pvchange" v-model="PVtabPosition" size="small" class="chart-b">
            <el-radio-button label="PIS">PIS检测人员</el-radio-button>
            <el-radio-button label="VMS">VMS检测人员</el-radio-button>
          </el-radio-group>
          <div id="chartFour"></div>
        </div>
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
import { DataSet } from "@antv/data-set";
// import DataSet from "../components/data-set.min.js";
export default {
  data() {
    return {
      gone: [
        {
          name: "PIS运行中工作台",
          number: 5,
          gzt: ["1号工作台", "2号工作台", "3号工作台", "4号工作台", "5号工作台"]
        },
        {
          name: "PIS闲置中工作台",
          number: 2,
          gzt: ["7号工作台", "8号工作台"]
        },
        {
          name: "VMS运行中工作台",
          number: 7,
          gzt: [
            "9号工作台",
            "10号工作台",
            "11号工作台",
            "12号工作台",
            "13号工作台",
            "14号工作台",
            "15号工作台"
          ]
        },
        {
          name: "VMS闲置中工作台",
          number: 3,
          gzt: ["16号工作台", "17号工作台", "18号工作台"]
        }
      ],
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
      chartFour: "", // 人员统计
      divwidth: 0 // div宽度
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
        // obj.starttime += " 00:00:00"
        // obj.endtime += " 23:59:59"
        // console.log(obj.starttime)
        obj.range = [obj.starttime, obj.endtime];
      });
      this.jcrydata = this.jcrylist;
    }
  },
  mounted() {
    // gtwo图表
    this.chartFour = new G2.Chart({
      container: "chartFour", // 指定图表容器 ID
      width: 1450, // 指定图表宽度
      height: 360, // 指定图表高度
      padding: [0, 170, 30, 60]
    });
    this.chartFour.source(this.jcrydata, {
      range: {
        type: "time",
        tickCount: 17
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
      position: "right-top",
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
        if (tasktype === "设备出库") {
          return "#409EFF";
        } else if (tasktype === "报告审核") {
          return "#F04864";
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
        style: {
          fill: "#1890ff" // 选中的样式
        },
        cancelable: true, // 选中之后是否允许取消选中，默认允许取消选中
        animate: true // 选中是否执行动画，默认执行动画
      });
    this.chartFour.axis("range", {
      position: "bottom"
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
    this.chartGone = new G2.Chart({
      container: "chartGone",
      width: 490,
      padding: [20, 40, 30, 40], // 上，右，下，左
      // forceFit: true,
      height: 370
    });
    this.chartGone.legend(false);
    this.chartGone.axis("number", {
      title: null,
      line: {
        lineWidth: 2 // 设置线的宽度
      }
    });
    this.chartGone.axis("name", {
      label: {
        textStyle: {
          textAlign: "center", // 文本对齐方向，可取值为： start middle end
          textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
        }
      }
    });
    this.chartGone.source(gzt);
    this.chartGone.scale("number", {
      tickInterval: 1,
      alias: "数量（台）"
    });
    this.chartGone.tooltip({
      showTitle: true,
      itemTpl:
        '<li style="text-align: left"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{value}</li>'
    });
    this.chartGone
      .interval()
      .position("name*number")
      .tooltip(max)
      .color("name", [
        "#909399",
        "#F56C6C",
        "#E6A23C",
        "#2FC25B",
        "#F04864",
        "#409EFF"
      ]);
    this.chartGone.render();

    // 项目统计图表
    // const DataSet = new DataSet();
    var _DataSet = DataSet,
      DataView = _DataSet.DataView;
    let data = this.projectdata;
    var dv = new DataView().source(data);
    dv.transform({
      type: "map",
      callback: function callback(row) {
        row.percent = row.number / 30;
        return row;
      }
    });
    data = dv.rows;
    this.chartTwo = new G2.Chart({
      container: "chartTwo",
      forceFit: true,
      height: 350,
      padding: [20, 120, 0, 95]
    });
    this.chartTwo.source(data, {
      percent: {
        nice: false
      }
    });
    this.chartTwo.axis(false);
    this.chartTwo.tooltip({
      showTitle: false,
      itemTpl:
        '<li data-index={index} style="margin-bottom:4px;">' +
        '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
        "{name}<br/>" +
        '<span style="padding-left: 16px">项目数量：{number}</span><br/>' +
        '<span style="padding-left: 16px">占比：{percent}</span><br/>' +
        "</li>"
    });
    this.chartTwo
      .coord("rect")
      .transpose()
      .scale(1, -1);
    this.chartTwo
      .intervalSymmetric()
      .position("name*percent")
      .shape("funnel")
      .color("name", ["#0050B3", "#1890FF", "#40A9FF", "#69C0FF", "#BAE7FF"])
      .label(
        "name*number",
        function(name, number) {
          return name + " " + number;
        },
        {
          offset: 35,
          labelLine: {
            lineWidth: 1,
            stroke: "rgba(0, 0, 0, 0.15)"
          }
        }
      )
      .tooltip("name*number*percent", function(name, number, percent) {
        return {
          name: name,
          percent: parseInt(percent * 100) + "%",
          number: number
        };
      });
    const that = this.chartTwo;
    data.forEach(function(obj) {
      that.guide().text({
        top: true,
        position: {
          name: obj.name,
          percent: "median"
        },
        content: obj.number, // 显示的文本内容
        style: {
          fill: "#fff",
          fontSize: "12",
          textAlign: "center",
          shadowBlur: 2,
          shadowColor: "rgba(0, 0, 0, .45)"
        }
      });
    });
    this.chartTwo.render();

    // 任务统计图表
    const taskdatalist = this.taskdatalist;
    this.chartThree = new G2.Chart({
      container: "chartThree",
      height: 370,
      padding: [0, 140, 0, 0]
    });
    this.chartThree.source(taskdatalist);
    this.chartThree.coord("polar", {
      innerRadius: 0.2
    });
    this.chartThree.legend({
      position: "right",
      offsetY: -100,
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
  },
  created() {
    this.jcrydatarese();
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
.renyuan-gtwo-box {
  background-color: #fff;
  width: 99.65%;
  border: 1px solid #d4d7d7;
  border-radius: 6px;
  margin-top: 6px;
  height: 480px;
  box-sizing: border-box;
}
.chart-b {
  margin: 10px 0 10px 40px;
}
</style>

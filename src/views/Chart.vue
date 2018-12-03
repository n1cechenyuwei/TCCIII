<template>
  <div class="chart-box">
    <!-- 图表模块 -->
    <div class="tubiao-box" >
      <div class="gzt-box">
        <div class="gongzuotaione">
          <div class="gone-title">工作台统计</div>
          <div id="Gone"></div>
        </div>
        <div class="gongzuotaithree">
          <div class="gone-title">项目统计</div>
          <div id="Gthree"></div>
        </div>
        <div class="gongzuotaifour">
          <div class="gone-title">项目统计</div>
          <div id="Gfour"></div>
        </div>
      </div>
      <div class="renyuan-gtwo-box">
        <div class="gtwo-title-box"><span class="gtwo-title">人员统计</span></div>
        <div>
          <el-tabs v-model="jcryName" class="jceytabs">
            <el-tab-pane label="PIS人员" name="PIS">
              <div id="Gtwo"></div>
            </el-tab-pane>
            <el-tab-pane label="VMS人员" name="VMS">

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 图表鼠标移上去显示模块 -->
    <div v-show="xoffset !== 0" class="tubiao-tool" :style="'top:' + yoffset + 'px' + ';' + 'left:' + xoffset + 'px'">
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
      jcryName: "PIS", //tabs默认显示那个
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
          taskname: "三号线仿真环境设备出库",
          taskpeople: "王刚",
          tasktype: "外委检测",
          starttime: "2018-12-15",
          endtime: "2018-12-19"
        }
      ], // pis检测人员
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
      ]
    };
  },
  methods: {
    // 检测人员图表tab点击
    handleJcryClick(val) {
      console.log(val);
    },
    // 获取鼠标位置
    getMousePos(event) {
      var e = event || window.event;
      this.xoffset = e.screenX + 30;
      this.yoffset = e.screenY - 150;
      // return {'x':e.screenX,'y':screenY}
    }
  },
  mounted() {
    // gtwo图表
    const pisjcry = this.jcrylist.reverse();
    const chartone = new G2.Chart({
      container: "Gtwo", // 指定图表容器 ID
      width: 1450, // 指定图表宽度
      height: 360, // 指定图表高度
      padding: [0, 170, 30, 60]
    });
    // chartone.legend(fasle);
    pisjcry.forEach(function(obj) {
      obj.range = [obj.starttime, obj.endtime];
    });
    chartone.source(pisjcry, {
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
    chartone
      .coord()
      .transpose()
      .scale(1, 1);
    chartone.legend({
      position: "right-top",
      offsetX: 50,
      offsetY: 20
    });
    chartone.tooltip({
      useHtml: true,
      htmlContent: function() {
        return '<div style="visible:hidden">';
      }
    });
    chartone
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
    chartone.axis("range", {
      position: "bottom"
    });
    // 鼠标移入事件，获取到柱状体信息
    chartone.on("interval:mouseenter", ev => {
      this.taskname = ev.data._origin.taskname;
      this.tasktype = ev.data._origin.tasktype;
      this.taskstarttime = ev.data._origin.starttime;
      this.taskendtime = ev.data._origin.endtime;
    });
    // 鼠标移动事件，获取到鼠标位置
    chartone.on("interval:mousemove", () => {
      this.getMousePos();
    });
    // 鼠标移出事件，隐藏掉提示信息
    chartone.on("interval:mouseleave", () => {
      this.xoffset = 0;
      this.yoffset = 0;
    });
    chartone.render(); //柱状图结束

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
    const chart = new G2.Chart({
      container: "Gone",
      width: 490,
      padding: [20, 40, 30, 40], // 上，右，下，左
      // forceFit: true,
      height: 370
    });
    chart.legend(false);
    chart.axis("number", {
      title: null,
      line: {
        lineWidth: 2 // 设置线的宽度
      }
    });
    chart.axis("name", {
      label: {
        textStyle: {
          textAlign: "center", // 文本对齐方向，可取值为： start middle end
          textBaseline: "middle" // 文本基准线，可取 top middle bottom，默认为middle
        }
      }
    });
    chart.source(gzt);
    chart.scale("number", {
      tickInterval: 1,
      alias: "数量（台）"
    });
    chart.tooltip({
      showTitle: true,
      itemTpl:
        '<li style="text-align: left"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{value}</li>'
    });
    chart
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
    chart.render();

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
    var chartthree = new G2.Chart({
      container: "Gthree",
      forceFit: true,
      height: 350,
      padding: [20, 120, 0, 95]
    });
    chartthree.source(data, {
      percent: {
        nice: false
      }
    });
    chartthree.axis(false);
    chartthree.tooltip({
      showTitle: false,
      itemTpl:
        '<li data-index={index} style="margin-bottom:4px;">' +
        '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
        "{name}<br/>" +
        '<span style="padding-left: 16px">项目数量：{number}</span><br/>' +
        '<span style="padding-left: 16px">占比：{percent}</span><br/>' +
        "</li>"
    });
    chartthree
      .coord("rect")
      .transpose()
      .scale(1, -1);
    chartthree
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
    data.forEach(function(obj) {
      // 中间标签文本
      chartthree.guide().text({
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
    chartthree.render();

    // Gfour 图表
    const taskdatalist = this.taskdatalist;
    var chartfour = new G2.Chart({
      container: "Gfour",
      height: 370,
      padding: [0, 140, 0, 0]
    });
    chartfour.source(taskdatalist);
    chartfour.coord("polar", {
      innerRadius: 0.2
    });
    chartfour.legend({
      position: "right",
      offsetY: -100,
      offsetX: -10
    });
    chartfour.axis(false);
    chartfour
      .interval()
      .position("taskname*tasknumber")
      .color("taskname", G2.Global.colors_pie_16)
      .style({
        lineWidth: 1,
        stroke: "#fff"
      });
    chartfour.render();
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
.gtwo-title-box {
  text-align: center;
  height: 24px;
  line-height: 40px;
}
.gtwo-title {
  position: relative;
  font-size: 16px;
  color: #e6a23c;
}
.gzt-box {
  width: 100%;
}
.jceytabs {
  width: 1460px;
  height: 390px;
  padding-left: 30px;
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
#Gone {
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
</style>

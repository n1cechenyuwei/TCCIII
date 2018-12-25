<template>
  <div>
    <div class="tatop">
      <div class="tatop-left">
        <span class="font-cor">任务名称：</span>
        <span>{{taskdata.taskname}}</span>
      </div>
      <div class="tatop-center">
        <span class="font-cor">人员：</span>
        <el-select v-model="taskdata.taskpeople" clearable placeholder="请选择" size="small" class="select">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="tatop-right">
        <span class="font-cor">时间：</span>
        <el-date-picker
          size="small"
          v-model="taskdata.tasktime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="small" class="de-btn" type="primary">确认修改</el-button>
      </div>
    </div>
    <div class="tamiddle">
      <div class="tacontent-top">
        <el-radio-group @change="pvchange" v-model="PVtabPosition" size="small" class="tacontent-top-tittle">
          <el-radio-button label="PIS">PIS检测人员</el-radio-button>
          <el-radio-button label="VMS">VMS检测人员</el-radio-button>
        </el-radio-group>
        <div id="Gone"></div>
      </div>
    </div>
    <div>
      <div class="de-table">
        <el-table
          :data="jcryaaa"
          stripe
          style="width: 100%">
          <el-table-column
            label="任务编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="taskname"
            label="任务名称"
            width="700">
          </el-table-column>
          <el-table-column
            prop="taskpeople"
            label="负责人">
          </el-table-column>
          <el-table-column
            prop="starttime"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="endtime"
            label="结束时间">
          </el-table-column>
          <el-table-column
            label="操作">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="tapage"
        @current-change="handleCurrentChange"
        :current-page="tacurrentpage"
        :page-size="5"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
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
export default {
  data() {
    return {
      taskstarttime: "", // 人员任务开始时间
      taskendtime: "", // 人员任务结束时间
      taskname: "", // 人员任务名称
      tasktype: "", //人员任务类型
      xoffset: 0, //鼠标x轴位置
      yoffset: 0, //鼠标y轴位置
      total: 100, // 分页总页数
      tacurrentpage: 1, //当前第几页
      tools: false,
      options: ["张三", "李四", "王五"],
      PVtabPosition: "VMS",
      jcryaaa: [
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
        }
      ],
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
      jcrydata: [], // 检测人员数据
      chartone: "", // 图表实例
      taskdata: {
        taskname: "",
        taskpeople: "",
        tasktime: []
      }
    };
  },
  created() {
    this.jcrydatarese();
  },
  methods: {
    // 检测人员图表tab点击
    handleJcryClick(val) {
      console.log(val);
    },
    // 获取鼠标位置
    getMousePos(event) {
      this.tools = true;
      var e = event || window.event;
      let aa = 300;
      // let aa = document.getElementById("tools").offsetWidth;
      let bb = 1900 - e.clientX - 300;
      if (bb < aa) {
        this.xoffset = e.clientX - aa - 10;
        this.yoffset = e.clientY;
      } else {
        this.xoffset = e.clientX + 50;
        this.yoffset = e.clientY - 20;
      }
    },
    // pis vms选中读取数值
    pvchange() {
      if (this.PVtabPosition === "PIS") {
        this.jcrydata = this.jcrylist.reverse();
        this.chartone.changeData(this.jcrydata);
      } else {
        this.jcrydata = this.jcrylist.reverse();
        this.chartone.changeData(this.jcrydata);
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
    },
    // 第几页的数据
    handleCurrentChange(val) {
      console.log(val);
    },
    // 图表
    newchartone() {
      this.chartone = new G2.Chart({
        container: "Gone", // 指定图表容器 ID
        width: 1620, // 指定图表宽度
        height: 400, // 指定图表高度
        padding: [0, 130, 40, 80]
      });
      // chartone.legend(fasle);
      this.chartone.source(this.jcrydata, {
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
      this.chartone
        .coord()
        .transpose()
        .scale(1, 1);
      this.chartone.legend({
        position: "right-top",
        offsetY: 100
      });
      this.chartone.tooltip({
        useHtml: true,
        htmlContent: function() {
          return '<div style="visible:hidden">';
        }
      });
      this.chartone
        .interval()
        .position("taskpeople*range")
        // .line()
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
      this.chartone.axis("range", {
        position: "bottom"
      });
      // 鼠标移入事件，获取到柱状体信息
      this.chartone.on("interval:mouseenter", ev => {
        this.taskname = ev.data._origin.taskname;
        this.tasktype = ev.data._origin.tasktype;
        this.taskstarttime = ev.data._origin.starttime;
        this.taskendtime = ev.data._origin.endtime;
        this.getMousePos();
      });
      // 鼠标点击事件，获取到柱状体信息
      this.chartone.on("interval:click", ev => {
        this.taskdata.taskname = ev.data._origin.taskname;
        this.taskdata.taskpeople = ev.data._origin.taskpeople;
        this.taskdata.tasktime = ev.data._origin.range;
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
    }
  },
  mounted() {
    this.newchartone();
  }
};
</script>

<style>
.tatop {
  height: 54px;
  font-size: 16px;
  line-height: 54px;
  border-bottom: 1px solid #d4d7d7;
}
.tatop-left {
  display: inline-block;
  margin-left: 40px;
  width: 400px;
}
.tatop-right {
  display: inline-block;
}
.tatop-center {
  display: inline-block;
  margin-right: 60px;
}
.select {
  width: 140px;
}
.font-cor {
  color: #545a6d;
}
.tacontent-top {
  margin-top: 4px;
  margin-left: 40px;
}
.tacontent-top-tittle {
  margin-bottom: 10px;
}
.de-btn {
  margin-left: 20px;
}
.de-table {
  height: 300px;
}
.tapage {
  margin-left: 40px;
  margin-top: 20px;
}
</style>

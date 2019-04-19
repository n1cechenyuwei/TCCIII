<template>
  <div>
    <div class="tatop">
      <div class="tatop-left">
        <span class="font-cor">任务名称：</span>
        <el-tooltip class="item" effect="dark" :content="taskdata.taskname" placement="top">
          <span>{{taskdata.taskname}}</span>
        </el-tooltip>
      </div>
      <div class="tatop-center">
        <div class="leftsele">
          <span class="font-cor">检测单位：</span>
          <span v-show="spanishow">{{entrust_name}}</span>
          <el-select v-show="selectishow" v-model="entrustid" clearable placeholder="请选择检测单位" size="small" class="se-left">
            <el-option
              v-for="(item, index) in waioptions"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <span class="font-cor">人员：</span>
        <el-select v-model="taskdata.userid" clearable placeholder="请选择" size="small" class="select">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.realname"
            :value="item.userid">
          </el-option>
        </el-select>
      </div>
      <div class="tatop-right">
        <span class="font-cor">时间：</span>
        <el-date-picker
          size="small"
          class="pickerinput"
          width="240"
          v-model="taskdata.tasktime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="small" class="de-btn" type="primary" @click="handleedittask">确认修改</el-button>
      </div>
    </div>
    <div class="tamiddle">
      <div class="tacontent-top">
        <el-radio-group @change="pvchange" v-model="PVtabPosition" size="small" class="tacontent-top-tittle">
          <el-radio-button label="vms">VMS检测人员</el-radio-button>
          <el-radio-button label="pis">PIS检测人员</el-radio-button>
        </el-radio-group>
        <div id="Gone" class="fenpei"></div>
        <el-pagination
          class="tapage"
          @current-change="handleGoneChange"
          :current-page="tacurrentpage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="tasklisttotal">
        </el-pagination>
      </div>
    </div>
    <div>
      <div class="de-table">
        <el-table
          :data="tabledata"
          stripe
          row-class-name="colcell"
          height="360"
          @row-click="rownameclick"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="任务编号"
            width="100">
          </el-table-column>
          <el-table-column
            label="任务名称"
            prop="taskname"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="pro_name"
            show-overflow-tooltip
            width="300"
            :filters="filter"
            :filter-method="filterHandler"
            filter-placement="bottom"
            label="所属项目">
          </el-table-column>
          <el-table-column
            prop="entrust_name"
            show-overflow-tooltip
            label="检测单位">
          </el-table-column>
          <el-table-column
            prop="username"
            width="180"
            label="负责人">
          </el-table-column>
          <el-table-column
            prop="starttime"
            width="180"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="endtime"
            width="180"
            label="结束时间">
          </el-table-column>
          <el-table-column
            width="100"
            label="进度">
            <template slot-scope="scope">
              <span>{{scope.row.sechedule}}%</span>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            label="状态">
            <template slot-scope="scope">
              <span v-show="scope.row.istimeout === 0">{{scope.row.state}}</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state !== '已完成')" v-bind:class="{warning: (scope.row.istimeout === 1 )}">超时</span>
                <span v-show="(scope.row.istimeout === 1 && scope.row.state === '已完成')">{{scope.row.state}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      taskstarttime: "", // 人员任务开始时间
      taskendtime: "", // 人员任务结束时间
      taskname: "", // 人员任务名称
      tasktype: "", // 人员任务类型
      xoffset: 0, // 鼠标x轴位置
      yoffset: 0, // 鼠标y轴位置
      total: 100, // 分页总页数
      chartlist: [], // 图表数据
      tasklisttotal: 0, // 数据总数
      chartone: "", // 图表实例
      tacurrentpage: 1, // 当前第几页
      selectishow: false, // 判断是否是外委任务来决定选择框是否显示
      spanishow: false, // 判断是否是外委任务来判断检测单位span是否显示
      tools: false,
      options: [],
      waioptions: [],
      PVtabPosition: "vms", // 默认人员类型
      taskdata: {
        taskname: "",
        userid: "",
        tasktime: null
      },
      tabledata: [], // table数据存储
      tabletasktotal: 0, // table数据总条数
      taskdataid: 0, // 任务id
      divwidth: 0, // div宽度
      tablepage: 1, // 当前页数
      filter: [], // 筛选条件
      entrust_name: "", // 检测中心
      entrustid: "" // 检测单位id
      // tickCountNumber: 0 // 图表列个数
    };
  },
  created() {
    this.gettaskpeople("vms");
    this.alltasktable();
    this.getentrust_name();
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
      if (this.PVtabPosition === "pis") {
        this.tacurrentpage = 1;
        this.gettaskpeople("pis");
        this.chartslistdata(1);
        this.alltasktable();
        this.taskdata.taskname = "";
        this.taskdata.userid = "";
        this.taskdata.tasktime = null;
        this.entrustid = "";
        this.taskdataid = "";
        this.entrust_name = "";
      } else {
        this.tacurrentpage = 1;
        this.gettaskpeople("vms");
        this.handleGoneChange(1);
        this.alltasktable();
        this.taskdata.taskname = "";
        this.taskdata.userid = "";
        this.taskdata.tasktime = null;
        this.entrustid = "";
        this.taskdataid = "";
        this.entrust_name = "";
      }
    },
    // 图表
    newchartone() {
      const _DataSet = DataSet,
        DataView = _DataSet.DataView;
      let data = this.chartlist;
      // let data = this.jcrydata;
      var dv = new DataView().source(data);
      data = dv.rows;
      this.chartone = new G2.Chart({
        container: "Gone", // 指定图表容器 ID
        width: 1620, // 指定图表宽度
        height: 360, // 指定图表高度
        padding: [0, 200, 40, 80]
      });
      this.chartone.source(data, {
        range: {
          type: "time",
          // tickCount: this.tickCountNumber
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
        .position("taskpeople*range")
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
      // 鼠标点击事件，获取到柱状体信息
      this.chartone.on("interval:click", ev => {
        this.taskdataid = ev.data._origin.taskid;
        this.taskdata.taskname = ev.data._origin.taskname;
        this.taskdata.userid = ev.data._origin.userid;
        this.taskdata.tasktime = [
          ev.data._origin.starttime,
          ev.data._origin.endtime
        ];
        if (ev.data._origin.entrust_name === "检测中心") {
          this.selectishow = false;
          this.spanishow = true;
          this.entrust_name = "检测中心";
          this.entrustid = "";
        } else if (ev.data._origin.entrust_id === 0) {
          this.entrustid = "";
          this.selectishow = true;
          this.spanishow = false;
        } else {
          this.selectishow = true;
          this.spanishow = false;
          this.entrustid = ev.data._origin.entrust_id;
        }
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
    // 确定修改
    async handleedittask() {
      if (this.selectishow === false) {
        if (
          this.taskdata.userid === "" ||
          this.taskdata.tasktime === null ||
          this.taskdataid === 0
        ) {
          this.$message.warning("请填写完整信息");
        } else {
          const res = await this.$http.put(
            `allocationtask/${this.taskdataid}`,
            {
              userid: this.taskdata.userid,
              starttime: this.taskdata.tasktime[0],
              endtime: this.taskdata.tasktime[1]
            }
          );
          if (res.status === 200) {
            this.$message.success("任务分配成功");
            this.chartslistdata(this.tacurrentpage);
            this.alltasktable();
          } else {
            this.$message.error(res.msg);
          }
        }
      } else {
        if (this.entrustid === "") {
          this.$message.warning("请填写完整信息");
        } else {
          const res = await this.$http.put(
            `allocationtask/${this.taskdataid}`,
            {
              userid: this.taskdata.userid,
              starttime: this.taskdata.tasktime[0],
              endtime: this.taskdata.tasktime[1],
              entrust_id: this.entrustid
            }
          );
          if (res.status === 200) {
            this.$message.success("任务分配成功");
            this.chartslistdata(this.tacurrentpage);
            this.alltasktable();
          } else {
            this.$message.error(res.msg);
          }
        }
      }
    },
    // 获取人员信息
    async gettaskpeople(type) {
      const date = new Date().getTime();
      const res = await this.$http.get(`getperson/${type}?${date}`);
      if (res.data.status === 200) {
        this.options = res.data.userinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取外委检测单位信息
    async getentrust_name() {
      const res = await this.$http.get(`encompany`);
      if (res.data.status === 200) {
        this.waioptions = res.data.entrustinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 请求图标数据并刷新
    async chartslistdata(page) {
      const date = new Date().getTime();
      const res = await this.$http.get(
        `taskcharts/${this.PVtabPosition}/${page}?${date}`
      );
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
            // obj.range[1] = obj.endtime + " " + "24:00:00";
          } else {
            obj.range = [obj.starttime, obj.endtime];
          }
        });
        this.chartlist = res.taskinfo;
        this.tasklisttotal = res.data_total;
        this.chartone.changeData(this.chartlist);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 图表信息页数改变
    async handleGoneChange(val) {
      this.tacurrentpage = val;
      this.chartslistdata(val);
    },
    // 请求图表信息
    async alltisklistdatatwo(type) {
      const date = new Date().getTime();
      const res = await this.$http.get(`taskcharts/${type}/1?${date}`);
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
        this.newchartone();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 请求表格信息
    async alltasktable() {
      const res = await this.$http.get(`alltbdtask/${this.PVtabPosition}`);
      if (res.status === 200) {
        this.tabledata = res.data;
        this.tabletasktotal = res.data.length;
        const filterlist = [];
        for (var i = 0; i < this.tabledata.length; i++) {
          filterlist[i] = {};
          filterlist[i].text = this.tabledata[i].pro_name;
          filterlist[i].value = this.tabledata[i].pro_id;
        }
        const hash = [];
        for (let i = 0; i < filterlist.length; i++) {
          for (let j = i + 1; j < filterlist.length; j++) {
            if (filterlist[i].value === filterlist[j].value) {
              ++i;
            }
          }
          hash.push(filterlist[i]);
        }
        this.filter = hash;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 点击表格名称，读取任务信息到上方
    rownameclick(row) {
      this.entrustid = "";
      this.taskdataid = row.id;
      this.taskdata.taskname = row.taskname;
      this.taskdata.userid = row.userid;
      this.taskdata.tasktime = [];
      this.taskdata.tasktime[0] = row.starttime;
      this.taskdata.tasktime[1] = row.endtime;
      if (row.entrust_name === "检测中心") {
        this.selectishow = false;
        this.spanishow = true;
        this.entrust_name = row.entrust_name;
      } else if (row.entrust_id === 0) {
        this.selectishow = true;
        this.spanishow = false;
        this.entrustid = "";
      } else {
        this.selectishow = true;
        this.spanishow = false;
        this.entrustid = row.entrust_id;
      }
    },
    // 表格所选项目筛选
    filterHandler(value, row) {
      return row.pro_id === value;
    }
  },
  mounted() {
    this.alltisklistdatatwo("vms");
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
  width: 600px;
  vertical-align: top;
}
.tatop-right {
  display: inline-block;
  vertical-align: top;
}
.tatop-right .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 240px;
}
.tatop-center {
  display: inline-block;
  margin-left: 10px;
  margin-right: 50px;
  vertical-align: top;
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
.fenpei {
  width: 1620px;
  height: 360px;
}
.colcell {
  cursor: Pointer;
}
.colcell:hover {
  color: #409eff;
}
.se-left {
  width: 200px;
}
.leftsele {
  display: inline-block;
  width: 330px;
}
</style>

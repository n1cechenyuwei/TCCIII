<template>
  <div class="height-auto">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng"></i>
      <i class="font">浙江大华公司入围检测设备出库任务</i>
    </div>
    <div class="detection-jibenxinxi">
      <div>
        <div class="statusbox">
          <i class="statusbox-font">负责人：</i>
          <i>郝佳贺</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">起始日：</i>
          <i>2018-11-12</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">到期日：</i>
          <i>2018-11-16</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">任务状态：</i>
          <i>超时</i>
        </div>
      </div>
      <div>
        <div class="gong-information-box">
          <span>所属项目：</span>
          <span class="gong-box-font">浙江大华公司入围检测项目</span>
        </div>
      </div>
      <div class="taskSliderBox">
        <span>任务进度:</span>
        <div class="Slider">
          <el-slider v-model="$store.state.tasksechedule" :disabled="disable" @change="handletasksechedule"></el-slider>
        </div>
        <span>{{$store.state.tasksechedule}}%</span>
      </div>
    </div>
    <div class="shoujian-title">
      <i class="iconfont icon-jiafangyifang"></i>
      <span>受检单位信息</span>
    </div>
    <div class="op-shebei-box">
      <div class="ra-information-box">
        <div class="information-box">
          <span>单位名称：</span>
          <span class="information-box-font">浙江大华公司</span>
        </div>
        <el-tooltip :content="appconbb.address" placement="top">
          <div class="information-box2">
            <span>单位地址：</span>
            <span class="information-box-font">杭州市滨江区滨安路199号</span>
          </div>
        </el-tooltip>
      </div>
      <div class="ra-information-box">
        <div class="information-box">
          <span>联系人：</span>
          <span class="information-box-font">赵龙</span>
        </div>
        <div class="information-box2">
          <span>联系电话：</span>
          <span class="information-box-font">15652265789</span>
        </div>
      </div>
    </div>
    <div class="shoujian-title">
      <i class="iconfont icon-shebeixinxi"></i>
      <span>设备信息</span>
    </div>
    <div class="op-tb-content">
      <div class="op-shebei-title">
        <div class="title-box-op">
          <i class="iconfont icon-iconfont"></i>
          <span class="shebifont">待出库：</span>
          <span class="shebeinumber daichuku">4</span>
        </div>
        <div class="title-box-op">
          <i class="iconfont icon-iconfont"></i>
          <span class="shebifont">已出库：</span>
          <span class="shebeinumber yichuku">4</span>
        </div>
        <div class="title-box-op">
          <i class="iconfont icon-iconfont"></i>
          <span class="shebifont">设备总数：</span>
          <span class="shebeinumber zongshu">8</span>
        </div>
      </div>
      <el-table
        height="300"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          fixed
          label="编号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          fixed
          show-overflow-tooltip
          label="设备名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          show-overflow-tooltip
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="xinghao"
          width="120"
          show-overflow-tooltip
          label="硬件型号">
        </el-table-column>
        <el-table-column
          prop="xuliehao"
          label="出厂序列号"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="people"
          show-overflow-tooltip
          label="接收人">
        </el-table-column>
        <el-table-column
          prop="date"
          width="120"
          label="接受时间">
        </el-table-column>
        <el-table-column
          prop="waiguan"
          label="外观">
        </el-table-column>
        <el-table-column
          prop="zhuangtai"
          fixed="right"
          label="设备状态">
        </el-table-column>
        <el-table-column
          width="50"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <i class="el-icon-edit-outline shezhi"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="eqconfig-bot-btn">
      <el-button size="small" type="primary" @click="eqconfigsubmit">提交任务</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "海康威视球机",
          people: "郝佳贺",
          id: 1001,
          type: "球机",
          xinghao: "SDWEEEE-1",
          xuliehao: "SD6A5D4DAS5D4A6D4",
          waiguan: "异常",
          zhuangtai: "已入库"
        },
        {
          date: "2016-05-02",
          name: "海康威视球机",
          people: "郝佳贺",
          id: 1001,
          type: "球机",
          xinghao: "SDWEEEE-1",
          xuliehao: "SD6A5D4DAS5D4A6D4",
          waiguan: "异常",
          zhuangtai: "已入库"
        },
        {
          date: "2016-05-02",
          name: "海康威视球机",
          people: "郝佳贺",
          id: 1001,
          type: "球机",
          xinghao: "SDWEEEE-1",
          xuliehao: "SD6A5D4DAS5D4A6D4",
          waiguan: "异常",
          zhuangtai: "已入库"
        },
        {
          date: "2016-05-02",
          name: "海康威视球机",
          people: "郝佳贺",
          id: 1001,
          type: "球机",
          xinghao: "SDWEEEE-1",
          xuliehao: "SD6A5D4DAS5D4A6D4",
          waiguan: "异常",
          zhuangtai: "已入库"
        },
        {
          date: "2016-05-02",
          name: "海康威视球机",
          people: "郝佳贺",
          id: 1001,
          type: "球机",
          xinghao: "SDWEEEE-1",
          xuliehao: "SD6A5D4DAS5D4A6D4",
          waiguan: "异常",
          zhuangtai: "已入库"
        }
      ]
    };
  },
  methods: {
    // 提交任务
    eqconfigsubmit() {
      this.$confirm("确定提交任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message.success("提交成功");
        })
        .catch(() => {});
    },
    // 更改任务进度
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    }
  }
};
</script>

<style>
.op-shebei-box {
  padding: 0px 0 20px 20px;
  background-color: #fff;
  margin-top: 4px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.ra-information-box {
  margin-top: 10px;
  position: relative;
}
.op-tb-content {
  height: 440px;
  background-color: #fff;
  margin-top: 4px;
  border-top: 1px solid #dae9f9;
  padding-top: 10px;
}
.shezhi {
  font-size: 18px;
  color: #e6a23c;
  cursor: pointer;
}
</style>

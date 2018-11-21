<template>
  <div class="putbig">
    <div>
      <div class="applyfor-top">
        <i id="put-icon" class="iconfont icon-gongsimingcheng0"></i>
        <i class="font">浙江大华公司入围检测设备入库任务</i>
      </div>
      <div class="statuss">
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
            <span>单位名称：</span>
            <span class="information-box-font">浙江大华公司</span>
          </div>
        </div>
        <div class="taskSliderBox">
          <span>任务进度:</span>
          <div class="Slider">
            <el-slider v-model="taskvalue"></el-slider>
          </div>
          <span>{{taskvalue}}%</span>
        </div>
      </div>
    </div>
    <div class="shoujian-title">
      <i class="iconfont icon-jiafangyifang"></i>
      <span>受检单位信息</span>
    </div>
    <div class="shoujian-content">
      <div class="applyfor-information-box">
        <div class="information-box-one">
          <span>单位名称：</span>
          <span class="information-box-font">浙江大华公司</span>
        </div>
        <div class="information-box2-one">
          <span>单位地址：</span>
          <span class="information-box-font">杭州市滨安区滨安路199号</span>
        </div>
      </div>
      <div class="applyfor-information-box">
        <div class="information-box-one">
          <span>联系人：</span>
          <span class="information-box-font">郝佳贺</span>
        </div>
        <div class="information-box2-one">
          <span>联系电话：</span>
          <span class="information-box-font">18602220546</span>
        </div>
      </div>
    </div>
    <div class="shoujian-title">
      <i class="iconfont icon-shebeixinxi"></i>
      <span>受检单位信息</span>
    </div>
    <div class="shebei-content">
      <el-table
        :data="$store.state.equipment"
        style="width: 100%"
        height="320">
        <el-table-column
          fixed
          prop="bianhao"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="eqname"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="eqtype"
          label="类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="xinghao"
          label="设备型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="iem"
          label="出厂序列号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="people"
          label="送检人"
          width="120">
        </el-table-column>
        <el-table-column
          prop="time"
          label="送检时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="waiguan"
          label="外观"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="80">
            <template slot-scope="scope">
              <i class="el-icon-edit-outline putbtncolor" @click="eqopen(scope.row)"></i>
            </template>
        </el-table-column>
      </el-table>
      <el-button class="putstorage-btn" type="primary" size="medium" @click="handleputstorage">提交任务</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue: 0 //进度条
    };
  },
  methods: {
    // 打开设备dialog
    eqopen(eq) {
      this.$store.dispatch("putstoragedialog", eq);
    },
    // 提交任务
    handleputstorage() {
      this.$confirm("确定提交任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message.success("任务提交成功");
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
#put-icon {
  font-size: 32px;
  color: #1ac7ff;
}
.putbig {
  height: 100%;
}
.shoujian-title {
  padding-left: 22px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  margin-top: 6px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  font-size: 22px;
  color: #4d5d71;
}
.shoujian-title .icon-jiafangyifang {
  font-size: 22px;
  color: #19c6ff;
  margin-right: 16px;
}
.shoujian-title .icon-shebeixinxi {
  font-size: 22px;
  color: #19c6ff;
  margin-right: 16px;
}
.shoujian-content {
  padding-left: 30px;
  margin-top: 4px;
  height: 130px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  background-color: #fff;
}
.applyfor-information-box {
  margin-top: 20px;
  position: relative;
}
.information-box-one {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 330px;
  max-width: 430px;
  border-bottom: 1px dashed #cacaca;
  color: #7e8b8e;
  font-size: 18px;
}
.information-box-font {
  color: #000;
  font-size: 16px;
}
.information-box2-one {
  position: absolute;
  color: #7e8b8e;
  top: 0px;
  left: 440px;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  max-width: 460px;
  border-bottom: 1px dashed #cacaca;
  font-size: 18px;
}
.shebei-content {
  /* position: relative; */
  height: 100%;
  background-color: #fff;
  margin-top: 4px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.putbtncolor {
  color: #e6a23c;
  font-size: 20px;
  vertical-align: middle;
  cursor: pointer;
}
.putstorage-btn {
  position: absolute;
  bottom: 10px;
  left: 430px;
}
</style>

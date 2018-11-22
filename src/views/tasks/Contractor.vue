<template>
  <div class="concard">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng0"></i>
      <i class="font">浙江大华公司入围检测外委任务</i>
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
      <div class="gong-information-box">
        <span>所属项目：</span>
        <span class="gong-box-font">浙江大华公司入围检测项目</span>
      </div>
      <div class="taskSliderBox">
        <span>任务进度:</span>
        <div class="Slider">
          <el-slider v-model="taskvalue"></el-slider>
        </div>
        <span>{{taskvalue}}%</span>
      </div>
    </div>
    <div class="EqconfigContent-title">
      <i id="shebeixinxi-icon" class="iconfont icon-shebeixinxi"></i>
      <i class="EqconfigContentfont">设备信息</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue: 0
    }
  }
}
</script>

<style>
.concard {
  height: 100%;
  position: relative;
}
</style>

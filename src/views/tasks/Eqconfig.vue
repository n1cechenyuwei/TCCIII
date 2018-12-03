<template>
  <div class="eqconfig-big">
    <div>
      <div class="applyfor-top">
        <i id="eqconfig-icon" class="iconfont icon-gongsimingcheng"></i>
        <i class="font">浙江大华公司入围检测设备配置任务</i>
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
    </div>
    <div class="EqconfigContent-title">
      <i id="shebeixinxi-icon" class="iconfont icon-shebeixinxi"></i>
      <i class="EqconfigContentfont">设备信息</i>
    </div>
    <div class="eqconfig-shebei-content">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备名称：</span>
          <span class="information-box-font">海康威视球机</span>
        </div>
        <div class="information-box2">
          <span>设备类型：</span>
          <span class="information-box-font">球机</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>硬件型号：</span>
          <span class="information-box-font">DS-2D544ED221</span>
        </div>
        <div class="information-box2">
          <span>设备序列号：</span>
          <span class="information-box-font">AS45648151564</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备编号：</span>
          <span class="information-box-font">10001</span>
        </div>
        <div class="information-box2">
          <span>SIP：</span>
          <span class="information-box-font">156SD2164556D3</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>登录用户名：</span>
          <span class="information-box-font">adminadmin</span>
        </div>
        <div class="information-box2">
          <span>登录密码：</span>
          <span class="information-box-font">Admin123</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>注册用户名：</span>
          <span class="information-box-font">adminadmin</span>
        </div>
        <div class="information-box2">
          <span>注册密码：</span>
          <span class="information-box-font">Admin123</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>IP地址：</span>
          <span class="information-box-font">127.0.0.1</span>
        </div>
        <div class="information-box2">
          <span>端口：</span>
          <span class="information-box-font">8080</span>
        </div>
      </div>
    </div>
    <div class="EqconfigContent-title">
      <i id="shebeixinxi-icon" class="iconfont icon-jiafangyifang"></i>
      <i class="EqconfigContentfont">受检单位信息</i>
    </div>
    <div class="eqconfig-shebei-content">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>单位名称：</span>
          <span class="information-box-font">浙江大华公司</span>
        </div>
        <div class="information-box2">
          <span>电子邮箱：</span>
          <span class="information-box-font">dahua123456@163.com</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>联系人：</span>
          <span class="information-box-font">赵龙</span>
        </div>
        <div class="information-box2">
          <span>联系电话：</span>
          <span class="information-box-font">15666601212</span>
        </div>
      </div>
    </div>
    <div class="EqconfigContent-title">
      <i id="shebeixinxi-icon" class="iconfont icon-gongzuotai"></i>
      <i class="EqconfigContentfont">工作台信息</i>
    </div>
    <div class="eqconfig-shebei-content bot-height">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>工作台编号：</span>
          <span class="information-box-font">001</span>
        </div>
        <div class="information-box2">
          <span>IP地址：</span>
          <span class="information-box-font">127.0.0.1</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>SIP：</span>
          <span class="information-box-font">156SD2164556D3</span>
        </div>
        <div class="information-box2">
          <span>端口：</span>
          <span class="information-box-font">8080</span>
        </div>
      </div>
      <div class="eqconfig-bot-btn">
        <el-button size="small" type="primary" @click="eqconfigsubmit">提交任务</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue: 0 // 任务进度
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
    }
  }
};
</script>

<style>
.eqconfig-big {
  height: 100%;
}
#eqconfig-icon {
  font-size: 32px;
  color: #1ac7ff;
}
.EqconfigContent-title {
  box-sizing: border-box;
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  padding-left: 24px;
  margin-top: 4px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.EqconfigContentfont {
  font-size: 20px;
  color: #4d5d71;
  margin-left: 12px;
}
#shebeixinxi-icon {
  font-size: 22px;
  color: #1ac7ff;
}
.eqconfig-shebei-content {
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  background-color: #fff;
  padding-left: 20px;
  padding-bottom: 14px;
}
.eqconfig-information-box {
  margin-top: 6px;
  position: relative;
}
.bot-height {
  height: 100%;
}
</style>

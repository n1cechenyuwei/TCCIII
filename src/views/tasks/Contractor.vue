<template>
  <div class="concard">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng"></i>
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
      <i id="waiwei-icon" class="iconfont icon-jiafangyifang"></i>
      <i class="EqconfigContentfont">外委单位信息</i>
    </div>
    <div class="con-conbox">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>单位名称：</span>
          <span class="information-box-font">公安安全与警用电子产品质量检测中心</span>
        </div>
        <div class="information-box2">
          <span>单位地址：</span>
          <span class="information-box-font">北京市海淀区首体南路1号</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>邮政编码：</span>
          <span class="information-box-font">100048</span>
        </div>
        <div class="information-box2">
          <span>联系电话：</span>
          <span class="information-box-font">400-7842321</span>
        </div>
      </div>
    </div>
    <div class="EqconfigContent-title">
      <i id="waiwei-icon" class="iconfont icon-hetong"></i>
      <i class="EqconfigContentfont">外委单位信息</i>
    </div>
    <div class="waiweixinxi-box">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备名称：</span>
          <span class="information-box-font">海康威视球机</span>
        </div>
        <div class="information-box2">
          <span>设备型号：</span>
          <span class="information-box-font">TP7</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备类型：</span>
          <span class="information-box-font">球机</span>
        </div>
        <div class="information-box2">
          <span>设备序列号：</span>
          <span class="information-box-font">B22441A56DS36</span>
        </div>
      </div>
      <div class="upload-box">
        <span>外委报告：</span>
        <div class="upup">
          <el-upload
            class="upclass"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :file-list="fileList">
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </div>
      </div>
     
        <el-button size="small" type="primary" @click="eqconfigsubmit" class="contractor-btn">提交任务</el-button>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue: 0,
      fileList: [
        { name: "food.jpeg" },
        { name: "food.jpeg" },
        { name: "food.jpeg" },
        { name: "food.jpeg" }
      ]
    };
  },
  methods: {
    // 点击上传的文件实现下载
    handlePreview(val) {
      // window.open('http://192.168.1.186:8888/api/v1.0/download/1');
      console.log(val);
      var _form = document.createElement("FORM");
      _form.setAttribute("method", "get");
      _form.setAttribute(
        "action",
        "http://192.168.1.186:8888/api/v1.0/download/1"
      );
      document.body.appendChild(_form);
      _form.submit();
    },
    // 移除上传的文件之前
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 移除上传的文件
    handleRemove(file) {
      console.log(file);
    },
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
.concard {
  height: 100%;
}
#waiwei-icon {
  font-size: 22px;
  color: #1ac7ff;
}
.con-conbox {
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  background-color: #fff;
  padding: 10px 0 20px 20px;
}
.waiweixinxi-box {
  height: 100%;
  background-color: #fff;
  border-top: 1px solid #dae9f9;
  margin-top: 6px;
  padding: 10px 0 0 20px;
}
.upload-box {
  margin-top: 20px;
  height: 250px;
  color: #7e8b8e;
  font-size: 18px;
}
.upload-box > span {
  vertical-align: top;
  display: inline-block;
}
.upup {
  display: inline-block;
}
.upclass {
  width: 500px;
  height: 100px;
}
.upclass .el-upload-list.el-upload-list--text {
  height: 200px !important;
  overflow: auto !important;
  /* background-color: #000; */
}
.contractor-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}
</style>

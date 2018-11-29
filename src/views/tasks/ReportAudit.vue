<template>
  <div class="height-auto">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng0"></i>
      <i class="font">浙江大华公司入围检测报告审核任务</i>
    </div>
    <div class="ra-content">
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
          <el-slider v-model="taskvalue"></el-slider>
        </div>
        <span>{{taskvalue}}%</span>
      </div>
      <div class="ra-shebei-box">
        <div class="ra-information-box">
          <div class="information-box">
            <span>设备名称：</span>
            <span class="information-box-font">海康威视球机</span>
          </div>
          <div class="information-box2">
            <span>设备编号：</span>
            <span class="information-box-font">1001</span>
          </div>
        </div>
        <div class="ra-information-box">
          <div class="information-box">
            <span>硬件类型：</span>
            <span class="information-box-font">球机</span>
          </div>
          <div class="information-box2">
            <span>设备序列号：</span>
            <span class="information-box-font">AS45648151564</span>
          </div>
        </div>
        <div class="ra-information-box">
          <div class="information-box">
            <span>送检人：</span>
            <span class="information-box-font">郝佳贺</span>
          </div>
          <div class="information-box2">
            <span>送检时间：</span>
            <span class="information-box-font">2018-11-12</span>
          </div>
        </div>
        <div class="ragongsi-box">
          <div class="ragongsi-title">受检单位信息</div>
          <div class="ra-information-box">
            <div class="information-box">
              <span>单位名称：</span>
              <span class="information-box-font">浙江大华公司</span>
            </div>
            <div class="information-box2">
              <span>单位地址：</span>
              <span class="information-box-font">杭州市滨江区滨安路1199号</span>
            </div>
          </div>
          <div class="ra-information-box">
            <div class="information-box">
              <span>邮编：</span>
              <span class="information-box-font">301201</span>
            </div>
            <div class="information-box2">
              <span>电话：</span>
              <span class="information-box-font">18601401000</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rabaogao-box">
        <div><i id="jcbaogao" class="iconfont icon-jiancebaogao"></i><span class="rabaogao-title">检测报告</span></div>
        <div class="ratabs-box">
          <el-tabs v-model="raactive">
            <el-tab-pane label="报告初稿" name="first">
              <el-button type="primary" size="mini" class="mt6">生成初稿</el-button>
              <div class="ratabs-minibox">
                <div class="rachugao-list">
                  <i id="icon-docx" class="iconfont icon-docx"></i>
                  <span>浙江大华公司入围检测海康威视报告</span>
                  <i class="el-icon-download radowmload"></i>
                </div>
                <div class="rachugao-list">
                  <i id="icon-docx" class="iconfont icon-docx"></i>
                  <span>浙江大华公司入围检测海康威视报告</span>
                  <i class="el-icon-download radowmload"></i>
                </div>
                <div class="rachugao-list">
                  <i id="icon-docx" class="iconfont icon-docx"></i>
                  <span>浙江大华公司入围检测海康威视报告</span>
                  <i class="el-icon-download radowmload"></i>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="报告终稿" name="second">
              <div class="ratabs-minibox">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="mini" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">单次最多上传3个文件</div>
                </el-upload>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
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
      taskvalue: 0, // 任务进度条
      raactive: "first",
      fileList: [{name: 'food.jpeg'}, {name: 'food2.jpeg'}]
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
    // 移除上传文件列表
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件名称
    handlePreview(file) {
      console.log(file);
    },
    // 超出文件限制
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，请重新选择上传文件数量`);
    },
    // 文件移除之前弹窗提示
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
};
</script>

<style>
.ra-shebei-box {
  padding-top: 10px;
}
.ra-content {
  height: 800px;
  background-color: #fff;
  padding: 10px 0 10px 20px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.ragongsi-title {
  color: #515b6f;
  margin-top: 20px;
  font-weight: 600;
}
.ra-information-box {
  margin-top: 10px;
  position: relative;
}
.rabaogao-box {
  margin-top: 20px;
}
.rabaogao-title {
  color: #515b6f;
  display: inline-block;
  font-size: 22px;
  vertical-align: top;
  margin-left: 10px;
}
#jcbaogao {
  font-size: 30px;
  color: #1ac7ff;
}
.ratabs-box {
  width: 800px;
  padding-left: 40px;
}
.rabaogao-box .el-tabs__item {
  font-size: 16px;
}
.ratabs-minibox {
  /* background-color: red; */
  margin-top: 6px;
  height: 180px;
  overflow: auto;
}
.rachugao-list {
  position: relative;
  height: 30px;
  line-height: 30px;
}
.rachugao-list:hover {
  background-color: #f5f7fa;
}
.rachugao-list > span {
  color: #606266;
  font-size: 14px;
}
.rachugao-list > span:hover {
  color: #409eff;
}
#icon-docx {
  color: #409eff;
  margin-right: 10px;
}
.radowmload {
  position: absolute;
  font-size: 20px;
  color: #409eff;
  top: 6px;
  right: 0px;
  cursor: pointer;
}
.mt6 {
  margin-top: 6px;
}
</style>

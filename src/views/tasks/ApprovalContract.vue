<template>
  <div class="approvalbig">
    <div>
      <div class="applyfor-top">
        <i class="iconfont icon-gongsimingcheng0 appcon"></i>
        <i class="font">浙江大华公司入围检测合同签订任务</i>
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
    <div class="approvalContent">
      <div class="jiafang-title">
        <i class="iconfont icon-jiafangyifang"></i>
        <span class="jiafang-title-title">甲方信息</span>
      </div>
      <div class="jiafang-content">
        <div class="approval-information-box">
          <div class="information-box">
            <span>单位名称：</span>
            <span class="information-box-font">浙江大华公司</span>
          </div>
          <div class="information-boxa">
            <span>单位地址：</span>
            <span class="information-box-font">浙江市滨安区滨安路199号</span>
          </div>
        </div>
        <div class="approval-information-box">
          <div class="information-box">
            <span>联系人：</span>
            <span class="information-box-font">郝佳贺</span>
          </div>
          <div class="information-boxa">
            <span>联系电话：</span>
            <span class="information-box-font">18602220546</span>
          </div>
        </div>
        <div class="approval-information-box">
          <div class="information-box">
            <span>电子邮箱：</span>
            <span class="information-box-font">12345621@163.com</span>
          </div>
        </div>
      </div>
      <div class="jiafang-title">
        <i class="iconfont icon-hetong"></i>
        <span class="jiafang-title-title">合同信息</span>
      </div>
      <div class="hetong-centent">
        <div class="hetong-cententbox">
          <div class="approval-information-box">
            <div class="information-box">
              <span>合同名称：</span>
              <span class="information-box-font">浙江大华公司入围检测合同</span>
            </div>
            <div class="information-boxa">
              <span>所属项目：</span>
              <span class="information-box-font">浙江大华公司入围检测项目</span>
            </div>
          </div>
          <div class="approval-information-box">
            <div class="information-box">
              <span>甲方：</span>
              <span class="information-box-font">浙江大华有限公司</span>
            </div>
            <div class="information-boxa">
              <span>乙方：</span>
              <span class="information-box-font">检测中心</span>
            </div>
          </div>
          <div class="approval-information-box">
            <div class="information-box">
              <span>合同编号：</span>
              <span class="information-box-font">VD12456201</span>
            </div>
            <div class="information-boxa">
              <span>合同期限：</span>
              <div class="approvaldata-box">
                <el-date-picker
                  class="datare"
                  size="small"
                  v-model="approvaldata"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  @change="datachange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="approval-information-box">
            <div class="information-box">
              <span>合同金额：</span>
              <div class="information-box-input">
                <el-input
                  size="small"
                  placeholder="请输入金额"
                  v-model="approvalinput">
                </el-input>
              </div>
            </div>
            <div class="information-boxa">
              <span>合同状态：</span>
              <span class="information-box-fontt">待签订</span>
            </div>
          </div>
          <div class="approval-information-boxe">
            <div class="information-boxq">
              <span>合同附件：</span>
              <div class="information-boxw">
                <el-tabs>
                  <el-tab-pane label="初稿">
                    <el-button type="primary" size="mini" class="chugao-btn">生成初稿</el-button>
                    <div class="chugao-box scrollbar">
                      <div class="chugao-list">
                        <span class="chugao-name">大华公司入围检测项目合同初稿</span>
                        <a href="" class="chugao-icon">
                          <i class="el-icon-download"></i>
                        </a>
                      </div>
                      <div class="chugao-list">
                        <span class="chugao-name">大华公司入围检测项目合同初稿</span>
                        <a href="" class="chugao-icon">
                          <i class="el-icon-download"></i>
                        </a>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="终稿">
                    <div class="zhonggao-box">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :file-list="fileList">
                        <el-button size="mini" type="primary">点击上传</el-button>
                      </el-upload>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="hetong-isbtn">
              <el-radio v-model="hetongradio" label="1" border size="small" @change="radiochange">通过</el-radio>
              <el-radio v-model="hetongradio" label="2" border size="small" @change="radiochange">不通过</el-radio>
              <el-form :model="formhetong" ref="formhetong" v-if="Isshow">
                <el-form-item prop="why" :rules="[{ required: true, message: '原因不能为空'}]">
                  <el-input
                    class="textaree"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 4}"
                    placeholder="请输入合同签订失败原因"
                    v-model="formhetong.why">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="approval-btn-two">
            <el-button type="primary" size="medium">保存信息</el-button>
            <el-button type="primary" size="medium" @click="handletasksubmit">提交任务</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue: 0, //任务进度，必须是数字
      approvaldata: ["2018-10-15", "2018-11-16"], //合同绑定日期
      approvalinput: "拾万元整", //合同金额绑定值
      hetongradio: "", //合同绑定值
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      Isshow: false, //合同不通过原因绑定值
      formhetong: {
        why: "" //文本绑定值
      }
    };
  },
  methods: {
    //是否通过显示文本框
    radiochange() {
      if (this.hetongradio === "2") {
        this.Isshow = true;
      } else {
        this.Isshow = false;
      }
    },
    // 日历组件时间
    datachange() {
      console.log(this.approvaldata);
    },
    // 提交任务
    handletasksubmit() {
      if (this.hetongradio === "") {
        this.$message.error("请选择合同签订结果");
      } else if (this.hetongradio === "1") {
        if (this.fileList.length === 0) {
          this.$message.error("请上传终稿");
        } else {
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
      } else {
        this.$refs.formhetong.validate(valid => {
          if (!valid) {
            return this.$message.error("请输入签订失败原因");
          }
          this.$confirm("确定提交任务吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              this.$message.success("任务提交成功");
            })
            .catch(() => {});
        });
      }
    },
    // 文件移除
    handleRemove(file) {
      console.log(file);
    },
    // 文件移除之前提示
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style>
.approvalbig {
  height: 100%;
}
.approvalbig .icon-gongsimingcheng0.appcon {
  font-size: 32px;
  color: #1ac7ff;
}
.approvalContent {
  height: 100%;
  margin-top: 6px;
}
.jiafang-title {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  /* margin-bottom: 4px; */
  background-color: #fff;
  padding-left: 20px;
}
.jiafang-title .icon-jiafangyifang {
  font-size: 28px;
  color: #1ac7ff;
  vertical-align: middle;
}
.jiafang-title-title {
  display: inline-block;
  font-size: 22px;
  margin-left: 10px;
  vertical-align: middle;
  color: #515b6f;
}
.jiafang-content {
  background-color: #fff;
  padding: 1px 0 20px 20px;
  margin-top: 4px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  margin-bottom: 6px;
}
.approval-information-box {
  margin-top: 9px;
  position: relative;
}
.information-box {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  max-width: 480px;
  border-bottom: 1px dashed #cacaca;
  color: #7e8b8e;
  font-size: 18px;
}
.information-boxa {
  position: absolute;
  color: #7e8b8e;
  top: 0px;
  left: 420px;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  max-width: 490px;
  border-bottom: 1px dashed #cacaca;
  font-size: 18px;
}
.information-box-font {
  color: #000;
  font-size: 16px;
}
.icon-hetong {
  font-size: 24px;
  color: #1ac7ff;
  vertical-align: middle;
}
.hetong-centent {
  margin-top: 4px;
  height: 100%;
  background-color: #fff;
  border-top: 1px solid #dae9f9;
  padding-left: 20px;
  padding-top: 1px;
}
.hetong-cententbox {
  height: 100%;
  overflow: auto;
}
.approvaldata-box {
  position: relative;
  top: -2px;
  display: inline-block;
}
.approvaldata-box .el-input__icon.el-range__icon.el-icon-date {
  display: none;
}
.approvaldata-box .el-range-input {
  width: 80px;
}
.approvaldata-box .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 210px;
}
.approvaldata-box .el-input__inner {
  border: none;
}
.approvaldata-box .el-range-editor--small .el-range-input {
  font-size: 14px;
}
.approvaldata-box .el-range-editor--small .el-range-separator {
  line-height: 28px;
}
.approvaldata-box .el-range-editor.el-input__inner {
  padding: 3px;
}
.information-box-fontt {
  color: #409eff;
  font-size: 16px;
}
.information-box-input {
  position: relative;
  top: -1px;
  width: 200px;
  display: inline-block;
  box-sizing: border-box;
}
.information-box-input .el-input__inner {
  border: 0px;
  font-size: 18px;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
}
.information-box-input .el-input__inner:hover {
  border: 1px solid #dcdfe6;
  padding-left: 14px;
}
.information-box-input .el-input__inner:focus {
  border: 1px solid #409eff;
  padding-left: 14px;
}
.information-boxq {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  /* max-width: 480px; */
  /* border-bottom: 1px dashed #cacaca; */
  color: #7e8b8e;
  font-size: 18px;
  vertical-align: top;
}
.information-boxw {
  display: inline-block;
  vertical-align: top;
  width: 500px;
  /* margin-left: 16px; */
  position: relative;
  top: -7px;
}
.approval-information-boxe {
  margin-top: 9px;
  position: relative;
  height: 150px;
}
.approval-btn-two {
  position: absolute;
  bottom: 10px;
  right: 350px;
}
.chugao-btn {
  margin-bottom: 4px;
}
.chugao-box {
  height: 90px;
  overflow: auto;
}
.information-boxw .el-tabs__header.is-top {
  margin-bottom: 4px;
}
.chugao-list {
  position: relative;
  font-size: 16px;
  line-height: 16px;
  margin-top: 6px;
  /* border-bottom: 1px solid #000; */
}
.chugao-name {
  vertical-align: middle;
}
.chugao-icon {
  position: absolute;
  right: 0;
  font-size: 18px;
  vertical-align: middle;
}
.hetong-isbtn {
  display: inline-block;
  margin-left: 20px;
}
.zhonggao-box .el-upload-list.el-upload-list--text {
  overflow: auto !important;
  height: 100px !important;
}
.zhonggao-box .el-upload-list.el-upload-list--text::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.zhonggao-box .el-upload-list.el-upload-list--text::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.zhonggao-box .el-upload-list.el-upload-list--text::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(202, 12, 12, 0.2);
}
.textaree {
  margin-top: 10px;
  width: 280px;
}
</style>

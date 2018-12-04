<template>
  <div class="approvalbig">
    <div>
      <div class="appcom-top">
        <i id="appfor-icon" class="iconfont icon-gongsimingcheng"></i>
        <i class="font">{{taskinfo.taskname}}任务</i>
      </div>
      <div class="statuss">
        <div>
          <div class="statusbox">
            <i class="statusbox-font">负责人：</i>
            <i>{{taskinfo.user}}</i>
          </div>
          <div class="statusbox">
            <i class="statusbox-font">起始日：</i>
            <i>{{taskinfo.starttime}}</i>
          </div>
          <div class="statusbox">
            <i class="statusbox-font">到期日：</i>
            <i>{{taskinfo.endtime}}</i>
          </div>
          <div class="statusbox">
            <i class="statusbox-font">任务状态：</i>
            <i>{{taskinfo.state}}</i>
          </div>
        </div>
        <div class="gong-information-box">
          <span>所属项目：</span>
          <span class="gong-box-font">{{appcompactinfo.proname}}</span>
        </div>
        <div class="taskSliderBox">
          <span>任务进度:</span>
          <div class="Slider">
            <el-slider v-model="$store.state.tasksechedule" :disabled="disable" @change="handletasksechedule"></el-slider>
          </div>
          <span>{{$store.state.tasksechedule}}%</span>
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
            <span class="information-box-font">{{appconbb.company}}</span>
          </div>
          <div class="information-boxa">
            <span>单位地址：</span>
            <span class="information-box-font">{{appconbb.address}}</span>
          </div>
        </div>
        <div class="approval-information-box">
          <div class="information-box">
            <span>联系人：</span>
            <span class="information-box-font">{{appconbb.linkman}}</span>
          </div>
          <div class="information-boxa">
            <span>联系电话：</span>
            <span class="information-box-font">{{appconbb.phone}}</span>
          </div>
        </div>
        <div class="approval-information-box">
          <div class="information-box">
            <span>电子邮箱：</span>
            <span class="information-box-font">{{appconbb.email}}</span>
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
              <span class="information-box-font">{{appcompactinfo.compactname}}</span>
            </div>
            <div class="information-boxa">
              <span>所属项目：</span>
              <span class="information-box-font">{{appcompactinfo.proname}}</span>
            </div>
          </div>
          <div class="approval-information-box">
            <div class="information-box">
              <span>甲方：</span>
              <span class="information-box-font">{{appconbb.company}}</span>
            </div>
            <div class="information-boxa">
              <span>乙方：</span>
              <span class="information-box-font">检测中心</span>
            </div>
          </div>
          <div class="approval-information-box">
            <div class="information-box">
              <span>合同编号：</span>
              <span class="information-box-font">{{appcompactinfo.com_no}}</span>
            </div>
            <div class="information-boxa">
              <span>合同期限：</span>
              <div class="approvaldata-box">
                <el-date-picker
                  v-if="$store.state.dateishow"
                  class="datare"
                  size="small"
                  v-model="$store.state.comtime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <span v-if="$store.state.dateshow" class="information-box-font">{{appcompactinfo.starttime}} 至 {{appcompactinfo.endtime}}</span>
                <i v-if="taskinfo.state !== '已完成'" class="el-icon-edit-outline dateedit" @click="handledateishow"></i>
              </div>
            </div>
          </div>
          <div class="approval-information-box">
            <div class="information-box">
              <span>合同金额：</span>
              <div class="information-box-input">
                <el-input
                  v-if="taskinfo.state !== '已完成'"
                  size="small"
                  placeholder="请输入金额"
                  v-model="appcompactinfo.com_money">
                </el-input>
                <span v-if="taskinfo.state === '已完成'" class="information-box-font">{{appcompactinfo.com_money}}</span>
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
                    <el-button type="primary" size="mini" class="chugao-btn" v-if="taskinfo.state !== '已完成'" @click="creatdraftfile">生成初稿</el-button>
                    <div class="chugao-box scrollbar">
                      <transition-group name="el-zoom-in-center">
                        <div class="chugao-list" v-for="(item, index) in draftfile" :key="index">
                          <i class="el-icon-document"></i>
                          <span class="chugao-name">{{item.filename}}</span>
                          <a :href="item.down_path" :download="item.down_path" class="chugao-icon">
                            <i class="el-icon-download"></i>
                          </a>
                        </div>
                      </transition-group>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="终稿">
                    <div class="zhonggao-box">
                      <el-upload
                        class="upload-demo"
                        ref="upload"
                        accept=".docx, .pdf, .xlsx, .txt, .rar"
                        action="http://192.168.1.186:8888/api/v1.0/uploadcompact"
                        :before-upload="upload"
                        :disable="disable"
                        :on-progress="progress"
                        :show-file-list="false"
                        name="compactfile"
                        :file-list="finalfile"
                        :data="$store.state.filehetongid"
                        :on-success="uploadsuccess"
                        :on-error="uploaderror">
                        <el-button size="mini" type="primary" :disable="disable">点击上传</el-button>
                      </el-upload>
                    </div>
                    <ul class="zhonggaolist-box">
                      <li class="zglist" v-for="(item, index) in $store.state.finalfile" :key="index" v-loading="$store.state.uploadloding">
                        <i class="el-icon-document wendangicon"></i>
                        <span class="zhonggaoname">{{item.name}}</span>
                        <i class="el-icon-circle-check upload-success"></i>
                        <i class="el-icon-close upload-close" @click="handledelete(item)"></i>
                      </li>
                      <li class="zglist" v-show="newfile.name !== ''">
                        <i class="el-icon-document wendangicon"></i>
                        <span class="zhonggaoname">{{newfile.name}}</span>
                        <span class="jindutiao">{{newfile.progress}}%</span>
                        <el-progress v-show="newfile.progress !== 0" :show-text="false" :percentage="newfile.progress" class="zgprogress" :stroke-width="3" color="#409eff"></el-progress>
                      </li>
                    </ul>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="hetong-isbtn" v-if="taskinfo.state !== '已完成'">
              <el-radio v-model="hetongradio" label="签订成功" border size="small" @change="radiochange">签订成功</el-radio>
              <el-radio v-model="hetongradio" label="签订失败" border size="small" @change="radiochange">签订失败</el-radio>
              <el-form :model="formhetong" ref="formhetong" v-if="Isshow">
                <el-form-item prop="why" :rules="[{ required: true, message: '原因不能为空'}]">
                  <el-input
                    class="textaree"
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    placeholder="请输入合同签订失败原因"
                    v-model="formhetong.why">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="approval-btn-two" v-if="taskinfo.state !== '已完成'">
            <el-button type="primary" size="small" @click="handlesave">保存信息</el-button>
            <el-button type="primary" size="small" @click="handletasksubmit">提交任务</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["taskid"],
  data() {
    return {
      hetongradio: "",
      Isshow: false, //合同不通过原因绑定值
      formhetong: {
        why: "" //文本绑定值
      },
      newfile: {
        name: "",
        progress: 0
      } // 上传进度条
    };
  },
  methods: {
    //是否通过显示文本框
    radiochange() {
      if (this.hetongradio === "签订失败") {
        this.Isshow = true;
      } else {
        this.Isshow = false;
      }
    },
    // 保存合同信息
    handlesave() {
      this.$store.dispatch(
        "handlesave",
        this.$store.state.appcompactinfo.com_no
      );
    },
    // 日历组件时间
    // datachange() {
    //   console.log(this.$store.state.comtime);
    // },
    // 提交任务
    handletasksubmit() {
      if (this.hetongradio === "") {
        this.$message.error("请选择合同签订结果");
      } else if (this.hetongradio === "签订成功") {
        if (this.finalfile.length === 0) {
          this.$message.error("请上传终稿");
        } else {
          this.$confirm("确定提交任务吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              const res = await this.$http.put(
                `approvalcontract/${this.taskid}`,
                {
                  state: "签订成功"
                }
              );
              if (res.status === 200) {
                this.$message.success("任务提交成功");
                this.$store.commit("taskhuakuaihidden");
                this.$store.dispatch("loadingMytask", 1);
              } else {
                this.$message.error(res.meg);
              }
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
              const res = await this.$http.put(
                `approvalcontract/${this.taskid}`,
                {
                  state: "签订失败",
                  remarks: this.formhetong.why
                }
              );
              if (res.status === 200) {
                this.$message.success("任务提交成功");
                this.$store.commit("taskhuakuaihidden");
                this.$store.dispatch("loadingMytask", 1);
              } else {
                this.$message.error(res.meg);
              }
            })
            .catch(() => {});
        });
      }
    },
    // 上传之前
    upload(file) {
      this.newfile.name = file.name;
    },
    // 文件上传钩子
    progress(event) {
      let percent = parseInt(event.percent);
      this.newfile.progress = percent;
    },
    // 上传文件删除
    handledelete(item) {
      this.$confirm(`确定删除 ${item.name} 吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`dropfinalcompact/${item.id}`);
          if (res.status === 200) {
            this.$store.dispatch(
              "handleuploaddata",
              this.$store.state.appcompactinfo.com_no
            );
            this.$message.success("删除成功");
          }
        })
        .catch(() => {});
    },
    // 文件上传成功
    uploadsuccess(response) {
      if (response.status === 200) {
        this.$store.state.uploadloding = true;
        this.newfile.name = "";
        this.newfile.progress = 0;
        this.$message.success("上传成功");
        this.$store.dispatch(
          "handleuploaddata",
          this.$store.state.appcompactinfo.com_no
        );
      } else {
        this.$message.error(response.msg);
      }
    },
    // 文件上传失败
    uploaderror() {
      this.$message.error("文件上传失败");
    },
    // 任务进度改变
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    },
    // 合同签订时间隐藏与显示
    handledateishow() {
      this.$store.state.dateshow = false;
      this.$store.state.dateishow = true;
    },
    // 生成初稿
    creatdraftfile() {
      this.$store.dispatch(
        "handlecreatdraftfile",
        this.$store.state.appcompactinfo.com_no
      );
    }
  },
  computed: mapState({
    taskinfo: "taskinfo",
    appconbb: "appconbb",
    appcompactinfo: "appcompactinfo",
    draftfile: "draftfile",
    finalfile: "finalfile",
    disable: "disable"
  })
};
</script>

<style>
.approvalbig {
  height: 100%;
}
.appcom-top {
  height: 44px;
  line-height: 44px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  background-color: #fff;
  padding-left: 20px;
  position: relative;
  margin-bottom: 4px;
}
.appcom-top .font {
  position: absolute;
  top: 1px;
  left: 60px;
}
#appfor-icon {
  font-size: 32px;
  color: #1ac7ff;
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
  height: 44px;
  line-height: 44px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
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
  width: 90px;
}
.approvaldata-box .el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 230px;
}
.approvaldata-box .el-input__inner {
  height: 30px;
}
.approvaldata-box .el-range-editor--small .el-range-separator {
  line-height: 24px !important;
}
.approvaldata-box .el-range-editor--small .el-range-input {
  font-size: 16px;
}
.approvaldata-box .el-range-editor--small .el-range-separator {
  line-height: 28px;
}
.approvaldata-box .el-range-editor.el-input__inner {
  padding: 2px;
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
  border: none;
  font-size: 16px;
  height: 28px;
  line-height: 32px;
  padding: 0 4px;
  box-sizing: border-box;
}
.information-box-input .el-input__inner:hover {
  border: 1px solid #409eff;
  padding-left: 14px;
  padding: 0 3px;
}
.information-box-input .el-input__inner:focus {
  border: 1px solid #409eff;
  padding: 0 3px;
}
.dateedit {
  color: #e6a23c;
  font-size: 20px;
  cursor: pointer;
  margin-left: 6px;
  vertical-align: middle;
}
.information-boxq {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  color: #7e8b8e;
  font-size: 18px;
  vertical-align: top;
}
.information-boxw {
  display: inline-block;
  vertical-align: top;
  width: 500px;
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
  height: 25px;
  line-height: 25px;
  margin-top: 5px;
}
.chugao-list:hover {
  background-color: #f5f7fa;
}
.chugao-name {
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  margin-left: 5px;
  cursor: pointer;
}
.chugao-name:hover {
  color: #409eff;
}
.chugao-icon {
  position: absolute;
  right: 6px;
  font-size: 18px;
  vertical-align: middle;
}
.zhonggaolist-box {
  padding-left: 0;
  margin: 6px 0 0 0;
  height: 100px;
  overflow: auto;
}
.wendangicon {
  font-size: 16px;
  margin-right: 6px;
}
.zglist {
  height: 28px;
  position: relative;
  line-height: 26px;
  margin-top: 4px;
}
.zglist:hover {
  background-color: #f5f7fa;
}
.zglist:hover .upload-success {
  display: none;
}
.zglist:hover .upload-close {
  display: block;
  font-size: 14px;
  position: absolute;
  top: 8px;
  right: 4px;
  cursor: pointer;
}
.zhonggaoname {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.zhonggaoname:hover {
  color: #409eff;
}
.zgprogress {
  position: absolute;
  width: 100%;
  left: 0px;
  top: 24px;
  z-index: 2px;
}
.upload-success {
  color: #67c23a;
  font-size: 14px;
  position: absolute;
  top: 8px;
  right: 4px;
}
.upload-close {
  display: none;
}
.jindutiao {
  font-size: 14px;
  position: absolute;
  right: 0;
  color: #606266;
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
.flip-list {
  top: -25px;
}
</style>

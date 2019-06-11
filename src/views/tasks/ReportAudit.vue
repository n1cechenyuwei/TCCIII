<template>
  <div class="height-auto">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng"></i>
      <i class="font">{{taskinfo.taskname}}任务</i>
    </div>
    <div class="ra-content">
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
      <div>
        <div class="gong-information-box">
          <span>所属项目：</span>
          <span class="gong-box-font">{{taskinfo.projectname}}</span>
        </div>
      </div>
      <div class="taskSliderBox">
        <span>任务进度:</span>
        <div class="Slider">
          <el-slider v-model="$store.state.tasksechedule" :disabled="disable" @change="handletasksechedule"></el-slider>
        </div>
        <span>{{$store.state.tasksechedule}}%</span>
      </div>
      <div class="ra-shebei-box">
        <div class="ra-information-box">
          <div class="information-box">
            <span>设备名称：</span>
            <span class="information-box-font">{{deviceinfo.devicename}}</span>
          </div>
          <div class="information-box2">
            <span>设备编号：</span>
            <span class="information-box-font">{{deviceinfo.id}}</span>
          </div>
        </div>
        <div class="ra-information-box">
          <div class="information-box">
            <span>硬件类型：</span>
            <span class="information-box-font">{{deviceinfo.devicetype}}</span>
          </div>
          <div class="information-box2">
            <span>设备序列号：</span>
            <span class="information-box-font">{{deviceinfo.serialnumber}}</span>
          </div>
        </div>
        <div class="ra-information-box">
          <div class="information-box">
            <span>送检人：</span>
            <span class="information-box-font">{{deviceinfo.deliverer}}</span>
          </div>
          <div class="information-box2">
            <span>送检时间：</span>
            <span class="information-box-font">{{deviceinfo.deliver_time}}</span>
          </div>
        </div>
        <div class="ragongsi-box">
          <div class="ragongsi-title">受检单位信息</div>
          <div class="ra-information-box">
            <div class="information-box">
              <span>单位名称：</span>
              <span class="information-box-font">{{appconbb.company}}</span>
            </div>
            <div class="information-box2">
              <span>单位地址：</span>
              <span class="information-box-font">{{appconbb.address}}</span>
            </div>
          </div>
          <div class="ra-information-box">
            <div class="information-box">
              <span>邮箱：</span>
              <span class="information-box-font">{{appconbb.email}}</span>
            </div>
            <div class="information-box2">
              <span>电话：</span>
              <span class="information-box-font">{{appconbb.phone}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rabaogao-box">
        <div><i id="jcbaogao" class="iconfont icon-jiancebaogao"></i><span class="rabaogao-title">检测报告</span></div>
        <div class="ratabs-box">
          <el-tabs v-model="raactive">
            <el-tab-pane label="报告初稿" name="first">
              <el-button type="primary" :disabled="disable" size="mini" class="mt6" @click="createdraft">生成初稿</el-button>
              <div class="ratabs-minibox">
                <div class="ccbox">
                  <transition-group name="el-zoom-in-center">
                    <div class="rachugao-list" v-for="(item, index) in draft_report" :key="index">
                      <i class="el-icon-document wendangicon"></i>
                      <span>{{item.name}}</span>
                      <a :href="item.path" :download="item.path"><i class="el-icon-download radowmload"></i></a>
                    </div>
                  </transition-group>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="报告终稿" name="second">
              <div class="ratabs-minibox">
                <el-upload
                  class="upload-demo"
                  ref="raupload"
                  :action="$store.state.baseurl + 'uploaddefinalreport'"
                  accept=".docx, .pdf, .xlsx, .txt"
                  :before-upload="upload"
                  :disabled="disable || uploadbtn"
                  :on-progress="progress"
                  :show-file-list="false"
                  name="filename"
                  :headers="httpheader"
                  :file-list="final_report"
                  :data="$store.state.uptaskid"
                  :on-success="uploadsuccess"
                  :on-error="uploaderror">
                  <el-button :disabled="disable || uploadbtn" size="mini" type="primary">点击上传</el-button>
                </el-upload>
                <div v-loading="$store.state.ctuploading" element-loading-text="文件上传中请稍后">
                  <ul class="ralist-box">
                    <li class="zglist" v-for="(item, index) in $store.state.final_report" :key="index">
                      <i class="el-icon-document wendangicon"></i>
                      <span class="zhonggaoname">{{item.name}}</span>
                      <i class="el-icon-circle-check upload-success"></i>
                      <i id="upload-close3" class="el-icon-circle-close" @click="handledelete(item)"></i>
                    </li>
                    <li class="zglist" v-if="newfile.name !== ''">
                      <i class="el-icon-document wendangicon"></i>
                      <span class="zhonggaoname">{{newfile.name}}</span>
                      <span class="jindutiao">{{newfile.progress}}%</span>
                      <el-progress v-if="newfile.progress !== 0" :show-text="false" :percentage="newfile.progress" class="zgprogress" :stroke-width="3" color="#409eff"></el-progress>
                    </li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="eqconfig-bot-btn" v-if="!disable">
      <el-button size="small" type="primary" @click="eqconfigsubmit">提交任务</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["taskid", "ht"],
  data() {
    return {
      httpheader: {
        token: ""
      },
      raactive: "first",
      newfile: {
        name: "",
        progress: 0
      } // 上传进度条
    };
  },
  methods: {
    token() {
      const token = sessionStorage.getItem("token");
      this.httpheader.token = token;
    },
    // 提交任务
    eqconfigsubmit() {
      this.$confirm("确定提交任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (this.final_report.length === 0) {
            this.$message.error("请先上传报告");
          } else {
            const res = await this.$http.put(`reportaudit/${this.taskid}`);
            if (res.data.status === 200) {
              this.$message.success("提交成功");
              this.$store.commit("taskhuakuaihidden");
              if (this.ht === "mytask") {
                this.$store.dispatch("loadingMytask", 1);
              } else if (this.ht === "alltask") {
                this.$store.dispatch("loadingAlltask", 1);
              }
              this.$store.dispatch("hometask");
            } else {
              this.$message.error(res.data.msg);
            }
          }
        })
        .catch(() => {});
    },
    // 生成初稿按钮点击
    createdraft() {
      this.$store.commit("opencreatedraft");
      this.$store.dispatch("handlecreatedraft", this.deviceinfo.id);
    },
    // 上传之前
    upload(file) {
      this.newfile.name = file.name;
    },
    // 文件上传时的钩子
    progress(event) {
      this.$store.commit("stopupbtn");
      let percent = parseInt(event.percent);
      this.newfile.progress = percent;
      if (this.newfile.progress === 100) {
        this.$store.commit("startctuploading");
      }
    },
    // 文件删除
    handledelete(item) {
      if (this.disable) {
        this.$message.warning("任务已提交无法删除文件");
      } else {
        this.$confirm(`确定删除 ${item.name} 吗`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const res = await this.$http.delete(`report/${item.id}`);
            if (res.data.status === 200) {
              this.$store.dispatch("rauploadlist", this.deviceinfo.id);
              this.$message.success("删除成功");
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(() => {});
      }
    },
    // 文件上传成功
    uploadsuccess(response) {
      if (response.data.status === 200) {
        setTimeout(() => {
          this.newfile.name = "";
          this.newfile.progress = 0;
          this.$store.dispatch("rauploadlist", this.deviceinfo.id);
          this.$message.success("上传成功");
          this.$store.commit("endctuploading");
        }, 500);
      } else {
        setTimeout(() => {
          this.newfile.name = "";
          this.newfile.progress = 0;
          this.$store.dispatch("rauploadlist", this.deviceinfo.id);
          this.$message.error(response.data.msg);
          this.$store.commit("endctuploading");
        }, 500);
      }
    },
    // 文件上传失败
    uploaderror() {
      this.$store.dispatch("rauploadlist", this.deviceinfo.id);
      this.$store.commit("endctuploading");
      this.$message.error("文件上传失败");
    },
    // 超出文件限制
    handleExceed(files) {
      this.$message.warning(
        `当前限制选择 3 个文件，
        本次选择了 ${files.length} 个文件，请重新选择上传文件数量`
      );
    },
    // 更改任务进度
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    }
  },
  created() {
    this.token();
  },
  computed: mapState({
    taskinfo: "taskinfo",
    appconbb: "appconbb",
    deviceinfo: "deviceinfo",
    final_report: "final_report",
    draft_report: "draft_report",
    disable: "disable",
    uploadbtn: "uploadbtn"
  })
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
  margin-top: 6px;
  height: 200px;
}
.ccbox {
  height: 170px;
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
.ralist-box {
  padding-left: 0;
  margin: 6px 0 0 0;
  height: 180px;
  overflow: auto;
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
.zglist:hover #upload-close3 {
  display: block;
}
#upload-close3 {
  font-size: 14px;
  color: #f56c6c;
  position: absolute;
  top: 8px;
  right: 4px;
  cursor: pointer;
  display: none;
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
.zglist:hover #upload-close3 {
  display: block;
}
#upload-close3 {
  font-size: 14px;
  color: #f56c6c;
  position: absolute;
  top: 8px;
  right: 4px;
  cursor: pointer;
  display: none;
}
</style>

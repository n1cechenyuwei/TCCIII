<template>
  <div class="concard">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng"></i>
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
        <span class="gong-box-font">{{taskinfo.projectname}}</span>
      </div>
      <div class="taskSliderBox">
        <span>任务进度:</span>
        <div class="Slider">
          <el-slider v-model="$store.state.tasksechedule" :disabled="disable" @change="handletasksechedule"></el-slider>
        </div>
        <span>{{$store.state.tasksechedule}}%</span>
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
          <span class="information-box-font">{{out_entrust_info.companyname}}</span>
        </div>
        <el-tooltip :content="out_entrust_info.address" placement="top">
          <div class="information-box2">
            <span>单位地址：</span>
            <span class="information-box-font">{{out_entrust_info.address}}</span>
          </div>
        </el-tooltip>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>邮政编码：</span>
          <span class="information-box-font">{{out_entrust_info.postalcode}}</span>
        </div>
        <div class="information-box2">
          <span>联系电话：</span>
          <span class="information-box-font">{{out_entrust_info.linkphone}}</span>
        </div>
      </div>
    </div>
    <div class="EqconfigContent-title">
      <i id="waiwei-icon" class="iconfont icon-hetong"></i>
      <i class="EqconfigContentfont">外委设备信息</i>
    </div>
    <div class="waiweixinxi-box">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备名称：</span>
          <span class="information-box-font">{{deviceinfo.device_name}}</span>
        </div>
        <div class="information-box2">
          <span>设备型号：</span>
          <span class="information-box-font">{{deviceinfo.device_model}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备类型：</span>
          <span class="information-box-font">{{deviceinfo.device_type}}</span>
        </div>
        <div class="information-box2">
          <span>设备序列号：</span>
          <span class="information-box-font">{{deviceinfo.device_serialnumber}}</span>
        </div>
      </div>
      <div class="upload-box">
        <span>外委报告：</span>
        <div class="upup">
          <el-upload
            class="upload-demo"
            ref="ctupload"
            accept=".docx, .pdf, .xlsx, .txt"
            :action="$store.state.baseurl + 'dereport'"
            :before-upload="upload"
            :disabled="disable || uploadbtn"
            :on-progress="progress"
            :show-file-list="false"
            name="filename"
            :file-list="ctupfilelist"
            :data="$store.state.uptaskid"
            :on-success="uploadsuccess"
            :on-error="uploaderror">
            <el-button size="mini" type="primary" :disabled="disable || uploadbtn">上传报告</el-button>
          </el-upload>
          <div v-loading="$store.state.ctuploading" element-loading-text="文件上传中请稍后">
            <ul class="ctlist-box">
              <li class="zglist" v-for="(item, index) in $store.state.ctupfilelist" :key="index">
                <i class="el-icon-document wendangicon"></i>
                <span class="zhonggaoname">{{item.name}}</span>
                <i class="el-icon-circle-check upload-success"></i>
                <i id="upload-close2" class="el-icon-circle-close" @click="handledelete(item)"></i>
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
      </div>
        <el-button v-if="!disable" size="small" type="primary" @click="eqconfigsubmit" class="contractor-btn">提交任务</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["taskid"],
  data() {
    return {
      newfile: {
        name: "",
        progress: 0
      } // 上传进度条
    };
  },
  methods: {
    // 点击上传的文件实现下载
    // handlePreview(val) {
    // window.open('http://192.168.1.186:8888/api/v1.0/download/1');
    // console.log(val);
    // var _form = document.createElement("FORM");
    // _form.setAttribute("method", "get");
    // _form.setAttribute(
    //   "action",
    //   "http://192.168.1.186:8888/api/v1.0/download/1"
    // );
    // document.body.appendChild(_form);
    // _form.submit();
    // },
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
            if (res.status === 200) {
              this.$store.dispatch("ctuploadlist", this.deviceinfo.device_id);
              this.$message.success("删除成功");
            }
          })
          .catch(() => {});
      }
    },
    // 文件上传成功
    uploadsuccess(response) {
      if (response.status === 200) {
        setTimeout(() => {
          this.newfile.name = "";
          this.newfile.progress = 0;
          this.$store.dispatch("ctuploadlist", this.deviceinfo.device_id);
          this.$message.success("上传成功");
          this.$store.commit("endctuploading");
        }, 500);
      } else {
        setTimeout(() => {
          this.newfile.name = "";
          this.newfile.progress = 0;
          this.$store.dispatch("ctuploadlist", this.deviceinfo.device_id);
          this.$message.error(response.msg);
          this.$store.commit("endctuploading");
        }, 500);
      }
    },
    // 文件上传失败
    uploaderror() {
      this.$message.error("文件上传失败");
      this.$store.dispatch("ctuploadlist", this.deviceinfo.device_id);
      this.$store.commit("endctuploading");
    },
    // 提交任务
    eqconfigsubmit() {
      this.$confirm("确定提交任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (this.ctupfilelist.length === 0) {
            this.$message.error("请先上传报告");
          } else {
            const res = await this.$http.put(`contractor/${this.taskid}`);
            if (res.status === 200) {
              this.$message.success("提交成功");
              this.$store.commit("taskhuakuaihidden");
              this.$store.dispatch("loadingMytask", 1);
              this.$store.dispatch("hometask");
            } else {
              this.$message.error(res.msg);
            }
          }
        })
        .catch(() => {});
    },
    // 更改任务进度
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    }
  },
  computed: mapState({
    taskinfo: "taskinfo",
    deviceinfo: "contradeviceinfo",
    out_entrust_info: "out_entrust_info",
    ctupfilelist: "ctupfilelist",
    disable: "disable",
    uploadbtn: "uploadbtn"
  })
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
.ctlist-box {
  padding-left: 0;
  margin: 6px 0 0 0;
  height: 200px;
  overflow: auto;
  width: 560px;
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
.zglist:hover #upload-close2 {
  display: block;
}
#upload-close2 {
  font-size: 14px;
  color: #f56c6c;
  position: absolute;
  top: 8px;
  right: 4px;
  cursor: pointer;
  display: none;
}
</style>

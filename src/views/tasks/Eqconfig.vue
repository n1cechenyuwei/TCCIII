<template>
  <div class="eqconfig-big">
    <div>
      <div class="applyfor-top">
        <i id="eqconfig-icon" class="iconfont icon-gongsimingcheng"></i>
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
          <div class="statusbox6">
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
    </div>
    <div class="EqconfigContent-title">
      <i id="shebeixinxi-icon" class="iconfont icon-shebeixinxi"></i>
      <i class="EqconfigContentfont">设备信息</i>
    </div>
    <div class="eqconfig-shebei-content">
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备名称：</span>
          <span class="information-box-font">{{deviceinfo.divicename}}</span>
        </div>
        <div class="information-box2">
          <span>设备类型：</span>
          <span class="information-box-font">{{deviceinfo.devicetype}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>硬件型号：</span>
          <span class="information-box-font">{{deviceinfo.model}}</span>
        </div>
        <div class="information-box2">
          <span>设备序列号：</span>
          <span class="information-box-font">{{deviceinfo.serialnumber}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备编号：</span>
          <span class="information-box-font">{{deviceinfo.id}}</span>
        </div>
        <div class="information-box2">
          <span>SIP：</span>
          <span class="information-box-font">{{workbenchinfo.de_sipid}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>登录用户名：</span>
          <span class="information-box-font">admin123</span>
        </div>
        <div class="information-box2">
          <span>登录密码：</span>
          <span class="information-box-font">Admin123</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>注册用户名：</span>
          <span class="information-box-font">admin1234</span>
        </div>
        <div class="information-box2">
          <span>注册密码：</span>
          <span class="information-box-font">Admin1234</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>IP地址：</span>
          <span class="information-box-font">{{workbenchinfo.de_ip}}</span>
        </div>
        <div class="information-box2">
          <span>端口：</span>
          <span class="information-box-font">{{workbenchinfo.de_port}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>设备域：</span>
          <span class="information-box-font">{{workbenchinfo.de_field}}</span>
        </div>
        <div class="information-box2">
          <span>设备密码：</span>
          <span class="information-box-font">{{workbenchinfo.de_password}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>服务器IP：</span>
          <span class="information-box-font">{{workbenchinfo.server_1_ip}}</span>
        </div>
        <div class="information-box2">
          <span>备用服务器IP：</span>
          <span class="information-box-font">{{workbenchinfo.server_2_ip}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>服务器端口：</span>
          <span class="information-box-font">{{workbenchinfo.server_1_port}}</span>
        </div>
        <div class="information-box2">
          <span>备用服务器端口：</span>
          <span class="information-box-font">{{workbenchinfo.server_2_port}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>服务器SIP：</span>
          <span class="information-box-font">{{workbenchinfo.server_1_sip}}</span>
        </div>
        <div class="information-box2">
          <span>备用服务器SIP：</span>
          <span class="information-box-font">{{workbenchinfo.server_2_sip}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>服务器设备域：</span>
          <span class="information-box-font">{{workbenchinfo.server_1_field}}</span>
        </div>
        <div class="information-box2">
          <span>备用服务器设备域：</span>
          <span class="information-box-font">{{workbenchinfo.server_2_field}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>服务器密码：</span>
          <span class="information-box-font">{{workbenchinfo.server_1_password}}</span>
        </div>
        <div class="information-box2">
          <span>备用服务器密码：</span>
          <span class="information-box-font">{{workbenchinfo.server_2_password}}</span>
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
          <span class="information-box-font">{{appconbb.company}}</span>
        </div>
        <div class="information-box2">
          <span>电子邮箱：</span>
          <span class="information-box-font">{{appconbb.email}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>联系人：</span>
          <span class="information-box-font">{{appconbb.linkman}}</span>
        </div>
        <div class="information-box2">
          <span>联系电话：</span>
          <span class="information-box-font">{{appconbb.phone}}</span>
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
          <span class="information-box-font">{{workbenchinfo.bench_id}}</span>
        </div>
        <div class="information-box2">
          <span>IP地址：</span>
          <span class="information-box-font">{{workbenchinfo.de_ip}}</span>
        </div>
      </div>
      <div class="eqconfig-information-box">
        <div class="information-box">
          <span>SIP：</span>
          <span class="information-box-font">{{workbenchinfo.de_sipid}}</span>
        </div>
        <div class="information-box2">
          <span>端口：</span>
          <span class="information-box-font">{{workbenchinfo.de_port}}</span>
        </div>
      </div>
      <div class="eqconfig-btn">
        <el-button v-if="!disable" size="small" type="primary" @click="eqconfigsubmit">提交任务</el-button>
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
      // taskvalue: 0 // 任务进度
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
          const res = await this.$http.put(`eqconfig/${this.taskid}`);
          if (res.status === 200) {
            this.$message.success("提交成功");
            this.$store.commit("taskhuakuaihidden");
            this.$store.dispatch("loadingMytask", 1);
            this.$store.dispatch("hometask");
          } else {
            this.$message.error(res.meg);
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
    appconbb: "appconbb",
    deviceinfo: "deviceinfo",
    workbenchinfo: "workbenchinfo",
    disable: "disable"
  })
};
</script>

<style>
.eqconfig-big {
  height: 890px;
  overflow-y: auto;
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
  height: 200px;
}
.eqconfig-btn {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>

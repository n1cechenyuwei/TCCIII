<template>
  <div class="cardcardcard">
    <div>
      <div class="applyfor-top">
        <i id="appfor-icon" class="iconfont icon-gongsimingcheng0"></i>
        <i class="font">{{appfordata.taskname}}</i>
      </div>
      <div class="statuss">
        <div>
          <div class="statusbox">
            <i class="statusbox-font">负责人：</i>
            <i>{{appfordata.user}}</i>
          </div>
          <div class="statusbox">
            <i class="statusbox-font">起始日：</i>
            <i>{{appfordata.starttime}}</i>
          </div>
          <div class="statusbox">
            <i class="statusbox-font">到期日：</i>
            <i>{{appfordata.endtime}}</i>
          </div>
          <div class="statusbox">
            <i class="statusbox-font">任务状态：</i>
            <i :class="{warning: (appfordata.state === '超时')}">{{appfordata.state}}</i>
          </div>
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
    <div class="applyforContent">
      <div class="applyforContent-title">
        <i class="iconfont icon-gongsixinxi"></i>
        <i class="applyforContentfont">公司信息</i>
      </div>
      <div class="applyforContent-information">
        <div class="applyfor-information-box">
          <div class="information-box">
            <span>单位名称：</span>
            <span class="information-box-font">{{appforcompany.company}}</span>
          </div>
          <div class="information-box2">
            <span>营业执照：</span>
            <i class="iconfont icon-yingyezhizhao" @click="$store.commit('openyyzz')"></i>
          </div>
        </div>
        <div class="applyfor-information-box">
          <div class="information-box">
            <span>单位地址：</span>
            <span class="information-box-font">{{appforcompany.address}}</span>
          </div>
          <div class="information-box2">
            <span>联系人：</span>
            <span class="information-box-font">{{appforcompany.linkman}}</span>
          </div>
        </div>
        <div class="applyfor-information-box">
          <div class="information-box">
            <span>联系电话：</span>
            <span class="information-box-font">{{appforcompany.phone}}</span>
          </div>
          <div class="information-box2">
            <span>电子邮箱：</span>
            <span class="information-box-font">{{appforcompany.email}}</span>
          </div>
        </div>
        <div class="applyfor-information-box">
          <div class="information-box">
            <span>法定代表人：</span>
            <span class="information-box-font">{{appforcompany.legalperson}}</span>
          </div>
          <div class="information-box2">
            <span>法人联系方式：</span>
            <span class="information-box-font">{{appforcompany.legalpersonphone}}</span>
          </div>
        </div>
        <div class="applyfor-information-box"> 
          <div class="information-box">
            <span>纳税人识别号：</span>
            <span class="information-box-font">{{appforcompany.identifynumber}}</span>
          </div>
          <div class="information-box2">
            <span>检测目的：</span>
            <span class="information-box-font">{{appforcompany.testtarget}}</span>
          </div>
        </div>
        <div class="applyfor-information-box"> 
          <div class="information-box3">
            <span>设备信息：</span>
            <el-button size="small" type="primary" class="informationBtn" @click="$store.dispatch('applyEquipment', appforcompany.apply_id)">查看详情</el-button>
          </div>
          <div class="information-box2">
            <span>审批状态：</span>
            <span class="information-box-font">{{appforcompany.approve_state}}</span>
          </div>
        </div>
        <div class="applyfor-information-box4" v-if="appfordata.state !== '已完成'">
          <el-radio v-model="radio" label="通过" border size="small" @change="radiochange">通过</el-radio>
          <el-radio v-model="radio" label="未通过" border size="small" @change="radiochange">不通过</el-radio>
          <el-form :model="formInline" ref="formInline" v-if="Isshow">
            <el-form-item prop="why" :rules="[{ required: true, message: '原因不能为空'}]">
              <el-input
                class="textar"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4}"
                placeholder="请输入不通过原因"
                v-model="formInline.why">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="appfordata.state !== '已完成'" class="eqconfig-bot-btn">
          <el-button type="primary" size="small" @click="objsubmit">提交任务</el-button>
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
      tasksechedule: 0, //任务进度绑定值
      radio: "", //是否通过绑定值
      Isshow: false, //是否显示文本框
      formInline: {
        why: "" //文本绑定值
      }
    };
  },
  methods: {
    //是否通过显示文本框
    radiochange() {
      if (this.radio === "未通过") {
        this.Isshow = true;
      } else {
        this.Isshow = false;
      }
    },
    //提交任务
    objsubmit() {
      if (this.radio === "") {
        this.$message.error("请选择审核结果");
      } else if (this.radio === "通过") {
        this.$confirm("确定提交任务吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const res = await this.$http.put(`applyfor/${this.taskid}`, {
              state: "通过"
            });
            if (res.status === 200) {
              this.$message.success("任务提交成功");
              this.$store.commit("taskhuakuaihidden");
              this.$store.dispatch("loadingMytask", 1);
            } else {
              this.$message.error(res.meg);
            }
          })
          .catch(() => {});
      } else {
        this.$refs.formInline.validate(valid => {
          if (!valid) {
            return this.$message.error("请输入审核不通过原因");
          }
          this.$confirm("确定提交任务吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(async () => {
              const res = await this.$http.put(`applyfor/${this.taskid}`, {
                state: "通过",
                remarks: this.formInline.why
              });
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
    // 任务进度改变
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    }
  },
  computed: mapState({
    appfordata: "appfordata",
    appforcompany: "appforcompany",
    disable: "disable"
  })
};
</script>

<style>
.cardcardcard {
  height: 100%;
}
#appfor-icon {
  font-size: 32px;
  color: #1ac7ff;
}
.applyforContent {
  height: 700px;
}
.applyforContent-title {
  height: 54px;
  line-height: 54px;
  background-color: #fff;
  padding-left: 24px;
  margin-top: 10px;
  margin-bottom: 4px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.icon-gongsixinxi {
  font-size: 22px;
  color: #1ac7ff;
}
.applyforContentfont {
  font-size: 22px;
  color: #4d5d71;
  margin-left: 12px;
}
.applyforContent-information {
  background-color: #fff;
  border-top: 1px solid #dae9f9;
  height: 100%;
  padding-left: 35px;
}
.applyfor-information-box {
  margin-top: 20px;
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
.information-box2 {
  position: absolute;
  color: #7e8b8e;
  top: 0px;
  left: 490px;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  max-width: 450px;
  border-bottom: 1px dashed #cacaca;
  font-size: 18px;
}
.information-box3 {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  max-width: 480px;
  color: #7e8b8e;
  font-size: 18px;
}
.information-box-font {
  color: #000;
  font-size: 16px;
}
.icon-yingyezhizhao {
  color: #19c6ff;
  font-size: 22px;
  cursor: pointer;
}
.informationBtn {
  vertical-align: top;
}
.applyfor-information-box4 {
  margin-top: 10px;
  padding-right: 20px;
}
.textar {
  margin-top: 5px;
  width: 790px;
}
.applyfor-btn-obj {
  margin-left: 420px;
}
</style>

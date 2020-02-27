<template>
  <div class="putbig">
    <div>
      <div class="applyfor-top">
        <i id="put-icon" class="iconfont icon-gongsimingcheng"></i>
        <i class="font task_title">{{taskinfo.taskname}}任务</i>
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
        <div>
          <div class="gong-information-box">
            <span>所属项目：</span>
            <span class="information-box-font">{{taskinfo.projectname}}</span>
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
    <div class="shoujian-title">
      <i class="iconfont icon-jiafangyifang"></i>
      <span>受检单位信息</span>
    </div>
    <div class="shoujian-content">
      <div class="applyfor-information-box">
        <div class="information-box-one">
          <span>单位名称：</span>
          <span class="information-box-font">{{appconbb.company}}</span>
        </div>
        <el-tooltip :content="appconbb.address" placement="top">
          <div class="information-box2-one">
            <span>单位地址：</span>
            <span class="information-box-font">{{appconbb.address}}</span>
          </div>
        </el-tooltip>
      </div>
      <div class="applyfor-information-box">
        <div class="information-box-one">
          <span>联系人：</span>
          <span class="information-box-font">{{appconbb.linkman}}</span>
        </div>
        <div class="information-box2-one">
          <span>联系电话：</span>
          <span class="information-box-font">{{appconbb.phone}}</span>
        </div>
      </div>
    </div>
    <div class="shoujian-title">
      <i class="iconfont icon-shebeixinxi"></i>
      <span>受检设备信息</span>
    </div>
    <div class="shebei-content">
      <div class="op-shebei-title">
        <div class="title-box-op">
          <i class="iconfont icon-iconfont lingxing"></i>
          <span class="shebifont">待入库：</span>
          <span class="shebeinumber daichuku">{{$store.state.sbnumber[0]}}</span>
        </div>
        <div class="title-box-op">
          <i class="iconfont icon-iconfont lingxing"></i>
          <span class="shebifont">已入库：</span>
          <span class="shebeinumber yichuku">{{$store.state.sbnumber[1]}}</span>
        </div>
        <div class="title-box-op">
          <i class="iconfont icon-iconfont lingxing"></i>
          <span class="shebifont">设备总数：</span>
          <span class="shebeinumber zongshu">{{$store.state.sbnumber[2]}}</span>
        </div>
      </div>
      <el-table
        :data="$store.state.equipment"
        style="width: 100%"
        height="300">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="80">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="divicename"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="devicetype"
          show-overflow-tooltip
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="model"
          label="设备型号"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="serialnumber"
          label="出厂序列号"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="deliverer"
          label="送检人"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="deliver_time"
          label="送检时间"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="appearance"
          label="外观"
          width="120">
        </el-table-column>
        <el-table-column
          prop="power_on"
          label="上电测试"
          width="120">
        </el-table-column>
        <el-table-column
          prop="de_size"
          label="设备尺寸"
          width="120">
        </el-table-column>
        <el-table-column
          prop="state"
          label="入库状态"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="80">
            <template slot-scope="scope">
              <el-button type="warning" :disabled="disable" icon="el-icon-edit-outline" size="mini" plain @click="eqopen(scope.row.id)"></el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-button plain class="rukudan-btn" type="primary" size="small" @click="handlerukudan">打印入库单</el-button>
      <el-button v-if="!disable" class="putstorage-btn" type="primary" size="small" @click="handleputstorage">提交任务</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["taskid", "ht", "page"],
  data() {
    return {
      deviceinfo: {}
    };
  },
  methods: {
    // 打开设备dialog
    async eqopen(id) {
      this.$store.dispatch("putstoragedialog", id);
    },
    // 任务进度改变
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    },
    // 提交任务
    handleputstorage() {
      this.$confirm("确定提交任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.put(`putstorage/${this.taskid}`);
          if (res.data.status === 200) {
            if (this.ht === "mytask") {
              this.$store.dispatch("loadingMytask", this.$store.state.mysxform);
            } else if (this.ht === "alltask") {
              this.$store.dispatch("loadingAlltask", this.$store.state.allsxform);
            } else {
              this.$store.dispatch("hometask");
            }
            this.$message.success("任务提交成功");
            this.$store.commit("taskhuakuaihidden");
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 入库单
    handlerukudan() {
      let routeData = this.$router.resolve({
        name: "GRN",
        query: { id: this.taskinfo.pro_id }
      });
      window.open(routeData.href, "_blank");
    }
  },
  computed: mapState({
    taskinfo: "taskinfo",
    appconbb: "appconbb",
    disable: "disable"
  })
};
</script>

<style>
#put-icon {
  font-size: 32px;
  color: #1ac7ff;
}
.putbig {
  height: 100%;
}
.shoujian-title {
  padding-left: 22px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  margin-top: 6px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  font-size: 22px;
  color: #4d5d71;
}
.shoujian-title .icon-jiafangyifang {
  font-size: 26px;
  color: #19c6ff;
  margin-right: 16px;
}
.shoujian-title .icon-shebeixinxi {
  font-size: 22px;
  color: #19c6ff;
  margin-right: 16px;
}
.shoujian-content {
  padding-left: 30px;
  margin-top: 4px;
  height: 130px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  background-color: #fff;
}
.applyfor-information-box {
  margin-top: 20px;
  position: relative;
}
.information-box-one {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 330px;
  max-width: 430px;
  border-bottom: 1px dashed #cacaca;
  color: #7e8b8e;
  font-size: 18px;
}
.information-box-font {
  color: #000;
  font-size: 16px;
}
.information-box2-one {
  position: absolute;
  color: #7e8b8e;
  top: 0px;
  left: 440px;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  min-width: 300px;
  max-width: 460px;
  border-bottom: 1px dashed #cacaca;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shebei-content {
  /* position: relative; */
  height: 100%;
  background-color: #fff;
  margin-top: 4px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.putbtncolor {
  color: #e6a23c;
  font-size: 20px;
  vertical-align: middle;
  cursor: pointer;
}
.putstorage-btn {
  position: absolute;
  bottom: 10px;
  left: 430px;
}
.rukudan-btn {
  position: absolute;
  bottom: 10px;
  left: 280px;
}
</style>

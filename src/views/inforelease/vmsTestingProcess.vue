<template>
  <div class="dp">
    <div class="pvptop3">VMS检测流程</div>
    <el-carousel indicator-position="outside" height="800px" :interval="10000" @change="dataprocess">
      <el-carousel-item v-for="(item, index) in prodata" :key="index" :label="index + 1">
        <div>
          <div class="tp_jctitle">{{item.proname}}</div>
          <div class="tpbzt">
            <div :class="item.phases_id === 1 ? 'tp_active' : 'bzt_bbox'">申请</div>
            <i class="iconfont icon-jiantou jiantou"></i>
            <div :class="item.phases_id === 2 ? 'tp_active' : 'bzt_bbox'">合同</div>
            <i class="iconfont icon-jiantou jiantou"></i>
            <div :class="item.phases_id === 3 ? 'tp_active' : 'bzt_bbox'">送检入库</div>
            <i class="iconfont icon-jiantou jiantou"></i>
            <div :class="item.phases_id === 4 ? 'tp_active' : 'bzt_bbox'">环境配置</div>
            <i class="iconfont icon-jiantou jiantou"></i>
            <div :class="item.phases_id === 5 ? 'tp_active' : 'bzt_bbox'">执行检测</div>
            <i class="iconfont icon-jiantou jiantou"></i>
            <div :class="item.phases_id === 6 ? 'tp_active' : 'bzt_bbox'">报告审核</div>
            <i class="iconfont icon-jiantou jiantou"></i>
            <div :class="item.phases_id === 7 ? 'tp_active' : 'bzt_bbox'">设备出库</div>
          </div>
          <div class="tp_wz">
            <div class="tp_tbox" v-for="(item2, index2) in item.time_list" :key="index2">
              <div>计划时间：</div>
              <div class="tp_time">{{item2.plantime}}</div>
              <div>实际时间：</div>
              <div class="tp_time">{{item2.reality_time}}</div>
            </div>
          </div>
          <div class="tp_fzr">
            项目负责人：{{item.duty_person}}
          </div>
          <div class="xm_tp_box">
            <div class="xm_tp_left">
              <div>受检单位联系人：</div>
              <div class="tp_lxr_br">{{item.linkman}}</div>
            </div>
            <div class="xm_tp_right">
              <div>项目时间：</div>
              <div>{{item.pro_starttime}}至{{item.pro_endtime}}</div>
            </div>
          </div>
          <div class="xm_tp_box">
            <div class="xm_tp_left">
              <div>受检单位：</div>
              <div class="tp_br">{{item.company}}</div>
            </div>
            <div class="xm_tp_right">
              <div>设备数量：</div>
              <div class="to_bb">{{item.device_count}}</div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      prodata: [],
      timer: "",
      timer2: ""
    };
  },
  methods: {
    async getdata() {
      const res = await this.$http.get("vmstestprocess");
      if (res.data.status === 200) {
        this.prodata = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    dataprocess(index) {
      if (this.prodata.length <= 1) {
        this.timer2 = setInterval(() => {
          this.getdata();
        }, 10000);
      } else {
        if (index + 1 === this.prodata.length) {
          this.timer = setTimeout(this.getdata, 10000);
        }
      }
    }
  },
  created() {
    this.getdata();
  }
};
</script>

<style>
.dp {
  width: 100%;
  height: 100%;
  background: url("../../assets/dpbg.jpg") no-repeat;
  color: #fff;
}
.pvptop3 {
  font-size: 70px;
  height: 150px;
  line-height: 170px;
  color: #fff;
  padding-left: 70px;
}
.tpbzt {
  width: 1780px;
  text-align: center;
  padding-left: 50px;
}
.bzt_bbox {
  width: 120px;
  height: 120px;
  border-radius: 70px;
  display: inline-block;
  vertical-align: top;
  background-color: #1b7197;
  text-align: center;
  font-size: 26px;
  color: #fff;
  line-height: 120px;
}
.tp_active {
  width: 120px;
  height: 120px;
  border-radius: 70px;
  display: inline-block;
  vertical-align: top;
  background-color: #1d2465;
  text-align: center;
  font-size: 24px;
  color: #fff;
  line-height: 120px;
}
.tp_jctitle {
  color: #fff;
  font-size: 34px;
  text-align: center;
  margin: 0 0 30px 0;
}
.jiantou {
  color: #fff;
  font-size: 80px;
  display: inline-block;
  line-height: 120px;
  margin: 0 26px;
}
.tp_wz {
  padding: 20px 0 0 130px;
  display: flex;
}
.tp_tbox {
  width: 200px;
  font-size: 26px;
  margin-right: 52px;
}
.tp_time {
  margin-left: 24px;
}
.tp_fzr {
  margin: 100px 0 0px 0;
  font-size: 40px;
  height: 100px;
  padding-left: 100px;
}
.xm_tp_box {
  display: flex;
  padding-left: 100px;
  font-size: 40px;
  width: 1800px;
}
.xm_tp_left {
  display: flex;
  width: 900px;
}
.xm_tp_right {
  display: flex;
  width: 900px;
}
.tp_br {
  width: 680px;
  height: 100px;
}
.tp_lxr_br {
  width: 580px;
  height: 100px;
}
.to_bb {
  position: relative;
  top: 6px;
}
</style>

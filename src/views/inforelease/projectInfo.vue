<template>
  <div class="dp">
    <div class="pvptop">年度项目信息简介</div>
    <div style="display: flex">
      <div style="margin:  0 0 0 70px;">
        <div class="table_top">VMS项目</div>
        <el-carousel height="760px" style="width: 860px;" :interval="10000" indicator-position="none" @change="vmschange">
          <el-carousel-item v-for="(item, index) in vmsdata" :label="index + 1" :key="index">
            <div class="PItable">
              <div class="pjh_box">
                <div class="pjh_left">项目名称</div>
                <div class="pjh_right">{{item.proname}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjh_left">受检单位</div>
                <div class="pjh_right">{{item.company}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjh_left">负责人</div>
                <div class="pj_fzrm">{{item.linkman}}</div>
                <div class="pj_dh">电话</div>
                <div class="pj_dhhm">{{item.phone}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjh_left">单位地址</div>
                <div class="pjh_right">{{item.address}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjsb_left">送检设备</div>
                <div class="pjsb_right">{{item.device}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjh_left">设备数量</div>
                <div class="pjh_right">{{item.device_count}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjtime_left">项目开始时间</div>
                <div class="pjtime_right">{{item.prostarttime}}</div>
              </div>
              <div class="pjh_box">
                <div class="pjtime_left">项目结束时间</div>
                <div class="pjtime_right">{{item.proendtime}}</div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div style="margin:  0 0 0 60px;">
        <div class="table_top">PIS项目</div>
        <el-carousel height="760px" style="width: 860px;" :interval="10000" indicator-position="none" @change="pischange">
          <el-carousel-item v-for="(item, index) in pisdata" :label="index + 1" :key="index">
            <div class="PItable pis">
              <div class="pjh_box pis">
                <div class="pjh_left pis">项目名称</div>
                <div class="pjh_right pis">{{item.proname}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjh_left pis">受检单位</div>
                <div class="pjh_right pis">{{item.company}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjh_left pis">负责人</div>
                <div class="pj_fzrm pis">{{item.linkman}}</div>
                <div class="pj_dh pis">电话</div>
                <div class="pj_dhhm pis">{{item.phone}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjh_left pis">单位地址</div>
                <div class="pjh_right pis">{{item.address}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjsb_left pis">送检设备</div>
                <div class="pjsb_right pis">{{item.device}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjh_left pis">设备数量</div>
                <div class="pjh_right pis">{{item.device_count}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjtime_left pis">项目开始时间</div>
                <div class="pjtime_right">{{item.prostarttime}}</div>
              </div>
              <div class="pjh_box pis">
                <div class="pjtime_left pis">项目结束时间</div>
                <div class="pjtime_right">{{item.proendtime}}</div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    
  </div>
</template>

<script>
// import G2 from "@antv/g2";
export default {
  data() {
    return {
      vmsdata: [],
      pisdata: [],
      vmstimer: null,
      pistimer: null,
      vmstimer2: null,
      pistimer2: null
    };
  },
  methods: {
    async vmsproinfo() {
      const res = await this.$http.get("vmsprojectinfo");
      if (res.data.status === 200) {
        this.vmsdata = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async pisproinfo() {
      const res = await this.$http.get("pisprojectinfo");
      if (res.data.status === 200) {
        this.pisdata = res.data.data;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    vmschange(index) {
      if (this.vmsdata.length === 1) {
        this.vmstimer2 = setInterval(() => {
          this.vmsproinfo();
        }, 10000);
      } else {
        if (index + 1 === this.vmsdata.length) {
          this.vmstimer = setTimeout(this.vmsproinfo, 10000);
        }
      }
    },
    pischange(index) {
      if (this.pisdata.length === 1) {
        this.pistimer2 = setInterval(() => {
          this.pisproinfo();
        }, 10000);
      } else {
        if (index + 1 === this.pisdata.length) {
          this.pistimer = setTimeout(this.pisproinfo, 10000);
        }
      }
    }
  },
  mounted() {
    this.vmsproinfo();
    this.pisproinfo();
  },
  beforeDestroy() {
    clearTimeout(this.vmstimer);
    clearTimeout(this.pistimer);
    clearInterval(this.vmstimer2);
    clearInterval(this.pistimer2);
  }
};
</script>

<style>
.dp {
  width: 100%;
  height: 100%;
  background: url("../../assets/dpbg.jpg");
}
.pvptop {
  font-size: 70px;
  height: 170px;
  line-height: 170px;
  color: #fff;
  padding-left: 70px;
}
.table_top {
  color: #fff;
  font-size: 30px;
  margin: 0 0 10px 0;
}
.PItable {
  width: 860px;
  box-sizing: border-box;
  border: 2px solid #409eff;
  height: 758px;
}
.pis.PItable {
  border: 2px solid #29a751;
}
.pjh_box {
  display: flex;
  color: #fff;
  border-bottom: 2px solid #409eff;
}
.pjh_box.pis {
  border-bottom: 2px solid #29a751;
}
.pjh_left {
  color: #fff;
  font-size: 24px;
  width: 120px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  border-right: 2px solid #409eff;
}
.pjh_left.pis {
  border-right: 2px solid #29a751;
}
.pjh_right {
  color: #fff;
  font-size: 18px;
  height: 80px;
  line-height: 36px;
  padding-left: 18px;
  width: 700px;
  display: flex;
  align-items: center;
}
.pj_fzrm {
  color: #fff;
  font-size: 18px;
  height: 80px;
  line-height: 80px;
  padding-left: 18px;
  width: 260px;
  border-right: 2px solid #409eff;
}
.pj_fzrm.pis {
  border-right: 2px solid #29a751;
}
.pj_dh {
  font-size: 24px;
  width: 120px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  border-right: 2px solid #409eff;
}
.pj_dh.pis {
  border-right: 2px solid #29a751;
}
.pj_dhhm {
  font-size: 18px;
  height: 80px;
  line-height: 80px;
  padding-left: 18px;
}
.pjsb_left {
  color: #fff;
  font-size: 24px;
  width: 120px;
  text-align: center;
  height: 180px;
  line-height: 60px;
  border-right: 2px solid #409eff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pjsb_left.pis {
  border-right: 2px solid #29a751;
}
.pjsb_right {
  color: #fff;
  font-size: 18px;
  height: 180px;
  line-height: 60px;
  padding-left: 18px;
  width: 700px;
  display: flex;
  align-items: center;
}
.pjtime_left {
  height: 80px;
  line-height: 30px;
  color: #fff;
  font-size: 22px;
  text-align: center;
  border-right: 2px solid #409eff;
  width: 100px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.pjtime_left.pis {
  border-right: 2px solid #29a751;
}
.pjtime_right {
  font-size: 22px;
  height: 80px;
  line-height: 40px;
  padding-left: 18px;
  width: 700px;
  display: flex;
  align-items: center;
}
</style>

<template>
  <div id="quan">  
    <div class="topmohu">
      <el-row>
        <el-col :span="19">
          <div class="sp_top_logo">
            <img class="sp_logo" src="../../assets/sp_logo.png">
          </div>
          <div class="sp_top_title">
            <div style="margin: 10px 0 6px 0">北京市轨道交通指挥中心</div>
            <div style="font-size: 14px">BEIJING METRO NETWORK CONTROL CENTER</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="sp_time">{{nowdate}}&nbsp;&nbsp;&nbsp;&nbsp;{{nowtime}}</div>
          <div class="sp_day">{{nowday}}</div>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 100px 0 0 100px">
      <div class="nodec_box">
        <div class="node_home_left">
          <i class="sp_icon iconfont icon-menpaihao01"></i>
          <span style="color: #f59c17">房间号：</span>
        </div>
        <div class="sp_home_right">
         <span style="color: #fff">{{roomdata.room_num}}</span>
        </div>
      </div>
      <div class="nodec_box">
        <div class="node_home_left">
          <i class="sp_icon iconfont icon-fangzi"></i>
          <span style="color: #f59c17">房间名：</span>
        </div>
        <div class="sp_home_right">
         <span style="color: #fff">{{roomdata.room_name}}</span>
        </div>
      </div>
      <div class="nodec_box">
        <div class="node_home_left">
          <i class="sp_icon iconfont icon-yonghu"></i>
          <span style="color: #f59c17">负责人：</span>
        </div>
        <div class="sp_home_right">
          <span style="color: #fff" v-for="(item, index) in roomdata.duty_person" :key="index">{{item}}&nbsp;&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      nowdate: "",
      nowtime: "",
      nowday: "",
      timer1: null,
      roomdata: ""
    };
  },
  methods: {
    date() {
      let date = new Date();
      const year = date.getFullYear();
      const month = this.dateadd(date.getMonth() + 1);
      const day = date.getDate();
      const h = this.dateadd(date.getHours());
      const m = this.dateadd(date.getMinutes());
      const wonday = date.getDay();
      let zhouji = "";
      if (wonday === 2) {
        zhouji = "二";
      } else if (wonday === 1) {
        zhouji = "一";
      } else if (wonday === 3) {
        zhouji = "三";
      } else if (wonday === 4) {
        zhouji = "四";
      } else if (wonday === 5) {
        zhouji = "五";
      } else if (wonday === 6) {
        zhouji = "六";
      } else if (wonday === 0) {
        zhouji = "日";
      }
      this.nowday = "星期" + zhouji;
      this.nowdate = `${year}年${month}月${day}日`;
      this.nowtime = `${h}:${m}`;
    },
    dateadd(m) {
      return m < 10 ? "0" + m : m;
    },
    async getdata(room) {
      const res = await this.$http.get(`signdetail/${room}`);
      if (res.data.status === 200) {
        this.roomdata = res.data.signs;
      }
    },
    route() {
      if (this.$route.fullPath.indexOf("?") != -1) {
        let room = this.$route.fullPath;
        let index = room.lastIndexOf("?");
        let home = room.substring(index + 1, room.length);
        this.getdata(home);
      } else {
        this.$message.error("请在网址vmsdetection后输入'?' + '房间名'");
      }
    }
  },
  created() {
    this.date();
    this.route();
  },
  mounted() {
    this.timer1 = setInterval(this.date, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer1);
  }
};
</script>

<style>
#quan {
  width: 100%;
  height: 100%;
  background: url(../../assets/spbg.png) no-repeat;
}
.topmohu {
  height: 116px;
  background-color: rgba(255, 255, 255, 0.3);
}
.sp_top_logo {
  display: inline-block;
  vertical-align: middle;
  margin: 24px 26px 0 20px;
}
.sp_top_title {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  font-size: 26px;
}
.sp_logo {
  height: 64px;
}
.sp_time {
  margin: 20px 0 10px 0;
  font-size: 22px;
  color: #fff;
}
.sp_day {
  font-size: 22px;
  color: #fff;
}
.node_home_left {
  display: inline-block;
  font-size: 46px;
  vertical-align: top;
  /* width: 800px; */
}
.sp_home_right {
  display: inline-block;
  vertical-align: top;
  font-size: 46px;
  max-width: 1500px;
}
.sp_icon {
  font-size: 44px;
  color: #1fd8ff;
  margin: 0 26px 0 4px;
}
.sp_title {
  font-size: 46px;
  margin: 34px 0 32px 0;
}
.nodec_box {
  line-height: 140px;
}
</style>

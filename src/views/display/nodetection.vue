<template>
  <div class="nodecquan">
    <div class="wewe">
      <div class="fjhao">
        <span class="fjhao_l">房 间 号：</span>
        <div class="fjcconternt">{{roomdata.room_num}}</div>
      </div>
      <div class="fjming">
        <span class="fjhao_l">房 间 名：</span>
        <div class="fjcconternt fjm">{{roomdata.room_name}}</div>
      </div>
      <div class="fzren">
        <span class="fjhao_l">负 责 人：</span>
        <div class="fjcconternt fjm"><span v-for="(item, index) in roomdata.duty_person" :key="index">{{item}} </span></div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomdata: "",
      timer: ""
    };
  },
  methods: {
    async getdata(room) {
      const res = await this.$http.get(`signdetail/${room}`);
      console.log(1111)
      if (res.data.status === 200) {
        this.roomdata = res.data.signs;
        this.projects = [];
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
  mounted() {
    this.timer = setInterval(this.route, 1800000);
  },
  created() {
    this.route();
  }
};
</script>

<style>
.nodecquan {
  width: 100%;
  height: 100%;
  background: url(../../assets/fjiancesp.png) no-repeat;
}
.wewe {
  padding: 260px 0 0 580px;
}
.fjhao {
  width: 1200px;
  height: 108px;
}
.fjming {
  height: 108px;
  width: 1200px;
  margin-top: 152px;
}
.fjhao_l {
  font-size: 76px;
  color: #f6941f;
  font-weight: 800;
}
.fzren {
  height: 108px;
  width: 1200px;
  margin-top: 150px;
}
.fjcconternt {
  font-size: 74px;
  color: #fff;
  height: 108px;
  vertical-align: middle;
  display: inline-block;
  max-width: 750px;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 80px;
}
.fjm.fjcconternt {
  position: relative;
  top: -14px;
}
</style>

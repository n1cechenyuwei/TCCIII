<template>
  <div id="quan">
    <div>
      <div class="fjnum">
        <span class="fjbq">房 间 号：</span>
        <span class="fjcontent hm">{{roomdata.room_num}}</span>
      </div>
      <div class="fjming">
        <span class="fjbq">房 间 名：</span>
        <span class="fjcontent hn">{{roomdata.room_name}}</span>
      </div>
    </div>
    <div class="fjname">
      <span class="fjbq">负 责 人：</span>
      <span class="fjcontent fzr"><span v-for="(item, index) in roomdata.duty_person" :key="index">{{item}} </span></span>
    </div>
    <div class="task">
      <span class="fjbq">当前项目：</span>
    </div>
    <div>
      <el-carousel
        arrow="never"
        height="300px"
        :interval="3000"
        v-show="taskor === 1"
        indicator-position="none">
        <el-carousel-item class="aaaaaaa" v-for="(proli, index) in projects" :key="index">
          <div class="sp_task_box" v-for="(li, index2) in proli" :key="index2">
            <div class="task_line">{{li.company}}</div>
            <div class="task_line">{{li.proname}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div v-show="taskor === 0">无任务</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomdata: "",
      projects: [],
      taskor: 0
    };
  },
  methods: {
    async getdata(room) {
      const res = await this.$http.get(`signdetail/${room}`);
      if (res.data.status === 200) {
        this.roomdata = res.data.signs;
        this.projects = [];
        if (res.data.signs.projects !== null) {
          this.taskor = 1;
          for (let i = 0; i < res.data.signs.projects.length; i += 3) {
            this.projects.push(res.data.signs.projects.slice(i, i + 3));
          }
        } else {
          this.taskor = 0;
        }
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
    this.route();
  }
};
</script>

<style>
#quan {
  width: 100%;
  height: 100%;
  background: url(../../assets/shuipaibg.jpg) no-repeat;
}
.fjcontent {
  color: #fff;
  display: inline-block;
  font-size: 46px;
  margin: 0 0 0 70px;
  position: relative;
  top: 6px;
  overflow: hidden;
  white-space: nowrap;
}
.fjcontent.hm {
  max-width: 270px;
}
.fjcontent.hn {
  max-width: 640px;
}
.fzr.fjcontent {
  width: 1300px;
  text-overflow: ellipsis;
}
.fjnum {
  display: inline-block;
  vertical-align: top;
  width: 560px;
  font-weight: 900;
  margin: 292px 0 0 150px;
}
.fjname {
  width: 1600px;
  font-weight: 900;
  margin: 72px 0 0 150px;
}
.fjming {
  display: inline-block;
  vertical-align: top;
  width: 1000px;
  font-weight: 900;
  margin: 294px 0 0 96px;
}
.task {
  width: 600px;
  font-weight: 900;
  margin: 70px 0 0 150px;
}
.fjbq {
  vertical-align: top;
  font-size: 46px;
  color: #f6941f;
}
.sp_task_box {
  height: 76px;
  margin-top: 20px;
  color: #fff;
  font-size: 40px;
  line-height: 76px;
  padding-left: 20px;
}
.task_line {
  display: inline-block;
  width: 860px;
  text-align: left;
  padding-left: 20px;
  margin: 0px 10px 0 10px;
  background-color: rgba(38, 54, 180, 0.8);
  border: 1px solid #fff;
}
.aaaaaaa {
  text-align: center;
}
</style>

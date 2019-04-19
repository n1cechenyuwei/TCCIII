<template>
  <div id="quan">
    <div class="shuipai">房间名：vms检测实验室</div>
    <div class="shuipai">负责人：郝佳贺，赵龙</div>
    <div class="shuipai">进行中项目：</div>
    <button @click="fullScreen">全屏</button>
    <div>
      <el-carousel
        arrow="never"
        height="400px"
        :interval="3000"
        indicator-position="none">
        <el-carousel-item v-for="(item, index) in dat" :key="index">
          <h3>{{item.name}}</h3>
          <h3>{{item.name2}}</h3>
          <h3>{{item.name3}}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      dat: [
        {
          name: "乐玛仕科技有限公司入围检测项目",
          name2: "六号线仿真环境检测",
          name3: "十五号线样品检测"
        },
        {
          name: "第二页1",
          name2: "第二页2",
          name3: "第二页3"
        }
      ]
    }
  },
  methods: {
    // fullScreen() {
    //   const videoDom = document.body;
    //   // this.timer = setInterval( () => {
    //     if(videoDom.requestFullscreen){
    //       return videoDom.requestFullscreen();
    //     }else if(videoDom.webkitRequestFullScreen){
    //       return videoDom.webkitRequestFullScreen();
    //     }else if(videoDom.mozRequestFullScreen){
    //       return videoDom.mozRequestFullScreen();
    //     }else{
    //       return videoDom.msRequestFullscreen();
    //     }
    //   // }, 1000)
    // }
  },
  // created() {
  //   this.fullScreen();
  // },
  mounted() {
    // this.fullScreen();
  }
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 100px;
  font-size: 50px;
  margin: 0;
}
/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
} */
.shuipai {
  font-size: 100px;
  margin: 0 0 50px 0;
}

</style>

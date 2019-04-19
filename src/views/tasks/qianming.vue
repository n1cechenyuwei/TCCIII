<template>
  <div>
    <canvas
      id="canvas"
      width="800"
      height="600"
      @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp($event)"
      @mouseleave="canvasLeave($event)"
      ref="canvas"
    >抱歉，您的浏览器不支持canvas元素</canvas>
    <img :src="url" alt="">
    <button @click="ClearCanvas">清除</button>
    <button @click="submit">确定</button>
  </div>
</template>

<script>
export default {
  name: "signature",
  data() {
    return {
      url: ""
    };
  },
  created() {
    // @touchstart="touchStart"
    //     @touchmove="touchMove"
    //     @touchend="touchEnd"
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = 2; //设置线的宽度
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.target.offsetLeft;
      const canvasY =
        e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        const t = e.target;
        let canvasX;
        let canvasY;
        canvasX = e.clientX - t.offsetLeft;
        canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp() {
      this.canvasMoveUse = false;
    },
    canvasLeave() {
      this.canvasMoveUse = false;
    },
    ClearCanvas() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    submit() {
      const img = this.$refs.canvas.toDataURL("image/png");
      this.url = img;
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid #000;
}
</style>

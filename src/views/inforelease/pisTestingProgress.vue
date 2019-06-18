<template>
  <div class="dp">
    <div class="pvptop2">PIS检测进度</div>
    <div class="pt_box ptp_box">
      <div class="pt_proname">一号线检测（入围检测）</div>
      <div class="pt_progress">
        <el-progress :show-text="false" :stroke-width="20" :percentage="50"></el-progress>
      </div>
      <div class="pt_bfb">50%</div>
      <div class="chartitle">IPC检测项</div>
      <v-chart :padding="[10, 200, 40, 200]" height="500" width="628" :data="data">
        <v-tooltip :showTitle="false" dataKey="item*count" />
        <v-axis />
        <!-- <v-legend dataKey="item" /> -->
        <v-pie position="count" color="item" :v-style="pieStyle" :label="labelConfig" />
        <v-coord type="theta" />
      </v-chart>
    </div>
    <div class="ptp_box">
      <div class="pt_proname">一号线检测（入围检测）</div>
      <div class="pt_progress">
        <el-progress :show-text="false" :stroke-width="20" :percentage="50"></el-progress>
      </div>
      <div class="pt_bfb">50%</div>
      <div class="chartitle">IPC检测项</div>
      <v-chart :padding="[10, 200, 40, 200]" height="500" width="628" :data="data">
        <v-tooltip :showTitle="false" dataKey="item*count" />
        <v-axis />
        <!-- <v-legend dataKey="item" /> -->
        <v-pie position="count" color="item" :v-style="pieStyle" :label="labelConfig" />
        <v-coord type="theta" />
      </v-chart>
    </div>
    <div class="ptp_R ptp_box">
      <div class="pt_proname">一号线检测（入围检测）</div>
      <div class="pt_progress">
        <el-progress :show-text="false" :stroke-width="20" :percentage="50"></el-progress>
      </div>
      <div class="pt_bfb">50%</div>
      <div class="chartitle">IPC检测项</div>
      <v-chart :padding="[10, 200, 40, 200]" height="500" width="620" :data="data">
        <v-tooltip :showTitle="false" dataKey="item*count" />
        <v-axis />
        <!-- <v-legend dataKey="item" /> -->
        <v-pie position="count" color="item" :v-style="pieStyle" :label="labelConfig" />
        <v-coord type="theta" />
      </v-chart>
    </div>
  </div>
</template>

<script>
// import G2 from "@antv/g2";
export default {
  data() {
    return {
      data: [
        {
          item: "未执行检测项",
          count: 40
        },
        {
          item: "未通过检测项",
          count: 21
        },
        {
          item: "已执行检测项",
          count: 17
        }
      ],
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: ["count", {
        textStyle: {
          fill: "#fff", // 文本的颜色
          fontSize: "22" // 文本大小
        },
        formatter: (val, item) => {
          return item.point.item + ": " + val;
        }
      }],
      scale: ""
    };
  },
  methods: {},
  mounted() {
    // var chart = new G2.Chart({
    //   container: "mountNode",
    //   forceFit: true,
    //   height: 700,
    //   width: 520,
    //   padding: [40, 100, 0, 80]
    // });
    // chart.source(this.data);
    // chart.coord("theta", {
    //   radius: 0.75
    // });
    // chart.tooltip({
    //   showTitle: false,
    //   itemTpl:
    //     '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}:  {value}</li>'
    // });
    // chart
    //   .intervalStack()
    //   .position("count")
    //   .color("item")
    //   .label("count", {
    //     textStyle: {
    //       fill: "#fff", // 文本的颜色
    //       fontSize: "24" // 文本大小
    //       // textBaseline: "top" // 文本基准线，可取 top middle bottom，默认为middle
    //     },
    //     formatter: function formatter(val, item) {
    //       return item.point.item;
    //     }
    //   })
    //   .tooltip("item*count", function(item, count) {
    //     return {
    //       name: item,
    //       value: count + "个"
    //     };
    //   })
    //   .style({
    //     lineWidth: 1,
    //     stroke: "#fff"
    //   });
    // chart.render();
  }
};
</script>

<style>
.dp {
  width: 100%;
  height: 100%;
  background: url("../../assets/probg.jpg");
}
.pvptop2 {
  font-size: 70px;
  height: 190px;
  line-height: 170px;
  color: #fff;
  padding-left: 70px;
}
.pt_box {
  margin: 0 0 0 20px;
  width: 620px;
}
.pt_proname {
  color: #fff;
  font-size: 26px;
  width: 530px;
  height: 70px;
  margin-left: 50px;
}
.pt_progress {
  width: 450px;
  display: inline-block;
  margin-left: 50px;
}
.pt_bfb {
  color: #409eff;
  position: relative;
  font-size: 32px;
  margin-left: 20px;
  display: inline-block;
  width: 60px;
}
.chartitle {
  color: #fff;
  text-align: center;
  font-size: 24px;
  margin-top: 100px;
}
.ptp_box {
  width: 630px;
  display: inline-block;
  vertical-align: top;
}
.ptp_R {
  width: 620px;
}
</style>

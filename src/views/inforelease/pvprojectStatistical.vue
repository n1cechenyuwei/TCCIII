<template>
  <div class="dp">
    <div class="pvptop">VMS/PIS年度项目统计</div>
    <div id="pvpchart"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  data() {
    return {
      pvpchart: "",
      chartdata: []
    };
  },
  methods: {
    prochar() {
      this.pvpchart = new G2.Chart({
        container: "pvpchart",
        width: 1900,
        forceFit: false,
        padding: [20, 100, 150, 140], // 上，右，下，左
        height: 800
      });
      this.pvpchart.source(this.chartdata);
      this.pvpchart.axis("quarter", {
        label: {
          offsetY: 20,
          textStyle: {
            textAlign: "center", // 文本对齐方向，可取值为： start middle end
            textBaseline: "middle", // 文本基准线，可取 top middle bottom，默认为middle
            fill: "#fff",
            fontSize: "24"
          }
        }
      });
      this.pvpchart.axis("count", {
        label: {
          textStyle: {
            fill: "#fff",
            fontSize: "24"
          }
        },
        line: {
          stroke: "#fff" // 坐标轴线的颜色
        }
      });
      this.pvpchart.tooltip({
        inPlot: true
      });
      this.pvpchart.scale("count", {
        tickInterval: 3
      });
      this.pvpchart
        .interval()
        .position("quarter*count")
        .color("name")
        .adjust([
          {
            type: "dodge",
            marginRatio: 1 / 32
          }
        ]);
      this.pvpchart.legend({
        position: "bottom",
        useHtml: true,
        containerTpl:
          '<div class="g2-legend" style="position:absolute;top:20px;right:60px;width:auto;">' +
          '<h4 class="g2-legend-title" style="font-size: 40px"></h4>' +
          '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></ul>' +
          "</div>",
        itemTpl:
          '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}">' +
          '<i class="g2-legend-marker" style="background-color:{color};"></i>' +
          '<span class="g2-legend-text">{value}</span></li>',
        "g2-legend-marker": {
          width: "30px",
          height: "30px",
          "border-radius": 0,
          margin: "0px 10px 0 0",
          position: "relative",
          top: "-2px"
        },
        "g2-legend": {
          "font-size": "30px",
          "line-height": "30px"
        },
        "g2-legend-list-item": {
          color: "#FFF"
        }
      });
      this.pvpchart.render();
    },
    async worksdata() {
      const res = await this.$http.get(`quarterprojectsshow`);
      if (res.data.status === 200) {
        this.chartdata = res.data.projects;
        this.prochar();
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  mounted() {
    this.worksdata();
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
</style>

<template>
  <div class="dp">
    <div class="pvptop2">PIS检测进度</div>
    <div style="padding-left: 0px">
      <el-carousel indicator-position="none" height="750px" :interval="40000" @change="progress">
        <el-carousel-item v-for="(item2, index) in data" :key="index">
          <div class="pt_box ptp_box" v-for="(item3, index3) in item2" :key="index3">
            <div class="pt_proname">{{item3.proname}}</div>
            <div class="pt_progress">
              <el-progress :show-text="false" :stroke-width="20" :percentage="item3.prosechedule"></el-progress>
            </div>
            <div class="pt_bfb">{{item3.prosechedule}}%</div>
            <el-carousel indicator-position="none" height="760px" :interval="5000">
              <el-carousel-item v-for="(item4, index4) in item3.devicies_info" :key="index4">
                <div class="por">
                  <div class="chartitle">{{item4.device_type}}</div>
                  <div :id="'h' + index + index3 + index4"></div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>          
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
export default {
  data() {
    return {
      data: [],
      timer: null,
      istwo: 0,
      timer2: null
    };
  },
  methods: {
    async vmsdata() {
      const res = await this.$http.get("pistestsechedule");
      if (res.data.status === 200) {
        for (let i = 0; i < res.data.project_data.length; i += 3) {
          this.data.push(res.data.project_data.slice(i, i + 3));
        }
        for (const item of this.data) {
          for (const item2 of item) {
            if (item2.devicies_info.length === 2) {
              item2.devicies_info.push(item2.devicies_info[0]);
              item2.devicies_info.push(item2.devicies_info[1]);
            }
          }
        }
        if (this.data.length === 2) {
          this.data.push(this.data[0]);
          this.data.push(this.data[1]);
          this.istwo = 1;
        } else {
          this.istwo = 0;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async asdasd() {
      const res = await this.$http.get("pistestsechedule");
      if (res.data.status === 200) {
        this.data = [];
        for (let i = 0; i < res.data.project_data.length; i += 3) {
          this.data.push(res.data.project_data.slice(i, i + 3));
        }
        for (const item of this.data) {
          for (const item2 of item) {
            if (item2.devicies_info.length === 2) {
              item2.devicies_info.push(item2.devicies_info[0]);
              item2.devicies_info.push(item2.devicies_info[1]);
            }
          }
        }
        if (this.data.length === 2) {
          this.data.push(this.data[0]);
          this.data.push(this.data[1]);
          this.istwo = 1;
        } else {
          this.istwo = 0;
        }
        this.timer = setTimeout(() => {
          for (let j = 0; j < this.data.length; j++) {
            for (let k = 0; k < this.data[j].length; k++) {
              for (let l = 0; l < this.data[j][k].devicies_info.length; l++) {
                let chartid = "h" + j + "" + k + "" + l;
                let chartdata = this.data[j][k].devicies_info[l].pie_data;
                this.chart(chartid, chartdata);
              }
            }
          }
        }, 200);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    chart(id, data) {
      var chart = new G2.Chart({
        container: id,
        height: 750,
        width: 636,
        animate: false,
        padding: [100, 140, 180, 140]
      });
      chart.source(data);
      chart.coord("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      // chart.guide().html({
      //   position: ['50%', '50%'],
      //   html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      //   alignX: 'middle',
      //   alignY: 'middle'
      // });
      chart
        .intervalStack()
        .position("count")
        .color("items")
        .label("count", {
          textStyle: {
            fill: "#fff", // 文本的颜色
            fontSize: "20" // 文本大小
          },
          formatter: function formatter(val, items) {
            return items.point.items + ": " + val;
          }
        })
        .tooltip("items*count", function(items, count) {
          return {
            name: items,
            value: count
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      chart.legend({
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
          width: "20px",
          height: "20px",
          "border-radius": 15,
          margin: "0px 10px 0 0",
          position: "relative",
          top: "-2px"
        },
        "g2-legend": {
          "font-size": "20px",
          "line-height": "20px"
        },
        "g2-legend-list-item": {
          color: "#FFF"
        }
      });
      chart.render();
    },
    progress(index) {
      if (this.data.length <= 1) {
        this.timer2 = setInterval(() => {
          this.asdasd();
        }, 600000);
      } else {
        if (this.istwo === 0) {
          if (index + 1 === this.data.length) {
            this.timer = setTimeout(this.asdasd, 40000);
          }
        } else {
          if (index + 1 === 2) {
            this.timer = setTimeout(this.asdasd, 40000);
          }
        }
      }
    }
  },
  created() {
    this.vmsdata();
  },
  mounted() {
    this.asdasd();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    clearInterval(this.timer2);
  }
};
</script>

<style>
.dp {
  width: 100%;
  height: 100%;
  min-width: 1920px;
  background: url("../../assets/probg.jpg") no-repeat;
}
.pvptop2 {
  font-size: 70px;
  height: 190px;
  line-height: 170px;
  color: #fff;
  padding-left: 70px;
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
  font-size: 18px;
  /* margin-top: 100px; */
  position: absolute;
  top: 320px;
  left: 50%;
  transform: translateX(-50%);
}
.ptp_box {
  width: 640px;
  display: inline-block;
  vertical-align: top;
}
.por {
  position: relative;
}
</style>

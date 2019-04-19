<template>
  <div class="grnbox">
    <div class="grn-contentbox">
      <div class="grn-top">设备与软件接受/返还单</div>
      <div class="grn-topboeder"></div>
      <div class="jcjd">
        <span>&nbsp;&nbsp;&nbsp;检测阶段：仿真环境检测</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号：BSP1000000001</span>
      </div>
      <div class="danwei">
        <span class="danwei-left">委托单位</span>
        <span class="danwei-right">奔讯电子科技有限公司</span>
      </div>
      <div class="yangpin">
        <span class="danwei-left">受检样品名称</span>
        <span class="danwei-right">奔讯电子科技有限公司</span>
      </div>
      <div class="center">样品基本信息</div>
      <div class="eqtable">
        <table class="grntable">
          <tr>
            <th width="32%">检测样品明细</th>
            <th width="10%">介质</th>
            <th width="10%">型号</th>
            <th width="10%">序列号</th>
            <th width="6%">数量</th>
            <th width="32%">备注</th>
          </tr>
          <tr v-for="(item, index) in eqdata" :key="index">
            <td style="word-break: break-all;">{{item.date}}</td>
            <td style="word-break: break-all;">{{item.name}}</td>
            <td style="word-break: break-all;">{{item.xinghao}}</td>
            <td style="word-break: break-all;">{{item.xuliehao}}</td>
            <td style="word-break: break-all;">{{item.number}}</td>
            <td style="word-break: break-all;">{{item.beizhu}}</td>
          </tr>
        </table>
      </div>
      <div class="yanshou">
        <div class="yanshou-title">验收情况记录</div>
        <div class="grn-xuanxinag">
          <span class="rleft">检测样品是否与包装说明一致？</span>
          <label class="grn-checkbox"><input class="check" type="checkbox" checked="checked" name="aa" @click="choose($event, 'aa')">是</label>
          <label><input class="check" type="checkbox" name="aa" @click="choose($event, 'aa')">否</label>
        </div>
        <div class="grn-xuanxinag">
          <span class="rleft">检测样品的介质、型号和数量是否与上述记录内容一致？</span>
          <label class="grn-checkbox"><input class="check" type="checkbox" checked="checked" name="bb" @click="choose($event, 'bb')">是</label>
          <label><input class="check" type="checkbox" name="bb" @click="choose($event, 'bb')">否</label>
        </div>
        <div class="grn-xuanxinag">
          <span class="rleft">检测样品是否经过病毒检查？杀毒软件名称及版本:</span>
          <label class="grn-checkbox"><input class="check" type="checkbox" checked="checked" name="cc" @click="choose($event, 'cc')">是</label>
          <label><input class="check" type="checkbox" name="cc" @click="choose($event, 'cc')">否</label>
        </div>
        <div class="grn-xuanxinag">
          <span class="rleft">检测样品是否能够正常安装和运行？</span>
          <label class="grn-checkbox"><input class="check" type="checkbox" checked="checked" name="dd" @click="choose($event, 'dd')">是</label>
          <label><input class="check" type="checkbox" name="dd" @click="choose($event, 'dd')">否</label>
        </div>
      </div>
      <div class="fanhui">
        <div class="grntfanhui">
          <div class="fanhui-left fanhuigongong">是否返还</div>
          <div class="fanhui-center fanhuigongong">
            <label class="grn-checkbox"><input class="check" type="checkbox" checked="checked" name="ee" @click="choose($event, 'ee')">需要返还</label>
            <label><input class="check" type="checkbox" name="ee" @click="choose($event, 'ee')">不需要返还</label>
          </div>
        </div>
        <div class="grntfanhui2">
          <div class="fanhui-center2 fanhuigongong">预计返还时间</div>
          <div class="fanhui-right fanhuigongong">2018-10-12</div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="b-danweititle">委托单位:</div>
          <span class="grn-danwei">浙江大华有限公司</span>
          <div class="dianhua">电话:<span class="grn-phone">15650313854</span></div>
          <div class="chuanzhen">传真:<span class="grn-phone">15650313854</span></div>
          <div class="address">通信地址: <span style="text-decoration: underline">京轨道交通路网管理有限公司</span></div>
          <div style="margin-bottom: 8px">联系人: <span class="lianxiren">郝佳贺</span></div>
          <div style="margin-bottom: 8px">邮箱: <span class="grn-youxinag">12346579@163.com</span></div>
        </div>
        <div class="bottom-right">
          <div class="br-t">北京轨道交通路网管理有限公司VMS检测中心:</div>
          <div style="margin-bottom: 8px"> 电 话: 010-846800117 &nbsp;&nbsp;传 真: 010-84680089</div>
          <div style="margin-bottom: 8px">通信地址: 北京市朝阳区小营北路6号京投大厦2座2层</div>
          <div style="margin-bottom: 8px">联系人: 薛宝满</div>
          <div style="margin-bottom: 8px">邮箱：xuebaoman@bmncc.com.cn</div>
        </div>
      </div>
      <div class="bbottom">
        <div class="bb-left">
          <div class="grn-bbbb">
            <div class="kuai tijiaop">提交人</div>
            <div class="kuai tjpeople">闰土</div>
            <div class="kuai tijiaot">提交时间</div>
            <div class="youkuai tjtime">2018-10-12</div>
          </div>
          <div >
            <div class="kuai tijiaop">领取人</div>
            <div class="kuai tjpeople">闰土</div>
            <div class="kuai tijiaot">领取时间</div>
            <div class="youkuai tjtime">2018-12-15</div>
          </div>
        </div>
        <div class="bb-right">
          <div class="grn-bbbb">
            <div class="kuai tijiaop">接受人</div>
            <div class="kuai tjpeople">闰土</div>
            <div class="kuai tijiaot">接受时间</div>
            <div class="youkuai tjtime">2018-12-12</div>
          </div>
          <div >
            <div class="kuai tijiaop">返还人</div>
            <div class="kuai tjpeople">闰土</div>
            <div class="kuai tijiaot">返还时间</div>
            <div class="youkuai tjtime">2018-10-05</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eqdata: [
        {
          date: "明adad",
          name: "介a质",
          xuliehao: "4654646asdada",
          xinghao: "bba0",
          number: "2",
          beizhu: "备息"
        },
        {
          date: "明adadadadadasdasd细",
          name: "介adadadadada质",
          xuliehao: "465adadad464646",
          xinghao: "bbbadadada0",
          number: "2",
          beizhu: "备注信息"
        }
      ]
    };
  },
  methods: {
    router() {
      console.log(this.$route.query.id);
      // window.print();
    },
    choose(e, obj) {
      const ss = document.getElementsByName(obj);
      for (let i = 0; i < ss.length; i++) {
        ss[i].checked = false;
      }
      e.currentTarget.checked = true;
    }
  },
  created() {
    this.router();
  }
};
</script>

<style>
.grnbox {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.grn-contentbox {
  font-family: "SimSun";
  width: 800px;
  margin: 0 auto;
}
.grn-top {
  text-align: center;
  color: #808080;
  font-size: 18px;
}
.grn-topboeder {
  height: 1px;
  width: 90%;
  margin: 4px auto 6px;
  background-color: #808080;
}
.jcjd {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}
.danwei {
  width: 100%;
  height: 34px;
  border: 1px solid #000;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
}
.yangpin {
  width: 100%;
  height: 34px;
  border: 1px solid #000;
  box-sizing: border-box;
  border-top: none;
  font-size: 16px;
  font-weight: 600;
}
.danwei-left {
  display: inline-block;
  vertical-align: top;
  height: 34px;
  line-height: 34px;
  width: 19%;
  text-align: center;
  border-right: 1px solid #000;
}
.danwei-right {
  display: inline-block;
  vertical-align: top;
  height: 34px;
  line-height: 34px;
  width: 80%;
  text-align: center;
}
.center {
  text-align: center;
  width: 100%;
  height: 34px;
  line-height: 34px;
  border: 1px solid #000;
  box-sizing: border-box;
  border-top: none;
  border-bottom: none;
  font-size: 16px;
  font-weight: 600;
}
/* 样品信息表格 */
.grntable {
  width: 100%;
  border-collapse: collapse;
}
.grntable tr th {
  height: 42px;
  line-height: 42px;
}
.grntable tr td {
  height: 36px;
  text-align: center;
}
.grntable,
.grntable tr th,
.grntable tr td {
  border: 1px solid #000;
}
/* 样品信息表格结束 */
.yanshou {
  height: 154px;
  box-sizing: border-box;
  border: 1px solid #000;
  border-top: none;
  font-size: 14px;
}
.yanshou-title {
  font-weight: 700;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.rleft {
  margin-right: 40px;
}
.grn-xuanxinag {
  margin: 0 0 9px 8px;
}
.grn-checkbox {
  margin-right: 20px;
}
.check {
  position: relative;
  top: 2px;
  margin-right: 6px;
}
.fanhui {
  height: 36px;
  box-sizing: border-box;
  border: 1px solid #000;
  border-top: none;
}
.fanhuigongong {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  text-align: center;
  box-sizing: border-box;
}
.fanhui-left {
  width: 30%;
  border-right: 1px solid #000;
}
.fanhui-center {
  width: 70%;
}
.fanhui-center2 {
  width: 44%;
  border-right: 1px solid #000;
}
.fanhui-right {
  width: 56%;
}
.bottom {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  border-top: none;
}
.bottom-left {
  display: inline-block;
  vertical-align: top;
  padding: 0 0 0 8px;
  box-sizing: border-box;
  width: 50%;
  border-right: 1px solid #000;
}
.bottom-right {
  display: inline-block;
  vertical-align: top;
  width: 50%;
  padding: 0 0 0 8px;
  box-sizing: border-box;
}
.b-danweititle {
  height: 34px;
  width: 22%;
  display: inline-block;
  vertical-align: top;
  line-height: 34px;
  font-weight: 600;
  box-sizing: border-box;
  font-size: 16px;
  /* margin-left: 8px; */
}
.grn-danwei {
  width: 76%;
  margin: 8px 0 8px 0;
  line-height: 18px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  font-size: 16px;
  font-weight: 100;
}
.grntfanhui {
  width: 50%;
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
  border-right: 1px solid #000;
}
.grntfanhui2 {
  width: 50%;
  vertical-align: top;
  display: inline-block;
  box-sizing: border-box;
}
.dianhua {
  width: 44%;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  margin: 0 0 4px 0;
  padding: 0 4px 0 0;
}
.chuanzhen {
  width: 56%;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding-left: 4px;
  margin: 0 0 4px 0px;
}
.grn-phone {
  display: inline-block;
  width: 72%;
  text-align: center;
  border-bottom: 1px solid #000;
  margin-left: 2px;
}
.br-t {
  height: 34px;
  line-height: 34px;
  font-weight: 600;
}
.address {
  line-height: 26px;
  margin-bottom: 4px;
}
.lianxiren {
  display: inline-block;
  width: 306px;
  text-align: center;
  border-bottom: 1px solid #000;
  margin-left: 2px;
}
.grn-youxinag {
  display: inline-block;
  width: 322px;
  text-align: center;
  border-bottom: 1px solid #000;
  margin-left: 2px;
}
.bbottom {
  height: 72px;
  box-sizing: border-box;
  border: 1px solid #000;
  border-top: none;
}
.bb-left {
  width: 50%;
  display: inline-block;
  vertical-align: top;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #000;
}
.bb-right {
  display: inline-block;
  vertical-align: top;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
.kuai {
  display: inline-block;
  vertical-align: top;
  height: 36px;
  line-height: 36px;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid #000;
}
.youkuai {
  display: inline-block;
  vertical-align: top;
  height: 36px;
  line-height: 36px;
  text-align: center;
  box-sizing: border-box;
}
.grn-bbbb {
  border-bottom: 1px solid #000;
  box-sizing: border-box;
}
.tijiaop {
  width: 18%;
  font-weight: 600;
}
.tjpeople {
  width: 28%;
}
.tijiaot {
  width: 22%;
  font-weight: 600;
}
.tjtime {
  width: 32%;
}
</style>

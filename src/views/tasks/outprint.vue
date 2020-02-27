<template>
  <div class="grnbox">
    <div class="grn-contentbox">
      <div class="grn-top">设备与软件接受/返还单</div>
      <div class="grn-topboeder"></div>
      <div class="jcjd">
        <span>&nbsp;&nbsp;&nbsp;检测阶段：{{GRNdata.testphases}}</span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编号：{{GRNdata.serial_number}}</span>
      </div>
      <div class="danwei">
        <span class="danwei-left">委托单位</span>
        <span class="danwei-right">{{GRNdata.company}}</span>
      </div>
      <div class="center">设备基本信息</div>
      <div class="eqtable">
        <table class="grntable">
          <tr>
            <th width="40%">设备名称</th>
            <th width="16%">类型</th>
            <th width="16%">型号</th>
            <th width="16%">序列号</th>
            <th width="12%">数量</th>
          </tr>
          <tr v-for="(item, index) in GRNdata.device_info" :key="index">
            <td style="word-break: break-all;">{{item.device_name}}</td>
            <td style="word-break: break-all;">{{item.device_type}}</td>
            <td style="word-break: break-all;">{{item.device_model}}</td>
            <td style="word-break: break-all;">{{item.device_serialnumber}}</td>
            <td style="word-break: break-all;">{{item.device_count}}</td>
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
          <div class="fanhui-right fanhuigongong">{{GRNdata.expect_back_time}}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="b-danweititle">委托单位:</div>
          <span class="grn-danwei">{{GRNdata.company}}</span>
          <div class="dianhua">电话:<span class="grn-phone">{{GRNdata.phone}}</span></div>
          <div class="address">
            <div style="display: inline-block; vertical-align: top">通信地址:&nbsp;</div>
            <div style="text-decoration: underline; display: inline-block; width: 280px">{{GRNdata.address}}</div>
          </div>
          <div style="margin-bottom: 8px">联系人: <span class="lianxiren">{{GRNdata.linkman}}</span></div>
          <div style="margin-bottom: 8px">邮箱: <span class="grn-youxinag">{{GRNdata.email}}</span></div>
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
            <div class="kuai tjpeople">————</div>
            <div class="kuai tijiaot">提交时间</div>
            <div class="youkuai tjtime">————</div>
          </div>
          <div >
            <div class="kuai tijiaop">领取人</div>
            <div class="kuai tjpeople"></div>
            <div class="kuai tijiaot">领取时间</div>
            <div class="youkuai tjtime">{{time1}}</div>
          </div>
        </div>
        <div class="bb-right">
          <div class="grn-bbbb">
            <div class="kuai tijiaop">接受人</div>
            <div class="kuai tjpeople">————</div>
            <div class="kuai tijiaot">接受时间</div>
            <div class="youkuai tjtime">————</div>
          </div>
          <div >
            <div class="kuai tijiaop">返还人</div>
            <div class="kuai tjpeople">{{GRNdata.restitution_person}}</div>
            <div class="kuai tijiaot">返还时间</div>
            <div class="youkuai tjtime">{{time2}}</div>
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
      GRNdata: {},
      time1: "",
      time2: ""
    };
  },
  methods: {
    router() {
      this.GRNdata.testphases = this.$route.query.testphases;
      this.GRNdata.serial_number = this.$route.query.serial_number;
      this.GRNdata.company = this.$route.query.company;
      this.GRNdata.expect_back_time = this.$route.query.expect_back_time;
      this.GRNdata.phone = this.$route.query.phone;
      this.GRNdata.address = this.$route.query.address;
      this.GRNdata.linkman = this.$route.query.linkman;
      this.GRNdata.email = this.$route.query.email;
      this.GRNdata.recipient = this.$route.query.recipient;
      this.GRNdata.textvalue = this.$route.query.textvalue;
      let device_info2 = [];
      for (let i = 0; i < this.$route.query.device_info.length; i++) {
        device_info2.push(JSON.parse(this.$route.query.device_info[i]))
      }
      this.GRNdata.device_info = device_info2;
      this.time1 = this.$route.query.value1;
      this.time2 = this.$route.query.value2;
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
  },
  mounted() {
    window.print();
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
  width: 1070px;
  /* margin: 0 0 0 180px; */
}
.grn-top {
  text-align: center;
  padding: 10px 0 0 0;
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
  /* height: 154px; */
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
  height: 88px;
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
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid #000;
}
.youkuai {
  display: inline-block;
  vertical-align: top;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-sizing: border-box;
}
.grn-bbbb {
  border-bottom: 1px solid #000;
  box-sizing: border-box;
}
.tijiaop {
  width: 16%;
  font-weight: 600;
}
.tjpeople {
  width: 23%;
}
.tijiaot {
  width: 20%;
  font-weight: 600;
}
.tjtime {
  width: 41%;
}
.timer5 {
  width: 160px !important;
}
</style>

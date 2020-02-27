<template>
  <div class="grnbox">
    <div class="grn-contentbox" style="padding-top: 20px">
      <div class="grn-top">设备环境配置单</div>
      <div class="grn-topboeder"></div>
      <div class="jcjd">
        <span>&nbsp;&nbsp;&nbsp;编号：{{data.bh}}</span>
      </div>
      <div class="danwei">
        <span class="cu_danwei-left">委托单位</span>
        <span class="danwei-right">{{data.company}}</span>
      </div>
      <div class="yangpin">
        <span class="cu_danwei-left">受检设备名称</span>
        <span class="danwei-right">{{data.divicename}}</span>
      </div>
       <div class="eqtable">
        <table class="grntable">
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备型号</td>
            <td width="40%" style="word-break: break-all;">{{data.model}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备序列号</td>
            <td width="40%" style="word-break: break-all;">{{data.serialnumber}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备类型</td>
            <td width="40%" style="word-break: break-all;">{{data.devicetype}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">SIP</td>
            <td width="40%" style="word-break: break-all;">{{data.de_sipid}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">登录用户名</td>
            <td width="40%" style="word-break: break-all;">admin123</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">注册用户名</td>
            <td width="40%" style="word-break: break-all;">admin1234</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">登录密码</td>
            <td width="40%" style="word-break: break-all;">Admin123</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">注册密码</td>
            <td width="40%" style="word-break: break-all;">Admin1234</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">IP</td>
            <td width="40%" style="word-break: break-all;">{{data.de_ip}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">端口</td>
            <td width="40%" style="word-break: break-all;">{{data.de_port}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备域</td>
            <td width="40%" style="word-break: break-all;">{{data.de_field}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备密码</td>
            <td width="40%" style="word-break: break-all;">{{data.de_password}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器IP</td>
            <td width="40%" style="word-break: break-all;">{{data.server_1_ip}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器IP</td>
            <td width="40%" style="word-break: break-all;">{{data.server_2_ip}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器端口</td>
            <td width="40%" style="word-break: break-all;">{{data.server_1_port}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器端口</td>
            <td width="40%" style="word-break: break-all;">{{data.server_2_port}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器SIP</td>
            <td width="40%" style="word-break: break-all;">{{data.server_1_sip}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器SIP</td>
            <td width="40%" style="word-break: break-all;">{{data.server_2_sip}}</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器设备域</td>
            <td width="40%" style="word-break: break-all;">{{data.server_1_field}}</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器设备域</td>
            <td width="40%" style="word-break: break-all;">{{data.server_2_field}}</td>
          </tr>
          <tr>
            <td width="15%" style="word-break: break-all; font-weight: 700">服务器密码</td>
            <td width="35%" style="word-break: break-all;">{{data.server_1_password}}</td>
            <td width="15%" style="word-break: break-all; font-weight: 700">备用服务器密码</td>
            <td width="35%" style="word-break: break-all;">{{data.server_2_password}}</td>
          </tr>
          <tr>
            <td width="15%" style="word-break: break-all; font-weight: 700">工作台编号</td>
            <td width="35%" style="word-break: break-all;">{{data.bench_num}}</td>
            <td width="15%" style="word-break: break-all; font-weight: 700">工作台IP</td>
            <td width="35%" style="word-break: break-all;">{{data.ip_address}}</td>
          </tr>
          <tr>
            <td width="15%" style="word-break: break-all; font-weight: 700">工作台系统版本</td>
            <td colspan="3" style="word-break: break-all;">{{data.system_version}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  methods: {
    router() {
      this.data = this.$route.query;
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
  /* margin: auto; */
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
  margin-bottom: 10px;
  margin-top: 20px;
}
.danwei {
  width: 100%;
  height: 44px;
  border: 1px solid #000;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
}
.yangpin {
  width: 100%;
  height: 44px;
  border: 1px solid #000;
  box-sizing: border-box;
  border-top: none;
  border-bottom: none;
  font-size: 16px;
  font-weight: 600;
}
.cu_danwei-left {
  display: inline-block;
  vertical-align: top;
  height: 44px;
  box-sizing: border-box;
  line-height: 44px;
  width: 15%;
  text-align: center;
  border-right: 1px solid #000;
}
.danwei-right {
  display: inline-block;
  vertical-align: top;
  height: 44px;
  line-height: 44px;
  width: 80%;
  text-align: center;
}
/* 表格信息 */
.grntable {
  width: 100%;
  border-collapse: collapse;
}
.grntable tr th {
  height: 44px;
  line-height: 44px;
}
.grntable tr td {
  height: 44px;
  text-align: center;
}
.grntable,
.grntable tr th,
.grntable tr td {
  border: 1px solid #000;
}
/* 表格样式结束 */
</style>

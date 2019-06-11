<template>
  <div class="grnbox">
    <div class="grn-contentbox">
      <div class="grn-top">设备环境配置单</div>
      <div class="grn-topboeder"></div>
      <div class="jcjd">
        <span>&nbsp;&nbsp;&nbsp;编号：BSP1000000001</span>
      </div>
      <div class="danwei">
        <span class="cu_danwei-left">委托单位</span>
        <span class="danwei-right">奔讯电子科技有限公司</span>
      </div>
      <div class="yangpin">
        <span class="cu_danwei-left">受检设备名称</span>
        <span class="danwei-right">奔讯电子科技有限公司</span>
      </div>
       <div class="eqtable">
        <table class="grntable">
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备型号</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备序列号</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备类型</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">SIP</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">登录用户名</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">注册用户名</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">登录密码</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">注册密码</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">IP</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">端口</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备域</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">设备密码</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器IP</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器IP</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器端口</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器端口</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器SIP</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器SIP</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="10%" style="word-break: break-all; font-weight: 700">服务器设备域</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
            <td width="10%" style="word-break: break-all; font-weight: 700">备用服务器设备域</td>
            <td width="40%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="15%" style="word-break: break-all; font-weight: 700">服务器密码</td>
            <td width="35%" style="word-break: break-all;">aaaaaa</td>
            <td width="15%" style="word-break: break-all; font-weight: 700">备用服务器密码</td>
            <td width="35%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="15%" style="word-break: break-all; font-weight: 700">工作台编号</td>
            <td width="35%" style="word-break: break-all;">aaaaaa</td>
            <td width="15%" style="word-break: break-all; font-weight: 700">工作台IP</td>
            <td width="35%" style="word-break: break-all;">aaaaaa</td>
          </tr>
          <tr>
            <td width="15%" style="word-break: break-all; font-weight: 700">工作台系统版本</td>
            <td colspan="3" style="word-break: break-all;">aaaaaa</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    router() {
      console.log(this.$route.query.id);
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
  width: 1000px;
  margin: auto;
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
  border-bottom: none;
  font-size: 16px;
  font-weight: 600;
}
.cu_danwei-left {
  display: inline-block;
  vertical-align: top;
  height: 34px;
  box-sizing: border-box;
  line-height: 34px;
  width: 15%;
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
/* 表格信息 */
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
/* 表格样式结束 */
</style>

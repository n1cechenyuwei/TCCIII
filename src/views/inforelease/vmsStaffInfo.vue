<template>
  <div class="dp">
    <div class="pvptop">VMS员工信息统计</div>
    <div style="padding: 0 80px;">
      <el-carousel height="840px" indicator-position="none" :interval="3000">
        <el-carousel-item v-for="(item, index) in staffData" :key="index">
          <div class="sl_table">
            <div class="sl_bt">
              <div class="sl_xbg">
                人员
              </div>
              <div class="sl_xbg">
                工号
              </div>
              <div class="sl_xbg gw">
                岗位
              </div>
              <div class="sl_xbg task">
                当前任务
              </div>
              <div class="sl_xbg">
                待执行
              </div>
              <div class="sl_xbg zx">
                已超时
              </div>
            </div>
            <div class="sl_bt2" v-for="(item2, index2) in item" :key="index2">
              <div class="sl_xbg">
                {{item2.staff_name}}
              </div>
              <div class="sl_xbg">
                {{item2.job_number}}
              </div>
              <div class="sl_xbg gw">
                {{item2.duty}}
              </div>
              <div class="sl_xbg task">
                {{item2.current_task}}
              </div>
              <div class="sl_xbg">
                {{item2.to_be_execute_count}}
              </div>
              <div class="sl_xbg zx">
                {{item2.timeout_count}}
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffData: []
    };
  },
  methods: {
    async getdata() {
      const res = await this.$http.get("vmsstaffinfo");
      if (res.data.status === 200) {
        for (let i = 0; i < res.data.userinfo.length; i += 9) {
          this.staffData.push(res.data.userinfo.slice(i, i + 9));
        }
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.getdata();
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
.sl_table {
  background-color: none;
}
.sl_bt {
  border: 2px solid #409eff;
  height: 80px;
  display: flex;
  color: #fff;
  font-size: 24px;
  background-color: rgba(22, 82, 111, 0.5);
}
.sl_xbg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  border-right: 2px solid #409eff;
}
.gw.sl_xbg {
  width: 328px !important;
}
.task.sl_xbg {
  width: 580px !important;
  padding: 0 10px;
  text-align: center;
  overflow-y: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}
.zx.sl_xbg {
  border: none !important;
}
.sl_bt2 {
  border: 2px solid #409eff;
  height: 80px;
  display: flex;
  color: #fff;
  font-size: 24px;
  border-top: none;
}
</style>

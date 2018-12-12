<template>
  <el-container class="task-box">
    <el-aside width="220px">
      <div class="taskmenu-box">
        <el-menu
          default-active="/mytask"
          @select="handleSelect"
          class="el-menu-vertical-demo taskmenu"
          :router="true"
          >
          <el-submenu index="1">
            <template slot="title">
              <span class="taskmenu-tittle">任务</span>
            </template>
            <el-menu-item index="/mytask" class="zuobian">我的任务</el-menu-item>
            <el-menu-item index="/tasked" class="zuobian">已完成任务</el-menu-item>
            <el-menu-item index="/alltask" class="zuobian">全部任务</el-menu-item>
          </el-submenu>
          <el-menu-item index="/taskStatistical">
            <span slot="title" class="taskmenu-tittle">任务统计</span>
          </el-menu-item>
          <el-menu-item index="/taskallot">
            <span slot="title" class="taskmenu-tittle">任务分配</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-main class="task-content">
      <div class="task-content-box">
        <router-view></router-view>
      </div>
    </el-main>
    <!-- 审批任务设备详情弹出框 -->
    <el-dialog
      title="设备详情"
      :visible.sync="$store.state.DialogEquipment"
      width="70%"
      center>
      <el-table
        :data="$store.state.appeqlist"
        border
        height="480"
        style="width: 100%">
        <el-table-column
          prop="temdid"
          align="center"
          label="设备编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="type"
          show-overflow-tooltip
          width="160"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="model"
          width="160"
          show-overflow-tooltip
          label="硬件型号">
        </el-table-column>
        <el-table-column
          prop="version"
          show-overflow-tooltip
          width="100"
          label="软件版本">
        </el-table-column>
        <el-table-column
          width="160"
          show-overflow-tooltip
          prop="serialnumber"
          label="出厂序列号">
        </el-table-column>
        <el-table-column
          width="200"
          prop="manufacturers"
          show-overflow-tooltip
          label="生产厂家">
        </el-table-column>
        <el-table-column
          width="140"
          align="center"
          show-overflow-tooltip
          label="生产厂家营业执照">
          <template slot-scope="scope">
            <i class="iconfont icon-yingyezhizhao" @click="eqimg(scope.row.temdid)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="50%"
        @close="yyzzimgclose"
        center
        title="生产厂家营业执照"
        :visible.sync="eqimgshow"
        append-to-body>
        <img :src="eqimgdata" alt="图片丢失了" width="100%">
      </el-dialog>
    </el-dialog>
    <!-- 营业执照弹窗 -->
    <el-dialog
      :visible.sync="$store.state.opyyzz"
      @closed="$store.commit('closeyyzz')"
      width="50%">
      <img width="100%" :src="$store.state.license" alt="照片丢失了">
    </el-dialog>
    <!-- 设备入库任务操作弹出框 -->
    <el-dialog
      class="dialogeq-open-box"
      title="设备详情"
      :visible.sync="$store.state.Dialogshebei"
      width="30%">
      <div class="dialogeq-open">
        <el-form label-width="100px" :model="$store.state.diaeqopen" label-suffix=":" size="small">
          <el-form-item label="设备名称">
            <span class="wwwwww" :model="$store.state.diaeqopen.eqname">{{$store.state.diaeqopen.eqname}}</span>
          </el-form-item>
          <el-form-item label="设备类型">
            <span class="wwwwww" :model="$store.state.diaeqopen.eqtype">{{$store.state.diaeqopen.eqtype}}</span>
          </el-form-item>
          <el-form-item label="设备型号">
            <span class="wwwwww" :model="$store.state.diaeqopen.xinghao">{{$store.state.diaeqopen.xinghao}}</span>
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input class="wwwwww" v-model="$store.state.diaeqopen.bianhao" placeholder="请填写设备编号"></el-input>
          </el-form-item>
          <el-form-item label="出厂序列号">
            <el-input class="wwwwww" v-model="$store.state.diaeqopen.iem" placeholder="请填写出厂序列号"></el-input>
          </el-form-item>
          <el-form-item label="送检人">
            <el-input class="wwwwww" v-model="$store.state.diaeqopen.people" placeholder="请填写送检人"></el-input>
          </el-form-item>
          <el-form-item label="送检时间">
            <el-date-picker
              class="wwwwww"
              v-model="$store.state.diaeqopen.time"
              value-format="yyyy-MM-dd">
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备外观">
            <el-select class="dialog-open-select wwwwww" v-model="$store.state.diaeqopen.waiguan" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上电检查">
            <el-select class="dialog-open-select wwwwww" v-model="$store.state.diaeqopen.dian" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-select class="dialog-open-select wwwwww" v-model="$store.state.diaeqopen.status" placeholder="请选择">
              <el-option label="已入库" value="已入库"></el-option>
              <el-option label="未入库" value="未入库"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogeq-open-btn">
        <el-button plain type="success" size="small" @click="$store.commit('putstoragedialogclose')">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="$store.dispatch('putstoragedialogsubmit')">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      abc: "",
      eqimgshow: false, //设备生产厂家照片显示
      eqimgdata: "", //生厂厂家照片
    };
  },
  created() {
    this.$router.push({ name: "mytask" });
  },
  methods: {
    // 选中菜单关闭右侧滑块
    handleSelect() {
      this.$store.commit("taskhuakuaihidden");
    },
    // 点击设备图标，查看图片
    async eqimg(id) {
      this.eqimgshow = true;
      const date = new Date().getTime();
      this.eqimgdata = `http://192.168.1.186:8888/api/v1.0/showdevicelicense/${id}?${date}`;
    },
    // dialog关闭设备营业图片消失
    yyzzimgclose() {
      this.eqimgdata = "";
    }
  }
};
</script>

<style>
.task-box {
  height: 100%;
  box-sizing: border-box;
  /* min-width: 1920px; */
}
.taskmenu-box {
  width: 220px;
  height: 100%;
  box-sizing: border-box;
  padding: 6px 0;
  background-color: #fff;
  /* border-top-right-radius: 6px; */
  border-bottom-right-radius: 6px;
  border: 1px solid #d4d7d7;
  border-left: 0;
  border-right: 1px solid #d4d7d7;
}
.taskmenu-box .taskmenu {
  height: 100%;
}
.zuobian {
  margin-left: 30px;
  font-size: 16px;
}
.taskmenu-box .el-menu-vertical-demo.taskmenu.el-menu {
  border-right: 0;
}
.taskmenu-box .el-menu-item.zuobian {
  min-width: 188px !important;
}
.taskmenu-box .el-menu-item.zuobian.is-active {
  border-left: 2px solid #409eff;
  background-color: #f1f9fe;
  min-width: 180px !important;
  width: 189px;
  padding-left: 38px !important;
}
.task-content {
  padding: 0 0 0 10px;
  height: 100%;
  min-height: 800px;
}
.task-content-box {
  border: 1px solid #d4d7d7;
  height: 100%;
  background-color: #fff;
  /* border-radius: 6px; */
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  box-sizing: border-box;
}
.taskmenu-tittle {
  font-size: 18px;
}
.dialogeq-open-box .el-dialog__body {
  padding: 15px 25px 30px 25px;
}
.dialogeq-open {
  padding-left: 80px;
  width: 320px;
}
.dialogeq-open-btn {
  text-align: center;
}
.dialog-open-select {
  width: 220px;
}
.wwwwww {
  margin-left: 10px;
}
.dialogbtn-right {
  margin-left: 30px !important;
}
</style>

<template>
  <div class="aaaaa">
    <div class="mytask-boxbox">
      <div class="mytask-content-top">
        <el-dropdown
          @command="handleCommand"
          placement="bottom-start"
          class="mytask-dropdown">
          <el-button type="primary" size="small">
            筛选<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">按开始时间(最新)</el-dropdown-item>
            <el-dropdown-item command="b">按结束时间(最新)</el-dropdown-item>
            <el-dropdown-item command="c">按任务进度(最新)</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="search-box">
          <el-input
            size="small"
            class="mytasksearch"
            placeholder="请输入任务名称"
            v-model="mytasksearch">
          </el-input>
          <i class="el-icon-search sreach-icon"></i>      
        </div>     
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
      <div class="mytask-content-middle">
        <div class="mytask-content-table">
          <el-table
            v-loading="loading"
            @row-click="rowclick"
            :data="$store.state.task"
            class="mytask-content-table-one"
            stripe
            style="width: 100%">
            <el-table-column
              prop="objid"
              align="center"
              label="编号"
              width="120">
            </el-table-column>
            <el-table-column
              label="名称">
              <template slot-scope="scope">
                <span class="colcell">{{ scope.row.objname }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="objproject"
              label="所属项目">
            </el-table-column>
            <el-table-column
              prop="objpeople"
              label="负责人">
            </el-table-column>
            <el-table-column
              prop="objtime[0]"
              label="起始日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="objtime[1]"
              label="到期日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="objprogress"
              width="100"
              label="进度">
            </el-table-column>
            <el-table-column
              width="150"
              label="状态">
              <template slot-scope="scope">
                <span v-bind:class="{warning: (scope.row.objstatus === '超时')}">{{ scope.row.objstatus}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            :current-page.sync="currentPage"
            @current-change="handlePageChange"
            :page-size="taskpagesize"
            layout="total, prev, pager, next, jumper"
            :total="taskpagetotal">
          </el-pagination>
        </div>
        <div :class="{ 'hidden': noShow, 'sard': isShow }">
          <div class="taskright-title">
            <i class="iconfont icon-renwu"></i>
            <i class="fontt">任务</i>
            <i class="el-icon-close iicon" @click="close"></i>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <el-dialog
      title="设备详情"
      :visible.sync="$store.state.DialogEquipment"
      width="30%"
      center>
      1111111111111
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mytasksearch: "", //搜索框内容
      taskpagetotal: 100, //任务总条数
      currentPage: 1, //默认第几页
      taskpagesize: 10, //每页显示几条
      isShow: true, //显示右侧卡片
      noShow: true, //控制是否滑出卡片
      loading: false //加载图标
    };
  },
  created() {},
  methods: {
    //筛选按钮时间
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    handlePageChange(val) {
      console.log(val);
    },
    //表格行点击
    rowclick(row) {
      console.log(row);
      this.noShow = false;
      this.isShow = true;
      this.$router.push({ name: "approvalcontract" });
    },
    close() {
      this.noShow = true;
      this.isShow = false;
    }
  }
};
</script>

<style>
.aaaaa {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.mytask-content-top {
  height: 54px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  /* border-top-right-radius: 6px; */
  border-bottom: 1px solid #e8e8e8;
}
.mytasksearch {
  width: 300px;
  margin-top: 11px;
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
}
.sreach-icon {
  position: absolute;
  top: 0px;
}
.mytask-dropdown {
  margin-left: 30px;
}
.mytask-content-middle {
  border-top: 1px solid #c6e7ff;
  margin-top: 10px;
  height: 100%;
}
.mytask-content-middle .page {
  margin-left: 30px;
}
.warning {
  color: #e6a23c;
}
.mytask-content-middle .colcell {
  cursor: Pointer;
}
.mytask-content-table {
  height: 100%;
}
.mytask-content-table-one {
  font-size: 16px;
}
.sard {
  top: 0;
  right: 0;
  position: absolute;
  background-color: #f0f4f8;
  box-shadow: 0px 0px 4px 3px #acd2fa;
  border-radius: 6px;
  height: 100%;
  width: 940px;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  -os-transition: all 0.5s;
  -os-transform: translateX(0%);
  transform: translateX(0%);
}
.hidden {
  top: 0;
  right: 0;
  z-index: 99999;
  position: absolute;
  background-color: #f0f4f8;
  box-shadow: 0px 0px 4px 3px #acd2fa;
  border-radius: 6px;
  height: 100%;
  width: 940px;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  -os-transition: all 0.5s;
  -os-transform: translateX(110%);
  transform: translateX(110%);
}
.taskright-title {
  height: 54px;
  line-height: 54px;
  background-color: #fff;
  padding-left: 20px;
  position: relative;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #dae9f9;
  margin-bottom: 8px;
}
.taskright-title .fontt {
  position: absolute;
  top: 0px;
  left: 60px;
  font-size: 22px;
  color: #4d5d71;
  font-family: Microsoft YaHei;
}
.taskright-title .iicon {
  position: absolute;
  right: 17px;
  top: 14px;
  color: #777777;
  font-size: 24px;
  cursor: Pointer;
}
.icon-renwu {
  font-size: 32px;
  color: #1ac7ff;
}
.box-card {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 500px;
}
.mytask-content-table .el-table::before {
  height: 0 !important;
}
</style>

<template>
  <div>
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
          placeholder="请输入受检单位名称"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="reportssearch">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="eqpislist"
          class="mytask-content-table-one"
          stripe
          max-height="720"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-card v-for="(item, index) in scope.row.projectinfo" :key="index" class="inspeccard" shadow="hover">
                <div slot="header">
                  <span>项目名称：<span class="projectpush" @click="push(item)">{{item.proname}}</span></span>
                </div>
                <div class="text item">
                  <span>项目进度：{{item.sechedule}}%</span>
                </div>
              </el-card>
            </template>
          </el-table-column>
          <el-table-column
            prop="company"
            show-overflow-tooltip
            label="单位名称">
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            label="单位地址">
          </el-table-column>
          <el-table-column
            prop="linkman"
            width="120"
            show-overflow-tooltip
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="legalpersonphone"
            width="150"
            show-overflow-tooltip
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="email"
            width="180"
            show-overflow-tooltip
            label="电子邮箱">
          </el-table-column>
          <el-table-column
            width="100"
            show-overflow-tooltip
            label="通过率">
            <template slot-scope="scope">
              <span>{{scope.row.pass_rate}}%</span>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            align="center"
            label="营业执照">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-view" @click="showimg(scope.row.license_url)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            label="信用等级">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.star"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="taskpage"
        :current-page.sync="currentPage"
        @current-change="handleprojectChange"
        :page-size="taskpagesize"
        layout="total, prev, pager, next, jumper"
        :total="eqpistotal">
      </el-pagination>
    </div>
    <el-dialog
      title="营业执照"
      @closed="insimgclose"
      :visible.sync="imgshow"
      width="960px">
      <img width="100%" :src="imgpath" alt="照片丢失了">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgshow: false,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      imgpath: ""
    };
  },
  methods: {
    //筛选按钮
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    handleprojectChange(val) {
      this.getinspec(val);
    },
    // 获取受检单位信息
    async getinspec(page) {
      const res = await this.$http.post(`outercompanies/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.companyinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    showimg(path) {
      this.imgpath = path;
      this.imgshow = true;
    },
    insimgclose() {
      this.imgpath = "";
    },
    // 项目跳转
    push(row) {
      if (row.pro_iscomplete === 0) {
        this.$router.push({
          name: "project",
          params: {
            id: row.id,
            path: "/goingproject",
            name: "进行中项目"
          }
        });
      } else if (row.pro_iscomplete === 1) {
        this.$router.push({
          name: "project",
          params: {
            id: row.id,
            path: "/projected",
            name: "已完成项目"
          }
        });
      }
    },
    // 搜索按钮
    reportssearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.getinspec(1);
      }
    }
  },
  created() {
    this.getinspec(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.getinspec(1);
      }
    }
  }
};
</script>

<style>
.mytask-content-top {
  height: 54px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
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
.mytask-content-middle .colcell {
  cursor: Pointer;
}
.mytask-content-middle .colcell:hover {
  color: #409eff;
}
.mytask-content-table {
  height: 720px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.inspeccard {
  width: 500px;
  display: inline-block;
  margin: 0 10px 6px 0px;
}
.projectpush {
  cursor: pointer;
}
.projectpush:hover {
  color: #409eff;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
</style>

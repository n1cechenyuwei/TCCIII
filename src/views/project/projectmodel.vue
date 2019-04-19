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
          placeholder="请输入项目名称"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="projectsearch">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one"
          stripe
          style="width: 100%">
          <el-table-column
            prop="pro_id"
            align="center"
            label="项目编号"
            width="120">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="项目名称">
            <template slot-scope="scope">
              <span class="colcell" @click="rownameclick(scope.row)">{{ scope.row.pro_name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="starttime"
            label="起始日"
            width="180">
          </el-table-column>
          <el-table-column
            prop="endtime"
            label="到期日"
            width="180">
          </el-table-column>
          <el-table-column
            width="100"
            label="进度">
            <template slot-scope="scope">
              <span>{{scope.row.sechedule}}%</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="申请检测类型">
            <template slot-scope="scope">
              <span>{{scope.row.testtype}}</span>
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
        :total="projecttotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prostatus", "prosearch"],
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      projectlist: [],
      myprojectsearch: "",
      allprojectsearch: this.prosearch,
      propstatus: this.prostatus,
      searchtype: "1" // 搜索类型
    };
  },
  methods: {
    rownameclick(row) {
      if (this.propstatus === "projectlist") {
        this.$router.push({
          name: "projectdetails",
          params: {
            id: row.pro_id,
            path: "/goingproject",
            name: "进行中项目"
          }
        });
      } else {
        this.$router.push({
          name: "projectdetails",
          params: {
            id: row.pro_id,
            path: "/projected",
            name: "已完成项目"
          }
        });
      }
    },
    //筛选按钮
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    async projecteddata(page) {
      const res = await this.$http.get(`${this.propstatus}/${page}`);
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.project_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleprojectChange(val) {
      if (this.searchtype === "1") {
        this.projecteddata(val);
      } else if (this.searchtype === "2") {
        this.searchfnc(val);
      }
    },
    // 搜索按钮
    projectsearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.searchtype = "2";
        this.searchfnc(1);
      }
    },
    // 搜索请求
    async searchfnc(page) {
      const res = await this.$http.post(`${this.allprojectsearch}/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.project_list;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.projecteddata(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.searchtype = "1";
        this.projecteddata(1);
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
</style>

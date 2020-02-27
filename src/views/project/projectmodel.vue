<template>
  <div>
    <div class="mytask-content-top">
      <div class="search-box">
        <span class="top_title">项目名称</span>
        <el-input
          size="small"
          class="myprosearch"
          placeholder="请输入项目名称"
          @keyup.enter.native="projectsearch"
          v-model="search">
        </el-input>
        <span class="top_title">开始时间</span>
        <el-date-picker
          v-model="end_stime"
          value-format="yyyy-MM-dd"
          class="top_input"
          type="date"
          size="small"
          placeholder="选择日期">
        </el-date-picker>
        <span class="top_title">结束时间</span>
        <el-date-picker
          v-model="end_etime"
          class="top_input"
          value-format="yyyy-MM-dd"
          type="date"
          size="small"
          placeholder="选择日期">
        </el-date-picker>
        <span class="top_title">申请类型</span>
        <el-select v-model="testtype" class="top_input" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="top_title">申请单位</span>
        <el-select v-model="company_id" style="width: 200px; margin-right: 30px" size="small" placeholder="请选择">
          <el-option
            v-for="item in companyoptions"
            :key="item.id"
            :label="item.company"
            :value="item.id">
          </el-option>
        </el-select>
      </div>     
      <el-button type="primary" size="mini" @click="projectsearch">搜索</el-button>
      <el-button type="warning" size="mini" @click="projectcz">重置</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-tableje">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one"
          stripe
          style="width: 100%">
          <el-table-column
            prop="pro_id"
            align="center"
            label="项目编号"
            show-overflow-tooltip
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
            prop="applycompany"
            label="申请单位"
            show-overflow-tooltip
            width="400">
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
  props: ["prostatus", "prosearch", "sxrequest"],
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      projectlist: [],
      search: "",
      allprojectsearch: this.prosearch,
      propstatus: this.prostatus,
      projclick: "",
      options: [
        {
          value: "vms",
          label: "VMS"
        },
        {
          value: "pis",
          label: "PIS"
        }
      ],
      testtype: "",
      end_stime: "",
      end_etime: "",
      company_id: "",
      companyoptions: []
    };
  },
  methods: {
    rownameclick(row) {
      if (this.projclick === 1) {
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
      } else {
        this.$message.error("没有该权限");
      }
    },
    projectcz() {
      this.end_stime = "";
      this.end_etime = "";
      this.search = "";
      this.testtype = "";
      this.company_id = "";
      this.projecteddata(1);
    },
    async projecteddata(page) {
      if (this.company_id === "") {
        this.company_id = null;
      }
      const res = await this.$http.post(`${this.propstatus}/${page}`, {
        end_stime: this.end_stime,
        end_etime: this.end_etime,
        search: this.search,
        testtype: this.testtype,
        company_id: this.company_id
      });
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.project_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    conver(s) {
      return s < 10 ? "0" + s : s;
    },
    handleprojectChange(val) {
      this.projecteddata(val);
    },
    // 搜索按钮
    projectsearch() {
      this.projecteddata(1);
    },
    async project_click() {
      const res = await this.$http.get("getpermistree");
      if (res.data.permis_list) {
        for (const item of res.data.permis_list) {
          if (item.route === "/project") {
            for (const li2 of item.children) {
              if (li2.name === "项目") {
                for (const li3 of li2.children) {
                  if (li3.route === "/projectdetails") {
                    this.projclick = 1;
                    break;
                  }
                }
              }
            }
          }
        }
      } else {
        this.$router.push({ name: "login" });
        this.$message.error("登陆过期，请重新登录");
      }
    },
    async company() {
      const res = await this.$http.get("applycompany");
      if (res.data.status === 200) {
        this.companyoptions = res.data.companies;
      }
    }
  },
  created() {
    this.projecteddata(this.currentPage);
    this.project_click();
    this.company();
  },
  watch: {
    search(val) {
      if (val === "") {
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
.mytask-boxbox {
  height: 798px;
}
.mytask-content-tableje {
  height: 760px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.myprosearch {
  width: 200px;
  margin-top: 11px;
  margin-right: 10px;
  position: relative;
}
.mytask-dropdown {
  margin-left: 30px;
}
</style>

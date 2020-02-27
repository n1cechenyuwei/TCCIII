<template>
  <div>
    <div class="mytask-content-top">
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入想查找的内容"
          @keyup.enter.native="projectsearch"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="projectsearch">搜索</el-button>
      <el-button type="success" size="mini" @click="logsvs = true">导出日志</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-tableje">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one"
          stripe
          style="width: 100%">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="opertioner"
            label="操作人员"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ip_address"
            label="IP地址"
            width="180">
          </el-table-column>
          <el-table-column
            prop="op_time"
            label="操作日期"
            width="200">
          </el-table-column>
          <el-table-column
            prop="op_content"
            show-overflow-tooltip
            label="操作记录">
          </el-table-column>
          <el-table-column
            width="80"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="deletelog(scope.row.id)" size="mini" icon="el-icon-delete"></el-button>
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
    <el-dialog
      title="导出日志"
      :visible.sync="logsvs"
      center
      width="576px">
      <div class="sp_picker">
        <span style="font-size: 16px">日志开始时间</span>
        <el-date-picker
          v-model="datevalue1"
          type="datetime"
          style="margin: 0 10px 0 30px"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="sp_picker">
        <span style="font-size: 16px">日志截止时间</span>
        <el-date-picker
          v-model="datevalue2"
          type="datetime"
          style="margin: 0 10px 0 30px"
          size="small"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="deca-btn">
        <el-button plain  size="small" @click="logsvs = false">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="handlelogs">导出日志</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logsvs: false,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      projectlist: [],
      myprojectsearch: "",
      searchtype: "1", // 搜索类型
      datevalue2: "",
      datevalue1: ""
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
    async logsdata(page) {
      const res = await this.$http.post(`loglist/${page}`, {
        keyword: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.logs;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleprojectChange(val) {
      if (this.searchtype === "1") {
        this.logsdata(val);
      } else if (this.searchtype === "2") {
        this.logsdata(val);
      }
    },
    deletelog(id) {
      this.$confirm("确定要删除该日志吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`log/${id}`);
          if (res.data.status === 200) {
            this.$message.success("删除日志成功");
            this.logsdata(this.currentPage);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 搜索按钮
    projectsearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.searchtype = "2";
        this.logsdata(1);
      }
    },
    async handlelogs() {
      if (this.datevalue1 === "" || this.datevalue2 === "") {
        this.$message.error("请选择导出日志时间范围");
      } else {
        const res = await this.$http.get(
          `exportlogs/${this.datevalue1}/${this.datevalue2}`
        );
        if (res.data.status === 200) {
          this.logsvs = false;
          let _form = document.createElement("FORM");
          _form.setAttribute("method", "get");
          _form.setAttribute("action", res.data.download_path);
          document.body.appendChild(_form);
          _form.submit();
        } else {
          this.$message.error(res.data.msg);
        }
      }
    }
  },
  created() {
    this.logsdata(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.searchtype = "1";
        this.logsdata(1);
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
.sp_picker {
  margin: 0 0 20px 50px;
}
</style>

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
          placeholder="请输入合同名称"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="contractsearch">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="convmslist"
          class="mytask-content-table-one"
          stripe
          max-height="720"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-card shadow="hover" class="htcard">
                <span class="httitle">合同期限：</span>
                <span class="htcontent">
                  <span v-show="editdateshow">{{scope.row.com_starttime}} 至 {{scope.row.com_endtime}}</span>
                  <el-button class="moneybtn" v-show="editdateshow" type="primary" size="mini" @click="dateedit(scope.row.com_starttime, scope.row.com_endtime)">修改</el-button>
                  <el-date-picker
                    v-model="htdate"
                    v-if="inputdateshow"
                    type="daterange"
                    size="mini"
                    class="timeinput"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                  <el-button class="moneybtn" v-show="inputdateshow" type="primary" size="mini" @click="handledate(scope.row.com_no)">提交</el-button>
                </span>
                <span class="httitle">合同金额：</span>
                <span class="htcontent-right">
                  <span v-show="editshow">{{scope.row.money}}</span>
                  <el-button class="moneybtn" v-show="editshow" type="primary" size="mini" @click="moneyedit(scope.row.money)">修改</el-button>
                  <el-input v-show="inputisshow" size="mini" class="jineinput" v-model.trim="htmoney" placeholder="请输入合同金额"></el-input>
                  <el-button class="moneybtn" v-show="inputisshow" type="primary" size="mini" @click="handlemoney(scope.row.com_no)">提交</el-button>
                </span>
              </el-card>
              <el-card shadow="hover" class="htcard">
                <el-table
                  :data="scope.row.draft_accessory_list"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    align="center"
                    label="初稿">
                    <el-table-column
                      prop="name"
                      label="合同名称"
                      width="550">
                    </el-table-column>
                    <el-table-column
                      prop="createtime"
                      label="生成时间">
                    </el-table-column>
                    <el-table-column
                      prop="createtime"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      width="150"
                      label="操作">
                      <template slot-scope="scopehetong">
                        <a :href="scopehetong.row.download_url" :download="scopehetong.row.download_url">
                          <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                        </a>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </el-card>
              <el-card shadow="hover" class="htcard">
                <el-table
                  :data="scope.row.final_accessory_list"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    align="center"
                    label="终稿">
                    <el-table-column
                      prop="name"
                      label="合同名称"
                      width="550">
                    </el-table-column>
                    <el-table-column
                      prop="createtime"
                      label="生成时间">
                    </el-table-column>
                    <el-table-column
                      prop="createtime"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      width="150"
                      label="操作">
                      <template slot-scope="scopezg">
                        <a :href="scopezg.row.download_url" :download="scopezg.row.download_url">
                          <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
                        </a>
                        <el-button class="debtn" type="danger" size="mini" icon="el-icon-delete" @click="htdelete(scopezg.row.id)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </el-card>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="com_no"
            align="center"
            show-overflow-tooltip
            label="合同编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="pact_name"
            show-overflow-tooltip
            label="合同名称">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="所属项目">
            <template slot-scope="scope">
              <span
                class="proje"
                @click="goproject(scope.row.proid, scope.row.pro_iscomplete)">
                {{scope.row.proname}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="first_party"
            show-overflow-tooltip
            label="甲方公司">
          </el-table-column>
          <el-table-column
            prop="signing_time"
            width="150"
            show-overflow-tooltip
            label="签订时间">
          </el-table-column>
          <el-table-column
            width="150"
            show-overflow-tooltip
            prop="signing_state"
            label="签订状态">
            <template slot-scope="scope">
              <span v-bind:class="{qianding: (scope.row.signing_state === '签订成功'), qiandinglose: (scope.row.signing_state === '签订失败')}">{{scope.row.signing_state}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-upload
                class="upload-demo"
                accept=".docx, .pdf, .xlsx, .txt"
                name="compactfile"
                :action="$store.state.baseurl + 'uploadcompact'"
                :show-file-list="false"
                :on-success="uploadsuccess"
                :on-error="uploaderror"
                :data="{ com_no: scope.row.com_no }"
                :multiple="false">
                <el-button size="mini" type="primary">上传终稿</el-button>
              </el-upload>
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
        :total="convmstotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contractstatus"],
  data() {
    return {
      contracttype: this.contractstatus,
      currentPage: 1, //默认第几页
      taskpagesize: 13, //每页显示几条
      convmstotal: 0,
      convmslist: [],
      myprojectsearch: "",
      download_url: "", // 选择器绑定合同下载的地址
      btn_download_url: "", // 下载按钮绑定的合同下载地址
      inputisshow: false, // 合同输入框是否显示
      htmoney: "",
      htdate: [], // 合同期限
      editshow: true,
      editdateshow: true,
      inputdateshow: false
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
    // 上传成功
    uploadsuccess() {
      this.$message.success("上传成功");
      this.contract(this.currentPage);
    },
    uploaderror(err) {
      this.$message.error("上传失败");
    },
    // 获取合同数据
    async contract(page) {
      const res = await this.$http.post(`${this.contracttype}/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.convmstotal = res.data.total_num;
        this.convmslist = res.data.pacts_list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    moneyedit(money) {
      this.htmoney = money;
      this.inputisshow = true;
      this.editshow = false;
    },
    // 提交金额
    async handlemoney(id) {
      if (this.htmoney === "") {
        this.$message.warning("请输入合同金额");
      } else {
        const res = await this.$http.put(`updatecompact/${id}`, { com_money: this.htmoney });
        if (res.status === 200) {
          this.$message.success("修改合同金额成功");
          this.contract(this.currentPage);
          this.inputisshow = false;
          this.editshow = true;
        } else {
          this.inputisshow = false;
          this.editshow = true;
          this.$message.error(res.msg);
        }
      }
    },
    dateedit(start, end) {
      this.htdate[0] = start;
      this.htdate[1] = end;
      this.editdateshow = false;
      this.inputdateshow = true;
    },
    // 修改时间提交
    async handledate(id) {
      if (this.htdate === null) {
        this.$message.warning("请选择合同期限");
      } else {
        const res = await this.$http.put(`updatecompact/${id}`,{
          com_starttime: this.htdate[0],
          com_endtime: this.htdate[1]
        });
        if (res.status === 200) {
          this.$message.success("修改合同期限成功");
          this.contract(this.currentPage);
          this.editdateshow = true;
          this.inputdateshow = false;
        } else {
          this.editdateshow = true;
          this.inputdateshow = false;
          this.$message.error(res.msg);
        }
      }
    },
    // 删除合同
    htdelete(id) {
      this.$confirm("确定要删除该合同吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`dropfinalcompact/${id}`);
          console.log(res)
          if (res.status === 200) {
            this.$message.success("删除合同初稿成功"); 
            this.contract(this.currentPage);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    handleprojectChange(val) {
      this.contract(val);
    },
    goproject(projectid, router) {
      if (router === 0) {
        this.$router.push({
          name: "project",
          params: {
            id: projectid,
            path: "/goingproject",
            name: "进行中项目"
          }
        });
      } else if (router === 1) {
        this.$router.push({
          name: "project",
          params: {
            id: projectid,
            path: "/projected",
            name: "已完成项目"
          }
        });
      }
    },
    // 搜索按钮
    contractsearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.contract(1);
      }
    }
  },
  created() {
    this.contract(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.contract(1);
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
.qianding {
  color: #409eff;
}
.qiandinglose {
  color: #e6a23c;
}
.hetongselect {
  width: 150px;
}
.jineinput {
  width: 200px;
}
.httitle {
  color: #99a9bf;
}
.htcontent {
  color: #606266;
  display: inline-block;
  width: 600px;
}
.htcontent-right {
  color: #606266;
  display: inline-block;
}
.moneybtn {
  margin-left: 20px;
}
.htcard {
  margin: 0px 0 12px 0;
}
.timeinput {
  width: 240px !important;
}
.debtn {
  margin-left: 10px;
}
.proje {
  cursor: pointer;
}
.proje:hover {
  color: #409eff;
}
</style>

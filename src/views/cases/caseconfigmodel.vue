<template>
  <div>
    <div>
      <el-tabs stretch class="workcaseconfig-box" @tab-click="tabclick" value="0">
        <el-tab-pane label="申请审批" name="0">
          <el-table
            class="mytask-content-table-one"
            :data="shenpiData"
            style="width: 100%">
            <el-table-column
              prop="taskname"
              label="任务名称">
            </el-table-column>
            <el-table-column
              prop="days"
              label="执行时间">
              <template slot-scope="scope">
                <el-input
                  class="day-btn"
                  size="mini"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  ng-pattern="/[^a-zA-Z]/"
                  v-model.number="scope.row.days">
                </el-input>
                <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button @click="subday(scope.row.id, scope.row.days)" type="primary" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="签订合同" name="1">
          <el-table
            class="mytask-content-table-one"
            :data="hetongData"
            style="width: 100%">
            <el-table-column
              prop="taskname"
              label="任务名称">
            </el-table-column>
            <el-table-column
              prop="days"
              label="执行时间">
              <template slot-scope="scope">
                <el-input
                  class="day-btn"
                  size="mini"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  ng-pattern="/[^a-zA-Z]/"
                  v-model.number="scope.row.days">
                </el-input>
                <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button @click="subday(scope.row.id, scope.row.days)" type="primary" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设备入库" name="2">
          <el-table
            class="mytask-content-table-one"
            :data="rukudata"
            style="width: 100%">
            <el-table-column
              prop="taskname"
              label="任务名称">
            </el-table-column>
            <el-table-column
              prop="days"
              label="执行时间">
              <template slot-scope="scope">
                <el-input
                  class="day-btn"
                  size="mini"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  ng-pattern="/[^a-zA-Z]/"
                  v-model.number="scope.row.days">
                </el-input>
                <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button @click="subday(scope.row.id, scope.row.days)" type="primary" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="环境配置" name="3">
          <el-table
            class="mytask-content-table-one"
            :data="huanjingdata"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="受检设备类型">
            </el-table-column>
            <el-table-column
              prop="taskinfo[0].days"
              label="执行时间">
              <template slot-scope="scope">
                <el-input
                  class="day-btn"
                  size="mini"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  ng-pattern="/[^a-zA-Z]/"
                  v-model.number="scope.row.taskinfo[0].days">
                </el-input>
                <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button @click="subday(scope.row.taskinfo[0].id, scope.row.taskinfo[0].days)" type="primary" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="执行检测" name="4">
          <el-table
            :data="eqpislist"
            v-loading="loading"
            class="mytask-content-table-one"
            stripe
            max-height="800"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.taskinfo" :key="index" class="caseitembox">
                  <el-card shadow="hover">
                    <div class="itemtitle">
                      <div class="cases-list caseslist_left">
                        任务名：{{item.taskname}}
                      </div>
                      <div class="cases-list caseslist_center">
                        执行顺序：<span>{{item.sequence}}</span>
                      </div>
                      <div class="cases-list">
                        执行天数：
                        <el-input
                          class="day-btn"
                          size="mini"
                          onkeyup="value=value.replace(/[^\d]/g,'')"
                          ng-pattern="/[^a-zA-Z]/"
                          v-model.number="item.days">
                        </el-input>
                        <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <el-button @click="subday(item.id, item.days)" type="primary" size="mini">修改</el-button>
                      </div>
                    </div>
                    <div v-show="item.taskname.search('外委') === -1 && item.taskname.search('审核') === -1" class="cases-list cases-listtitle">检测用例：</div>
                    <div v-show="item.taskname.search('外委') === -1 && item.taskname.search('审核') === -1" class="cases-list cases-listcontent">
                      <el-button v-show="item.cases.length < 1 && item.taskname.search('外委') === -1 && item.taskname.search('审核') === -1" class="yongli_btn" type="success" size="mini" @click="xuanqucases(scope.row.id, item.id)">选取用例</el-button>
                      <el-tag size="medium" class="tag-class" v-for="(li, index) in item.cases" :key="index" type="warning">{{li.case_name}}</el-tag>
                    </div>
                    <div v-show="item.taskname.search('外委') === -1 && item.taskname.search('审核') === -1" class="chaifen-btn">
                      <el-button v-if="item.cases.length != 0" type="primary" size="mini" @click="editcases(scope.row.id, item.id, item.cases)">修改用例</el-button>
                      <el-button type="warning" size="mini" @click="transfer(scope.row.id, item.id, item.cases)">拆分用例</el-button>
                      <el-button v-show="item.taskname.substr(-1, 1) !== '1' && item.taskname.substr(-1, 1) !== '测'" type="danger" size="mini" @click="deletetask(scope.row.id, item.id)">删除任务</el-button>
                    </div>
                  </el-card>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="配置设备">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="报告审核" name="5">
          <el-table
            class="mytask-content-table-one"
            :data="baogaodata"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="受检设备类型">
            </el-table-column>
            <el-table-column
              prop="taskinfo[0].days"
              label="执行时间">
              <template slot-scope="scope">
                <el-input
                  class="day-btn"
                  size="mini"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  ng-pattern="/[^a-zA-Z]/"
                  v-model.number="scope.row.taskinfo[0].days">
                </el-input>
                <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button @click="subday(scope.row.taskinfo[0].id, scope.row.taskinfo[0].days)" type="primary" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设备出库" name="6">
          <el-table
            class="mytask-content-table-one"
            :data="chukudata"
            style="width: 100%">
            <el-table-column
              prop="taskname"
              label="任务名称">
            </el-table-column>
            <el-table-column
              prop="days"
              label="执行时间">
              <template slot-scope="scope">
                <el-input
                  class="day-btn"
                  size="mini"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  ng-pattern="/[^a-zA-Z]/"
                  v-model.number="scope.row.days">
                </el-input>
                <span>&nbsp;天&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-button @click="subday(scope.row.id, scope.row.days)" type="primary" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 拆分用例 -->
    <el-dialog
      title="拆分用例"
      :visible.sync="transferDialogVisible"
      @close="caseclose"
      width="830px"
      center>
      <el-transfer
        v-model="transfervalue"
        class="teansfer_box"
        :props="{
          key: 'id',
          label: 'case_name'
        }"
        :data="transferdata">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="transferDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handletransfer">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选取用例 -->
    <el-dialog
      title="选取用例"
      :visible.sync="caseDialogVisible"
      @close="caseworkclose"
      width="576px"
      center>
      <div class="checked-box">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="casescheckbox" v-for="item in caselist" :label="item.id" :key="item.id">{{item.case_name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="caseDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handlecases">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用例 -->
    <el-dialog
      title="修改用例配置"
      :visible.sync="editcaseDialogVisible"
      width="576px"
      center>
      <div class="checked-box">
        <el-checkbox :indeterminate="editisIndeterminate" v-model="editcheckAll" @change="handleeditCheckAll">全选</el-checkbox>
        <el-checkbox-group v-model="checkededit" @change="editCheckedChange">
          <el-checkbox class="casescheckbox" v-for="item in caselist" :label="item.id" :key="item.id">{{item.case_name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editcaseDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="caseedit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["caseconfig", "getcaseall"],
  data() {
    return {
      caseconfigtype: this.caseconfig,
      getcasealldata: this.getcaseall,
      transferDialogVisible: false,
      caseDialogVisible: false,
      editcaseDialogVisible: false,
      loading: true,
      shenpiData: [], // 审批任务数据
      hetongData: [], // 合同任务数据
      rukudata: [], // 入库数据
      huanjingdata: [], // 环境数据
      baogaodata: [], // 报告审核数据
      chukudata: [], // 出库数据
      eqpislist: [],
      transfervalue: [],
      transferdata: [],
      caselist: [], // 所有用例数据
      casesAll: [],
      checkAll: false,
      checkedCities: [], // 选中的用例
      isIndeterminate: false,
      checkededit: [], // 修改选中的用例
      editisIndeterminate: true, // 修改全选按钮
      editcheckAll: false, // 修改用例全选按钮是否选中
      rowid: 0, // 设备id
      taskid: 0 // 任务id
    };
  },
  methods: {
    // 申请审批
    async getshenpi() {
      const res = await this.$http.get(`${this.caseconfigtype}/0`);
      if (res.data.status === 200) {
        this.shenpiData = [];
        this.shenpiData.push(res.data.taskinfo);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 合同数据
    async gethetong() {
      const res = await this.$http.get(`${this.caseconfigtype}/1`);
      if (res.data.status === 200) {
        this.hetongData = [];
        this.hetongData.push(res.data.taskinfo);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 入库数据
    async getruku() {
      const res = await this.$http.get(`${this.caseconfigtype}/2`);
      if (res.data.status === 200) {
        this.rukudata = [];
        this.rukudata.push(res.data.taskinfo);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 环境数据
    async gethuanjing() {
      const res = await this.$http.get(`${this.caseconfigtype}/3`);
      if (res.data.status === 200) {
        this.huanjingdata = res.data.info;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 检测数据
    async getjiance() {
      const res = await this.$http.get(`${this.caseconfigtype}/4`);
      if (res.data.status === 200) {
        this.eqpislist = res.data.info;
        this.loading = false;
        for (let i = 0; i < res.data.info.length; i++) {
          for (let j = 0; j < res.data.info[i].taskinfo.length; j++) {
            if (res.data.info[i].taskinfo[j].days === 0) {
              return this.$notify({
                title: "提示",
                message: "您有任务未设置执行时间,请立即设置!!!",
                type: "warning",
                offset: 100,
                duration: 0
              });
            }
          }
        }
      } else {
        this.loading = false;
        this.$message.error(res.data.msg);
      }
    },
    // 报告审核数据
    async getbaogao() {
      const res = await this.$http.get(`${this.caseconfigtype}/5`);
      if (res.data.status === 200) {
        this.baogaodata = res.data.info;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 出库数据
    async getchuku() {
      const res = await this.$http.get(`${this.caseconfigtype}/6`);
      if (res.data.status === 200) {
        this.chukudata = [];
        this.chukudata.push(res.data.taskinfo);
      } else {
        this.$message.error(res.data.msg);
      }
    },
    tabclick(val) {
      if (val.name === "0") {
        this.getshenpi();
      } else if (val.name === "1") {
        this.gethetong();
      } else if (val.name === "2") {
        this.getruku();
      } else if (val.name === "3") {
        this.gethuanjing();
      } else if (val.name === "4") {
        this.getjiance();
      } else if (val.name === "5") {
        this.getbaogao();
      } else {
        this.getchuku();
      }
    },
    // 修改天数按钮
    async subday(id, day) {
      if (day > 31) {
        this.$message.warning("修改失败,任务天数不得大于31天");
      } else if (day < 1) {
        this.$message.warning("修改失败,任务天数不得小于1天");
      } else {
        const res = await this.$http.put(`usetime/${id}`, { days: day });
        if (res.data.status === 200) {
          this.$message.success("修改成功");
        } else {
          this.$message.error(res.data.msg);
        }
      }
    },
    // 获取所有用例，并把所有用例id取出来
    async checkcaseall() {
      const res = await this.$http.get(`${this.getcasealldata}`);
      if (res.data.status === 200) {
        this.caselist = res.data.case_list;
        for (let i = 0; i < this.caselist.length; i++) {
          this.casesAll.push(this.caselist[i].id);
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 用例选取全选
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.casesAll : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.caselist.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.caselist.length;
    },
    xuanqucases(rowid, id) {
      this.rowid = rowid;
      this.taskid = id;
      this.caseDialogVisible = true;
    },
    // 选取用例提交
    async handlecases() {
      const res = await this.$http.post(`tasktypeusecasemap/${this.taskid}`, {
        caselist: this.checkedCities
      });
      if (res.data.status === 200) {
        this.$message.success("用例添加成功");
        this.dataloading();
        this.caseDialogVisible = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改用例
    handleeditCheckAll(val) {
      this.checkededit = val ? this.casesAll : [];
      this.editisIndeterminate = false;
    },
    editCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.caselist.length;
      this.editisIndeterminate =
        checkedCount > 0 && checkedCount < this.caselist.length;
    },
    // 选取用例关闭
    caseworkclose() {
      this.checkedCities = [];
    },
    // 用例修改按钮
    editcases(rowid, id, cases) {
      this.rowid = rowid;
      this.taskid = id;
      this.checkededit = [];
      for (let i = 0; i < cases.length; i++) {
        this.checkededit.push(cases[i].id);
      }
      if (this.checkededit.length === this.casesAll.length) {
        this.editisIndeterminate = false;
        this.editcheckAll = true;
      } else if (this.checkededit.length === 0) {
        this.editisIndeterminate = false;
        this.editcheckAll = false;
      } else {
        this.editisIndeterminate = true;
        this.editcheckAll = false;
      }
      this.editcaseDialogVisible = true;
    },
    // 任务删除按钮
    deletetask(rowid, id) {
      this.$confirm("确定要删除该用例吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.rowid = rowid;
          const res = await this.$http.delete(`createtasktype/${id}`);
          if (res.data.status === 200) {
            this.$message.success("任务删除成功");
            this.dataloading();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 拆分按钮
    transfer(rowid, id, cases) {
      this.rowid = rowid;
      this.taskid = id;
      this.transferDialogVisible = true;
      this.transferdata = cases;
    },
    // 拆分dialog确定按钮提交
    async handletransfer() {
      if (this.transfervalue.length < 1) {
        this.$message.error("请选择要拆分的用例");
      } else {
        const res = await this.$http.post(`createtasktype/${this.taskid}`, {
          caselist: this.transfervalue
        });
        if (res.data.status === 200) {
          this.$message.success("拆分成功,请设置执行时间");
          this.dataloading();
          this.transferDialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      }
    },
    // 拆分dialog关闭
    caseclose() {
      this.transferdata = [];
      this.transfervalue = [];
    },
    // 用例修改关闭
    // caseeditclose() {},
    async caseedit() {
      if (this.checkededit.length > 0) {
        const res = await this.$http.put(`tasktypeusecasemap/${this.taskid}`, {
          caselist: this.checkededit
        });
        if (res.data.status === 200) {
          this.$message.success("用例添加成功");
          this.dataloading();
          this.editcaseDialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      } else {
        this.$message.error("用例不可为空");
      }
    },
    // 局部刷新
    async dataloading() {
      const res = await this.$http.get(`devicetasktype/${this.rowid}`);
      if (res.data.status === 200) {
        for (let i = 0; i < this.eqpislist.length; i++) {
          if (res.data.info.id === this.eqpislist[i].id) {
            this.eqpislist[i].taskinfo = res.data.info.taskinfo;
          }
        }
        for (let j = 0; j < res.data.info.taskinfo.length; j++) {
          if (res.data.info.taskinfo[j].days === 0) {
            return this.$notify({
              title: "提示",
              message: "您有任务未设置执行时间,请立即设置!!!",
              type: "warning",
              offset: 100,
              duration: 0
            });
          }
        }
      }
    }
  },
  created() {
    this.checkcaseall();
    this.getshenpi();
  }
};
</script>

<style>
.workcaseconfig-box {
  height: 850px;
  margin: 10px auto 0;
  width: 1560px;
}
.workcaseconfig-box .el-tabs__item {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}
.day-btn {
  width: 50px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.itemtitle {
  margin: 5px 0 10px 0;
  font-size: 18px;
  color: #373c44;
}
.caseitembox {
  margin: 6px 0 30px 6px;
}
.cases-list {
  display: inline-block;
  vertical-align: top;
}
.tag-class {
  margin: 0 0 6px 10px;
}
.cases-listtitle {
  width: 100px;
}
.cases-listcontent {
  width: 1290px;
}
.chaifen-btn {
  text-align: center;
  margin-top: 10px;
}
.yongli_btn {
  margin: 0 0 6px 6px;
}
.caseslist_left {
  width: 500px;
}
.caseslist_center {
  width: 500px;
}
.casescheckbox {
  width: 460px;
  margin-left: 30px;
}
.checked-box {
  height: 500px;
  overflow: auto;
}
.teansfer_box .el-transfer-panel {
  width: 340px !important;
}
.notifition {
  color: red;
}
</style>

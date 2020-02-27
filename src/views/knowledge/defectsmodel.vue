<template>
  <div>
    <div class="mytask-content-top">
      <el-popover
        placement="bottom-start"
        width="220"
        transition="el-zoom-in-bottom"
        trigger="click">
        <div>
          <div class="sx_li">缺陷类型：</div>
          <el-select class="sx_li sx_input" size="mini" v-model="sxform.df_type" placeholder="请选择">
            <el-option
              v-for="item in qxoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="sx_li">缺陷系统：</div>
          <el-cascader
            class="sx_li sx_input"
            size="mini"
            v-model="sxform.menu"
            :options="system1options">
          </el-cascader>
          <div class="sx_li">开始时间（按缺陷提交时间）：</div>
          <el-date-picker
            v-model="sxform.sub_stime"
            size="mini"
            class="sx_li sx_input"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <div v-if="this.sxrequest === 'screenrepairdefects'">
            <div class="sx_li">结束时间（按缺陷提交时间）：</div>
            <el-date-picker
              v-model="sxform.sub_etime"
              class="sx_li sx_input"
              size="mini"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <div class="sx_li">开始时间（按缺陷修复时间）：</div>
            <el-date-picker
              v-model="sxform.repair_stime"
              size="mini"
              class="sx_li sx_input"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
            <div class="sx_li">结束时间（按缺陷修复时间）：</div>
            <el-date-picker
              v-model="sxform.repair_etime"
              class="sx_li sx_input"
              size="mini"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="sx_btn_box">
            <el-button type="primary" size="mini" @click="reqest">重置</el-button>
            <el-button type="primary" size="mini" @click="sx">筛选</el-button>
          </div>
        </div>
        <el-button style="margin-left: 20px" slot="reference" type="primary" size="small">筛选<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </el-popover>
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入缺陷名称"
          @keyup.enter.native="projectsearch"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="projectsearch">搜索</el-button>
      <el-button v-if="defectsurl === 'unrepairdefects'" type="success" size="mini" @click="creatdefectsvs = true">新建缺陷</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one6"
          stripe
          height="760"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div style="margin-bottom: 30px">
                <div class="biaoshu-title">缺陷表述 :</div>
                <div class="biaoshu-content">{{scope.row.defect}}</div>
              </div>
              <div v-show="defectsurl === 'repairdefects'">
                <div class="defects-left">
                  <div class="defects-title">处&nbsp; 理 &nbsp;人：<span>{{scope.row.repair_person}}</span></div>
                  <div class="defects-title">处理时间：<span>{{scope.row.repair_time}}</span></div>
                </div>
                <div class="defects-right">
                  <div class="deright-left">解决方法：</div>
                  <div class="deright-right">{{scope.row.defect_reason}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="defect_title"
            show-overflow-tooltip
            label="标题">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            width="180"
            label="缺陷类型">
            <template slot-scope="scope">
              <span v-show="scope.row.type === 1">待优化项</span>
              <span v-show="scope.row.type === 9">故障</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="system"
            label="主系统"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            prop="child_system"
            label="子系统"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            prop="submit_person"
            width="150"
            show-overflow-tooltip
            label="提交人">
          </el-table-column>
          <el-table-column
            width="180"
            show-overflow-tooltip
            prop="submit_time"
            label="提交时间">
          </el-table-column>
          <el-table-column
            width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button v-show="defectsurl === 'unrepairdefects'" type="primary" size="mini" icon="iconfont icon-xiufu xiufu" @click="editdefects(scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deletedefects(scope.row.id)"></el-button>
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
      title="新建缺陷"
      center
      @close="closedefects"
      :visible.sync="creatdefectsvs"
      width="576px">
      <el-form :model="cfetectsfrom" ref="cfetectsfrom" label-width="180px" class="demo-dynamic" label-position="right">
        <el-form-item
          prop="defect_title"
          label="缺陷标题"
          :rules="[
            { required: true, message: '请输入缺陷标题', trigger: 'blur' },
            { max: 20, message: '缺陷标题最多 20 个字符', trigger: 'blur' }
          ]">
          <el-input style="width: 300px" size="small" v-model="cfetectsfrom.defect_title"></el-input>
        </el-form-item>
        <el-form-item
          prop="type"
          label="缺陷类型"
          :rules="[
            { required: true, message: '请选择缺陷类型', trigger: 'blur' }
          ]">
          <el-select v-model="cfetectsfrom.type" placeholder="请选择缺陷类型" size="small" style="width: 300px">
            <el-option
              v-for="item in system3options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="menu"
          label="缺陷系统"
          :rules="[
            { required: true, message: '请选择缺陷系统', trigger: 'change' }
          ]">
          <el-cascader
            expand-trigger="hover"
            size="small"
            style="width: 300px"
            :options="system1options"
            v-model="cfetectsfrom.menu">
          </el-cascader>
        </el-form-item>
        <el-form-item
          prop="defect"
          label="缺陷表述"
          :rules="[
            { required: true, message: '请输入缺陷表述', trigger: 'blur' },
            { max: 500, message: '最多 500 个字符', trigger: 'blur' }
          ]">
          <el-input resize="none" style="width: 300px" type="textarea" :rows="6" size="small" v-model="cfetectsfrom.defect"></el-input>
        </el-form-item>
      </el-form>
      <div class="deca-btn">
        <el-button plain size="small" @click="creatdefectsvs = false">取 消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="submitcfetectsfrom">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="处理缺陷"
      center
      :visible.sync="editdefectsvs"
      width="576px">
      <el-form :model="editdetectsfrom" ref="editdetectsfrom" label-width="180px" class="demo-dynamic" label-position="right" label-suffix="：">
        <el-form-item
          prop="defect_title"
          label="缺陷标题">
          <span>{{editdetectsfrom.defect_title}}</span>
        </el-form-item>
        <el-form-item
          prop="type"
          label="缺陷类型">
          <span>{{editdetectsfrom.type}}</span>
        </el-form-item>
        <el-form-item
          prop="system"
          label="缺陷主系统">
          <span>{{editdetectsfrom.system}}</span>
        </el-form-item>
        <el-form-item
          prop="child_system"
          label="缺陷子系统">
          <span>{{editdetectsfrom.child_system}}</span>
        </el-form-item>
        <el-form-item
          prop="defect"
          label="缺陷表述">
          <div style="line-height: 16px; margin-top: 10px; word-wrap: break-word;">{{editdetectsfrom.defect}}</div>
        </el-form-item>
        <el-form-item
          prop="defect_reason"
          :rules="[
            { required: true, message: '请输入解决方法', trigger: 'blur' },
            { max: 500, message: '最多 500 个字符', trigger: 'blur' }
          ]"
          label="解决方法">
          <el-input resize="none" style="width: 300px" type="textarea" :rows="6" size="small" v-model="editdetectsfrom.defect_reason"></el-input>
        </el-form-item>
      </el-form>
      <div class="deca-btn">
        <el-button plain size="small" @click="editdefectsvs = false">取 消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="submiteditfrom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["defectsurl", "sxrequest"],
  data() {
    return {
      creatdefectsvs: false,
      editdefectsvs: false,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      projectlist: [],
      myprojectsearch: "",
      system1options: [],
      system3options: [
        {
          value: 9,
          label: "故障"
        },
        {
          value: 1,
          label: "待优化项"
        }
      ],
      cfetectsfrom: {
        defect: "",
        menu: [],
        type: "",
        defect_title: ""
      },
      editdetectsfrom: {
        id: "",
        defect: "",
        system: "",
        child_system: "",
        type: "",
        defect_title: "",
        defect_reason: ""
      },
      sxform: {
        df_type: null,
        menu: [],
        sub_stime: "",
        sub_etime: "",
        repair_stime: "",
        repair_etime: ""
      },
      searchtype: "1",
      qxoptions: [
        {
          label: "故障",
          value: 9
        },
        {
          label: "待修复项",
          value: 1
        }
      ]
    };
  },
  methods: {
    // 获取系统
    async getoptions() {
      const res = await this.$http.get(`menu`);
      if (res.data.status === 200) {
        this.system1options = res.data.menu;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleprojectChange(val) {
      this.getdefectsdata(val);
    },
    closedefects() {
      this.$refs.cfetectsfrom.resetFields();
    },
    // 搜索按钮
    projectsearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.getdefectsdata(this.currentPage);
      }
    },
    // 提交缺陷
    submitcfetectsfrom() {
      this.$refs.cfetectsfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入缺陷描述");
        }
        const res = await this.$http.post(`createdefect`, this.cfetectsfrom);
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.creatdefectsvs = false;
          this.getdefectsdata(1);
        } else {
          this.$message.error(res.data.msg);
          this.creatdefectsvs = false;
        }
      });
    },
    // 获取缺陷列表
    async getdefectsdata(page) {
      const res = await this.$http.post(`${this.defectsurl}/${page}`, {
        keyword: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.defects;
      }
    },
    // 删除缺陷
    async deletedefects(id) {
      this.$confirm(`确定删除该缺陷吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`rpdefect/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            if (this.searchtype === "1") {
              this.getdefectsdata(this.currentPage);
            } else if (this.searchtype === "3") {
              this.sxqq(this.currentPage);
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    editdefects(row) {
      this.editdetectsfrom.id = row.id;
      this.editdetectsfrom.defect_title = row.defect_title;
      this.editdetectsfrom.system = row.system;
      this.editdetectsfrom.child_system = row.child_system;
      this.editdetectsfrom.defect_reason = row.defect_reason;
      this.editdetectsfrom.defect = row.defect;
      if (row.type === 1) {
        this.editdetectsfrom.type = "待优化项";
      } else if (row.type === 9) {
        this.editdetectsfrom.type = "故障";
      }
      this.editdefectsvs = true;
    },
    // 修复缺陷
    submiteditfrom() {
      this.$refs.editdetectsfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入解决方案");
        }
        const res = await this.$http.put(
          `rpdefect/${this.editdetectsfrom.id}`,
          {
            defect_reason: this.editdetectsfrom.defect_reason
          }
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.editdefectsvs = false;
          this.getdefectsdata(this.currentPage);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 重置按钮
    reqest() {
      this.sxform.df_type = null;
      this.sxform.menu = [];
      this.sxform.sub_stime = "";
      this.sxform.sub_etime = "";
      this.sxform.repair_stime = "";
      this.sxform.repair_etime = "";
      this.searchtype = "1";
    },
    // 筛选按钮
    sx() {
      if (
        this.sxform.df_type === null &&
        this.sxform.menu === [] &&
        this.sxform.sub_stime === "" &&
        this.sxform.sub_etime === "" &&
        this.sxform.repair_stime === "" &&
        this.sxform.repair_etime === ""
      ) {
        this.searchtype = "1";
        this.currentPage = 1;
        this.getdefectsdata(this.currentPage);
      } else {
        this.searchtype = "3";
        this.currentPage = 1;
        this.sxqq(1);
      }
    },
    // 筛选请求
    async sxqq(page) {
      const res = await this.$http.post(
        `${this.sxrequest}/${page}`,
        this.sxform
      );
      if (res.data.status === 200) {
        this.projecttotal = res.data.total_num;
        this.projectlist = res.data.defects;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.getdefectsdata(this.currentPage);
    this.getoptions();
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.getdefectsdata(1);
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
.mytask-content-table-one6 {
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
.mytask-content-table {
  height: 760px;
}
.mytask-dropdown {
  margin-left: 30px;
}
.defects-left {
  display: inline-block;
  width: 500px;
  vertical-align: top;
}
.defects-right {
  display: inline-block;
  width: 900px;
  vertical-align: top;
}
.deright-left {
  display: inline-block;
  width: 90px;
  vertical-align: top;
  font-weight: 700;
}
.deright-right {
  display: inline-block;
  width: 780px;
  word-wrap: break-word;
  vertical-align: top;
}
.defects-title {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
.defects-title span {
  font-weight: normal;
}
.biaoshu-title {
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  width: 90px;
}
.biaoshu-content {
  display: inline-block;
  word-wrap: break-word;
  vertical-align: top;
  width: 1400px;
}
.xiufu {
  font-size: 12px;
}
</style>

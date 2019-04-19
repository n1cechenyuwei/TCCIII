<template>
  <div>
    <div class="mytask-content-top">
      <el-input
        size="small"
        class="peoplesearch"
        placeholder="请输入工号"
        v-model.trim="peoplesearch">
      </el-input>
      <i class="el-icon-search sreach-icon"></i>      
      <el-button type="primary" size="small" @click="peopleseac">搜索</el-button>
      <el-button type="success" size="small" @click="createId">创建账号</el-button>
    </div>
    <div class="personnel-table">
      <el-table
        :data="peopleData"
        style="width: 100%">
        <el-table-column
          prop="worknumber"
          label="工号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          width="300"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit"></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-time"
              @click="handletime"></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="taskpage"
      :current-page.sync="currentPage"
      @current-change="handlePageChange"
      :page-size="personnelpagesize"
      layout="total, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
    <!-- 创建角色 -->
    <el-dialog
      title="创建账号"
      :visible.sync="IdDialogVisible"
      width="500px"
      @close="createidclose"
      center>
      <div>
        <el-form label-position="right" label-width="80px" ref="idform" :model="idform" :rules="idformrules">
          <el-form-item label="工号" prop="worknumber">
            <el-input size="small" v-model.number.trim="idform.worknumber"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" size="small" v-model.trim="idform.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="oldpassword">
            <el-input type="password" size="small" v-model.trim="idform.oldpassword"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input size="small" v-model.trim="idform.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="IdDialogVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="IdDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="rolesVisible"
      width="500px"
      center
      @close="rolesclose">
      <div>
        <el-form label-position="right" label-width="80px" :model="rolesfrom">
          <el-form-item label="姓名">
            <span>张三</span>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="rolesfrom.role" placeholder="未分配角色" size="small">
              <el-option
                v-for="item in roleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="rolesfrom.state" placeholder="请选择" size="small">
              <el-option
                v-for="item in stateoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="rolesVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="rolesVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 调整时间 -->
    <el-dialog
      title="时间调整"
      :visible.sync="timeVisible"
      width="500px"
      @close="timeclose"
      center>
      <div class="pe-time-box">
        <div>
          <span>姓名：&nbsp;</span>
          <span>赵龙</span>
          <el-radio-group size="mini" v-model="Leavework" class="Leavework" @change="Leaveworkchange">
            <el-radio-button label="1">请假</el-radio-button>
            <el-radio-button label="2">工作</el-radio-button>
          </el-radio-group>
        </div>
        <div class="person-time-two" v-show="isshowtime">
          <el-date-picker
            class="perti"
            v-model="persontime"
            value-format="yyyy-MM-dd"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="timeVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitpertime">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    let validpassword = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!reg.test(value)) {
        callback(new Error("密码必须是由6-16位数字和字母组合"));
      } else {
        callback();
      }
    };
    let oldpassword = (rule, value, callback) => {
      if (value !== this.idform.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let jobnumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("工号不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      peoplesearch: "", // 搜索框内容
      currentPage: 1, // 当前页数
      personnelpagesize: 10, // 每页显示条数
      IdDialogVisible: false,
      rolesVisible: false,
      timeVisible: false,
      Leavework: "1",
      idform: {
        worknumber: "",
        name: "",
        password: "",
        oldpassword: ""
      },
      idformrules: {
        worknumber: [
          { required: true, message: "请输入工号", trigger: "blur" },
          { validator: jobnumber, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validpassword, trigger: "blur" }
        ],
        oldpassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: oldpassword, trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }]
      },
      peopleData: [
        {
          worknumber: 100001,
          name: "赵龙",
          role: "管理员",
          state: "启用"
        }
      ],
      roleoptions: [
        {
          value: 1,
          label: "合同管理员"
        },
        {
          value: 2,
          label: "检测员"
        }
      ],
      rolesfrom: {
        name: "张三",
        role: 1,
        state: 1
      },
      stateoptions: [
        {
          value: 1,
          label: "启用"
        },
        {
          value: 0,
          label: "禁用"
        }
      ],
      persontime: "", // 请假时间
      isshowtime: true
    };
  },
  methods: {
    peopleseac() {},
    createId() {
      this.IdDialogVisible = true;
    },
    createidclose() {
      this.$refs.idform.resetFields();
    },
    rolesclose() {},
    // 分配角色
    handleEdit() {
      this.rolesVisible = true;
    },
    // 删除账号
    handleDelete() {},
    // 账号请假时间
    handletime() {
      this.timeVisible = true;
    },
    timeclose() {
      this.persontime = "";
    },
    handlePageChange() {},
    Leaveworkchange() {
      if (this.Leavework === "1") {
        this.isshowtime = true;
      } else {
        this.isshowtime = false;
      }
    },
    submitpertime() {
      console.log(this.persontime);
      // this.timeVisible = false;
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
.peoplesearch {
  width: 260px;
  margin-top: 11px;
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
}
.sreach-icon {
  position: absolute;
  top: 0px;
}
.personnel-table {
  height: 720px;
  min-width: 1670px;
}
.taskpage {
  margin-left: 30px;
}
.pe-time-box {
  padding-left: 50px;
  font-size: 16px;
}
.Leavework {
  position: relative;
  top: -2px;
  margin-left: 50px;
}
.person-time-two {
  margin-top: 20px;
}
.el-date-editor.el-range-editor.el-input__inner.perti.el-date-editor--daterange.el-range-editor--small {
  width: 300px !important;
}
</style>

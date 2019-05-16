<template>
  <div>
    <div class="mytask-content-top">
      <div class="search-box">
        <el-input
        size="small"
        class="peoplesearch"
        placeholder="请输入工号"
        v-model.trim="peoplesearch">
      </el-input>
      <i class="el-icon-search sreach-icon"></i>
      </div>
      <el-button type="primary" size="small" @click="peopleseac">搜索</el-button>
      <el-button type="success" size="small" @click="createId">创建账号</el-button>
    </div>
    <div class="personnel-table">
      <el-table
        :data="peopleData"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="工号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="realname"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="角色">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.roles" :key="index">{{item}}&nbsp;&nbsp;&nbsp;</span>
          </template>
        </el-table-column>
         <el-table-column
          prop="type"
          width="120px"
          label="检测类型">
        </el-table-column>
        <el-table-column
          width="120px"
          label="状态">
          <template slot-scope="scope">
            <span v-show="scope.row.state === 1">启用</span>
            <span v-show="scope.row.state === 0">停用</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200px"
          class-name="imgperson"
          label="电子签名">
          <template slot-scope="scope">
            <img v-if="scope.row.signature_path !== ''" :src="scope.row.signature_path" alt="" style="width: 80px; height: 40px; margin-top: 6px">
            <el-upload
              v-if="scope.row.signature_path === ''"
              accept=".png, .jpg, .JPG, .PNG, .jpeg, .JPEG"
              name="signature"
              class="systemupload"
              :action="$store.state.baseurl + 'usersignatures/' + scope.row.userid"
              :show-file-list="false"
              :on-success="uploadsuccess"
              :on-error="uploaderror"
              :data="{ id: scope.row.id }"
              :multiple="false">
              <el-button type="primary" size="mini" icon="el-icon-plus"></el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column
          width="260"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="warning" size="mini" icon="el-icon-time" @click="handletime"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.userid)"></el-button>
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
      :total="total_num">
    </el-pagination>
    <!-- 创建账号 -->
    <el-dialog
      title="创建账号"
      :visible.sync="IdDialogVisible"
      width="500px"
      @close="createidclose"
      center>
      <div>
        <el-form label-position="right" label-width="120px" ref="idform" :model="idform" :rules="idformrules">
          <el-form-item label="工号" prop="username">
            <el-input size="small" class="systemipt" v-model.number.trim="idform.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" class="systemipt" size="small" v-model.trim="idform.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="oldpassword">
            <el-input type="password" class="systemipt" size="small" v-model.trim="idform.oldpassword"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input size="small" class="systemipt" v-model.trim="idform.realname"></el-input>
          </el-form-item>
          <el-form-item label="账号类型" prop="type">
            <el-select v-model="idform.type" placeholder="请选择账号类型" size="small" style="width: 300px">
              <el-option label="PIS" value="pis"></el-option>
              <el-option label="VMS" value="vms"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="IdDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="creatid">确 定</el-button>
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
        <el-form label-position="right" label-width="100px" :rules="rolesfromrules" ref="rolesfrom" :model="rolesfrom" label-suffix="：">
          <el-form-item label="姓名">
            <span>张三</span>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="rolesfrom.role" placeholder="请选择" style="width: 280px" size="mini">
              <el-option
                v-for="item in roleoptions"
                :key="item.id"
                :label="item.role_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model="rolesfrom.state" style="width: 280px" placeholder="请选择">
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
        <el-button size="small" @click="rolesVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="subroles">确 定</el-button>
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
        <el-button size="small" @click="timeVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitpertime">确 定</el-button>
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
      personnelpagesize: 13, // 每页显示条数
      total_num: 0,
      IdDialogVisible: false,
      rolesVisible: false,
      timeVisible: false,
      Leavework: "1",
      idform: {
        username: "",
        realname: "",
        password: "",
        oldpassword: "",
        type: ""
      },
      idformrules: {
        username: [
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
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        type: [{ required: true, message: "选择账号类型", trigger: "blur" }]
      },
      rolesfromrules: {
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      peopleData: [],
      roleoptions: [],
      rolesfrom: {
        id: "",
        name: "",
        role: "",
        state: ""
      },
      stateoptions: [
        {
          value: 1,
          label: "启用"
        },
        {
          value: 0,
          label: "停用"
        }
      ],
      persontime: "", // 请假时间
      isshowtime: true
    };
  },
  methods: {
    peopleseac() {
      if (this.peoplesearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.iddata(this.currentPage);
      }
    },
    createId() {
      this.IdDialogVisible = true;
    },
    createidclose() {
      this.$refs.idform.resetFields();
    },
    rolesclose() {
      this.$refs.rolesfrom.resetFields();
    },
    // 分配角色
    async handleEdit(row) {
      this.rolesVisible = true;
      this.rolesfrom.name = row.realname;
      this.rolesfrom.state = row.state;
      this.rolesfrom.id = row.userid;
      const res = await this.$http.get(`userroles/${row.userid}`);
      if (res.data.status === 200) {
        this.rolesfrom.role = res.data.roles;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 删除账号
    async handleDelete(id) {
      this.$confirm("确定要删除该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`inneruser/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.iddata(this.currentPage);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 账号请假时间
    handletime() {
      this.timeVisible = true;
    },
    timeclose() {
      this.persontime = "";
    },
    handlePageChange(page) {
      this.iddata(page);
    },
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
    },
    // 上传成功
    uploadsuccess() {
      this.$message.success("上传成功");
      this.iddata(this.currentPage);
    },
    uploaderror() {
      this.$message.error("上传失败");
    },
    // 创建账号
    creatid() {
      this.$refs.idform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入信息");
        }
        const res = await this.$http.post(`inneruserlist`, this.idform);
        if (res.status === 201) {
          this.$message.success("创建成功");
          this.IdDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 所有账号账号信息
    async iddata(page) {
      const res = await this.$http.post(`userinfo/${page}`, {
        keyword: this.peoplesearch
      });
      if (res.data.status === 200) {
        this.peopleData = res.data.user_list;
        this.total_num = res.data.total_num;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 所有角色信息
    async rolesdata() {
      const res = await this.$http.get(`getroles`);
      if (res.data.status === 200) {
        this.roleoptions = res.data.roles;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 分配角色提交按钮
    async subroles() {
      this.$refs.rolesfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入信息");
        }
        const res = await this.$http.post(`userroles/${this.rolesfrom.id}`, {
          state: this.rolesfrom.state,
          roles: this.rolesfrom.role
        });
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.rolesVisible = false;
          this.iddata(this.currentPage);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.iddata(this.currentPage);
    this.rolesdata();
  },
  watch: {
    peoplesearch(val) {
      if (val === "") {
        this.iddata(1);
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
  height: 760px;
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
.systemipt {
  width: 300px;
}
.systemupload {
  display: inline-block;
  width: 44px;
  margin: 0 10px;
}
.imgperson {
  padding: 0 !important;
}
</style>

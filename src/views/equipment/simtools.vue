<template>
  <div>
    <el-card shadow="always" class="simtoolscard vmssimtools-tl">
      <div class="simtoolscardtitlebox">
        <span>VMS仿真软件</span>
        <el-button class="simtoolscardtitlebtn" size="mini" type="success" @click="ckvmstools">添加软件</el-button>
      </div>
      <el-table
        :data="vmssimtoolsdata"
        stripe
        height="380"
        style="width: 100%">
        <el-table-column
          prop="toolname"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本">
        </el-table-column>
        <el-table-column
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editvmssimtools(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deletevmssimtools(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="always" class="simtoolscard vmssimtools-tr">
      <div class="simtoolscardtitlebox">
        <span>VMS非仿真软件</span>
        <el-button class="simtoolscardtitlebtn" size="mini" type="success" @click="ckvmsnosimtools">添加软件</el-button>
      </div>
      <el-table
        :data="vmsnosimtoolsdata"
        stripe
        height="380"
        style="width: 100%">
        <el-table-column
          prop="toolname"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本">
        </el-table-column>
        <el-table-column
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editvmsnosimtools(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deletevmsnosimtools(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="always" class="simtoolscard vmssimtools-bl">
      <div class="simtoolscardtitlebox">
        <span>PIS仿真软件</span>
        <el-button class="simtoolscardtitlebtn" size="mini" type="success" @click="ckpissimtools">添加软件</el-button>
      </div>
      <el-table
        :data="pissimtoolsdata"
        stripe
        height="380"
        style="width: 100%">
        <el-table-column
          prop="toolname"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本">
        </el-table-column>
        <el-table-column
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editpissimtools(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deletepissimtools(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="always" class="simtoolscard vmssimtools-br">
      <div class="simtoolscardtitlebox">
        <span>PIS非仿真软件</span>
        <el-button class="simtoolscardtitlebtn" size="mini" type="success" @click="ckpisnosimtools">添加软件</el-button>
      </div>
      <el-table
        :data="pisnosimtoolsdata"
        stripe
        height="380"
        style="width: 100%">
        <el-table-column
          prop="toolname"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本">
        </el-table-column>
        <el-table-column
          width="120"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editpisnosimtools(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deletepisnosimtools(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
     <!-- 新建软件 -->
    <el-dialog
      :title="creattitle"
      :visible.sync="simtoolsDialog"
      width="500px"
      @close="simtoolsformclose"
      center>
      <el-form label-position="right" label-width="150px" ref="simtoolsform" :model="simtoolsform">
        <el-form-item
        label="软件名称"
        :rules="[
          { required: true, message: '请输入软件名称', trigger: 'blur' }
        ]"
        prop="toolname">
          <el-input size="small" class="workconfiginput" v-model.trim="simtoolsform.toolname"></el-input>
        </el-form-item>
        <el-form-item
          label="软件版本"
          :rules="[
            { required: true, message: '请输入软件版本号', trigger: 'blur' }
          ]"
          prop="version">
          <el-input size="small"  class="workconfiginput" v-model.trim="simtoolsform.version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="simtoolsDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitsimtools">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改软件信息 -->
    <el-dialog
      :title="edittitle"
      :visible.sync="editsimtoolsDialog"
      width="500px"
      center>
      <el-form label-position="right" label-width="150px" ref="editsimtoolsform" :model="editsimtoolsform">
        <el-form-item
        label="软件名称"
        :rules="[
          { required: true, message: '请输入软件名称', trigger: 'blur' }
        ]"
        prop="toolname">
          <el-input size="small" class="workconfiginput" v-model.trim="editsimtoolsform.toolname"></el-input>
        </el-form-item>
        <el-form-item
          label="软件版本"
          :rules="[
            { required: true, message: '请输入软件版本号', trigger: 'blur' }
          ]"
          prop="version">
          <el-input size="small"  class="workconfiginput" v-model.trim="editsimtoolsform.version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editsimtoolsDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submiteditsimtools">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      simtoolsDialog: false,
      editsimtoolsDialog: false,
      tools: "",
      worktype: "",
      creattitle: "",
      vmssimtoolsdata: [],
      pissimtoolsdata: [],
      vmsnosimtoolsdata: [],
      pisnosimtoolsdata: [],
      simtoolsform: {
        toolname: "",
        version: ""
      },
      edittitle: "",
      editsimtoolsform: {},
      edittools: "",
      edittype: ""
    };
  },
  methods: {
    simtoolsformclose() {
      this.$refs.simtoolsform.resetFields();
    },
    // 点击vms仿真添加按钮
    ckvmstools() {
      this.tools = "simtools";
      this.worktype = "vms";
      this.creattitle = "新建VMS仿真软件";
      this.simtoolsDialog = true;
    },
    // 点击vms非仿真添加按钮
    ckvmsnosimtools() {
      this.tools = "nosimtools";
      this.worktype = "vms";
      this.creattitle = "新建VMS非仿真软件";
      this.simtoolsDialog = true;
    },
    // 点击vms非仿真添加按钮
    ckpissimtools() {
      this.tools = "simtools";
      this.worktype = "pis";
      this.creattitle = "新建PIS仿真软件";
      this.simtoolsDialog = true;
    },
    // 点击vms非仿真添加按钮
    ckpisnosimtools() {
      this.tools = "nosimtools";
      this.worktype = "pis";
      this.creattitle = "新建PIS非仿真软件";
      this.simtoolsDialog = true;
    },
    // 提交创建软件
    async submitsimtools() {
      this.$refs.simtoolsform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入软件信息");
        }
        const res = await this.$http.post(
          `${this.tools}/${this.worktype}`,
          this.simtoolsform
        );
        if (res.data.status === 200) {
          this.simtoolsDialog = false;
          this.$message.success(res.data.msg);
          if (this.tools === "simtools" && this.worktype === "vms") {
            this.getvmssimtoolsdata();
          } else if (this.tools === "simtools" && this.worktype === "pis") {
            this.getpissimtoolsdata();
          } else if (this.tools === "nosimtools" && this.worktype === "vms") {
            this.getvmsnosimtoolsdata();
          } else {
            this.getpisnosimtoolsdata();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 获取vms仿真数据
    async getvmssimtoolsdata() {
      const res = await this.$http.get(`simtools/vms`);
      if (res.data.status === 200) {
        this.vmssimtoolsdata = res.data.tools;
      }
    },
    // 获取vms非仿真数据
    async getvmsnosimtoolsdata() {
      const res = await this.$http.get(`nosimtools/vms`);
      if (res.data.status === 200) {
        this.vmsnosimtoolsdata = res.data.tools;
      }
    },
    // 获取pis仿真数据
    async getpissimtoolsdata() {
      const res = await this.$http.get(`simtools/pis`);
      if (res.data.status === 200) {
        this.pissimtoolsdata = res.data.tools;
      }
    },
    // 获取pis非仿真数据
    async getpisnosimtoolsdata() {
      const res = await this.$http.get(`nosimtools/pis`);
      if (res.data.status === 200) {
        this.pisnosimtoolsdata = res.data.tools;
      }
    },
    // 删除vms仿真软件
    async deletevmssimtools(id) {
      this.$confirm("确定要删除该软件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`simtool/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getvmssimtoolsdata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 删除vms非仿真按钮
    async deletevmsnosimtools(id) {
      this.$confirm("确定要删除该软件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`nosimtool/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getvmsnosimtoolsdata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 删除pis仿真按钮
    async deletepissimtools(id) {
      this.$confirm("确定要删除该软件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`simtool/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getpissimtoolsdata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 删除pis非仿真按钮
    async deletepisnosimtools(id) {
      this.$confirm("确定要删除该软件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`nosimtool/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getpisnosimtoolsdata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 修改vms仿真按钮
    async editvmssimtools(id) {
      this.edittools = "vmssimtools";
      this.edittype = "simtool";
      this.edittitle = "修改vms仿真软件信息";
      const res = await this.$http.get(`simtool/${id}`);
      if (res.data.status === 200) {
        this.editsimtoolsform = res.data.tools;
        this.editsimtoolsDialog = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改vms非仿真按钮
    async editvmsnosimtools(id) {
      this.edittools = "vmsnosimtools";
      this.edittype = "nosimtool";
      this.edittitle = "修改vms非仿真软件信息";
      const res = await this.$http.get(`nosimtool/${id}`);
      if (res.data.status === 200) {
        this.editsimtoolsform = res.data.tools;
        this.editsimtoolsDialog = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改pis仿真按钮
    async editpissimtools(id) {
      this.edittools = "pissimtools";
      this.edittype = "simtool";
      this.edittitle = "修改pis仿真软件信息";
      const res = await this.$http.get(`simtool/${id}`);
      if (res.data.status === 200) {
        this.editsimtoolsform = res.data.tools;
        this.editsimtoolsDialog = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改pis非仿真按钮
    async editpisnosimtools(id) {
      this.edittools = "pisnosimtools";
      this.edittype = "nosimtool";
      this.edittitle = "修改pis非仿真软件信息";
      const res = await this.$http.get(`nosimtool/${id}`);
      if (res.data.status === 200) {
        this.editsimtoolsform = res.data.tools;
        this.editsimtoolsDialog = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 修改提交按钮
    submiteditsimtools() {
      this.$refs.editsimtoolsform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入软件信息");
        }
        const res = await this.$http.put(
          `${this.edittype}/${this.editsimtoolsform.id}`,
          this.editsimtoolsform
        );
        if (res.data.status === 200) {
          this.editsimtoolsDialog = false;
          this.$message.success(res.data.msg);
          if (this.edittools === "vmssimtools") {
            this.getvmssimtoolsdata();
          } else if (this.edittools === "vmsnosimtools") {
            this.getvmsnosimtoolsdata();
          } else if (this.edittools === "pissimtools") {
            this.getpissimtoolsdata();
          } else {
            this.getpisnosimtoolsdata();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  created() {
    this.getvmssimtoolsdata();
    this.getvmsnosimtoolsdata();
    this.getpissimtoolsdata();
    this.getpisnosimtoolsdata();
  }
};
</script>

<style>
.simtoolscard {
  display: inline-block;
  vertical-align: top;
  width: 49%;
  height: 430px;
}
.simtoolscard .el-card__body {
  padding: 0px 10px !important;
}
.simtoolscardtitlebox {
  border-bottom: 1px solid #ebeef5;
  line-height: 40px;
  padding-left: 20px;
  position: relative;
  height: 40px;
  font-weight: 700;
  color: #606266;
}
.simtoolscardtitlebtn {
  position: absolute;
  top: 6px;
  right: 20px;
}
.vmssimtools-tl {
  margin: 10px;
}
.vmssimtools-tr {
  /* height: 48%; */
  margin: 10px 0px 10px 0;
}
.vmssimtools-bl {
  margin: 0px 10px 0px 10px;
}
.vmssimtools-br {
  margin: 0px 0px 0px 0px;
}
.pissimtools {
  height: 48%;
}
.workconfiginput {
  width: 250px;
}
</style>

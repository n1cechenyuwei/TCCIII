<template>
  <div>
    <div class="configmore">
      <div class="workconfigtop">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: $route.params.path }">{{$route.params.name}}</el-breadcrumb-item>
          <el-breadcrumb-item>配置详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <el-card shadow="always" class="workconfigcard">
      <div class="workconfig-radio">
        <el-radio-group v-model="radio" size="small" @change="configvalue">
          <el-radio-button v-for="(item, index) in eqlist" :key="index" :label="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="workconfigbox">
        <el-form :inline="true" label-position="right" ref="workconfigform" label-width="140px" :model="workconfigform">
          <el-form-item
            label="服务器IP"
            :rules="[
              { required: true, message: '请输入服务器IP地址', trigger: 'blur' }
            ]"
            prop="server_1_ip">
            <el-input size="small" v-model.trim="workconfigform.server_1_ip"></el-input>
          </el-form-item>
          <el-form-item
            label="备用服务器IP"
            prop="server_2_ip">
            <el-input size="small" v-model.trim="workconfigform.server_2_ip"></el-input>
          </el-form-item>
          <el-form-item
            label="设备IP"
            :rules="[
              { required: true, message: '请输入设备IP地址', trigger: 'blur' }
            ]"
            prop="d_ip_address">
            <el-input size="small" v-model.trim="workconfigform.d_ip_address"></el-input>
          </el-form-item>
          <el-form-item
            label="服务器端口"
            :rules="[
              { required: true, message: '请输入服务器端口', trigger: 'blur' }
            ]"
            prop="server_1_port">
            <el-input size="small" v-model.trim="workconfigform.server_1_port"></el-input>
          </el-form-item>
          <el-form-item
            label="备用服务器端口"
            prop="server_2_port">
            <el-input size="small" v-model.trim="workconfigform.server_2_port"></el-input>
          </el-form-item>
          <el-form-item
            label="设备端口"
            :rules="[
              { required: true, message: '请输入设备端口', trigger: 'blur' }
            ]"
            prop="d_port">
            <el-input size="small" v-model.trim="workconfigform.d_port"></el-input>
          </el-form-item>
          <el-form-item
            label="服务器SIP"
            :rules="[
              { required: true, message: '请输入服务器SIP', trigger: 'blur' }
            ]"
            prop="server_1_sip">
            <el-input size="small" v-model.trim="workconfigform.server_1_sip"></el-input>
          </el-form-item>
          <el-form-item
            label="备用服务器SIP"
            prop="server_2_sip">
            <el-input size="small" v-model.trim="workconfigform.server_2_sip"></el-input>
          </el-form-item>
          <el-form-item
            label="设备SIP"
            :rules="[
              { required: true, message: '请输入设备SIP', trigger: 'blur' }
            ]"
            prop="d_sip_id">
            <el-input size="small" v-model.trim="workconfigform.d_sip_id"></el-input>
          </el-form-item>
          <el-form-item
            label="服务器域"
            :rules="[
              { required: true, message: '请输入服务器域', trigger: 'blur' }
            ]"
            prop="server_1_field">
            <el-input size="small" v-model.trim="workconfigform.server_1_field"></el-input>
          </el-form-item>
          <el-form-item
            label="备用设备域"
            prop="server_2_field">
            <el-input size="small" v-model.trim="workconfigform.server_2_field"></el-input>
          </el-form-item>
          <el-form-item
            label="设备域"
            :rules="[
              { required: true, message: '请输入设备域', trigger: 'blur' }
            ]"
            prop="d_field">
            <el-input size="small" v-model.trim="workconfigform.d_field"></el-input>
          </el-form-item>
          <el-form-item
            label="服务器密码"
            prop="server_1_password">
            <el-input size="small" v-model.trim="workconfigform.server_1_password"></el-input>
          </el-form-item>
          <el-form-item
            label="备用服务器密码"
            prop="server_2_password">
            <el-input size="small" v-model="workconfigform.server_2_password"></el-input>
          </el-form-item>
          <el-form-item
            label="设备密码"
            prop="shebeipassword">
            <el-input size="small" v-model.trim="workconfigform.shebeipassword"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="workbtn">
        <el-button type="primary" size="small" plain @click="back">返 回</el-button>
        <el-button type="primary" size="small" @click="config">提 交</el-button>
        <el-button type="danger" size="small" @click="deleteconfig">删 除</el-button>
      </div>
    </el-card>
    <el-card shadow="always" class="workconfigcard-lb">
      <div class="table-title">
        <span style="margin-right: 510px">仿真环境软件信息</span>
        <el-button type="success" size="mini" @click="addfzsoft">选取软件</el-button>
      </div>
      <el-table
        :data="fzdata"
        stripe
        max-height="350"
        style="width: 100%">
        <el-table-column
          prop="toolname"
          label="软件名称">
        </el-table-column>
        <el-table-column
          prop="version"
          width="180"
          label="版本号">
        </el-table-column>
        <!-- <el-table-column
          width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="fzedit(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
    <el-card shadow="always" class="workconfigcard-rb">
      <div class="table-title">
        <span style="margin-right: 510px">工作台软件信息</span>
        <el-button type="success" size="mini" @click="addbenchsoft">选取软件</el-button>
      </div>
      <el-table
        :data="ruanData"
        stripe
        max-height="350"
        style="width: 100%">
        <el-table-column
          prop="toolname"
          label="软件名称">
        </el-table-column>
        <el-table-column
          prop="version"
          width="180"
          label="版本号">
        </el-table-column>
        <!-- <el-table-column
          width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="eedit(scope.row.id)" type="danger" size="mini" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
    <el-dialog
      title="添加非仿真软件信息"
      :visible.sync="createsoft"
      width="576px"
      center>
      <div class="checked-box">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="casescheckbox" v-for="item in caselist" :label="item.id" :key="item.id">{{item.toolname}}（{{item.version}}）</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="createsoft = false">取 消</el-button>
        <el-button size="small" type="primary" @click="creatsofts">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加仿真软件信息"
      :visible.sync="fzsoft"
      width="576px"
      center>
      <div class="checked-box">
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
          <el-checkbox class="casescheckbox" v-for="item in caselist2" :label="item.id" :key="item.id">{{item.toolname}}（{{item.version}}）</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="fzsoft = false">取 消</el-button>
        <el-button size="small" type="primary" @click="creatsofts2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eqlist: [],
      createsoft: false,
      fzsoft: false,
      workconfigform: {
        ip: "",
        shebeiip: "",
        beiyongip: "",
        duankou: "",
        shebeiduankou: "",
        beiyongduankou: "",
        sip: "",
        shebeisip: "",
        beiyongsip: "",
        yu: "",
        shebeiyu: "",
        beiyongyu: "",
        password: "",
        shebeipassword: "",
        beiyongpassword: ""
      },
      radio: "1",
      ruanData: [],
      fzdata: [],
      isIndeterminate: false,
      checkAll: false,
      checkedCities: [], // 选中的软件
      caselist: [], // 所有软件数据
      casesAll: [], // 所有软件id
      isIndeterminate2: false,
      checkAll2: false,
      casesAll2: [],
      checkedCities2: [], // 仿真选中的软件
      caselist2: [], // 所有仿真软件数据
    };
  },
  methods: {
    configvalue(val) {
      this.$refs.workconfigform.resetFields();
      this.getconfig(val);
    },
    back() {
      this.$router.push({ name: "environmentconfig" });
    },
    // 提交配置信息
    config() {
      this.$refs.workconfigform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入工作台信息");
        }
        if (this.workconfigform.id === 0) {
          const res = await this.$http.post(
            `configinfo/${this.$route.params.id}/${this.radio}`,
            this.workconfigform
          );
          if (res.data.status === 200) {
            this.$message.success("修改成功");
            this.getconfig(this.radio);
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          const res = await this.$http.put(
            `configinfo/${this.$route.params.id}/${this.radio}`,
            this.workconfigform
          );
          if (res.data.status === 200) {
            this.$message.success("修改成功");
            this.getconfig(this.radio);
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    // 删除配置信息
    deleteconfig() {
      this.$confirm("确定要删除该配置信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`configinfo/${this.$route.params.id}/${this.radio}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getconfig(this.radio);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 获取工作台信息
    async getbench() {
      if (this.$route.params.id === undefined) {
        this.$router.push({ name: "environmentconfig" });
      } else {
        const res = await this.$http.get(`bench/${this.$route.params.id}`);
        if (res.data.status === 200) {
          this.workform = res.data.bench_info;
        } else {
          this.$message.error(res.data.msg);
        }
      }
    },
    // 获取设备信息
    async geteqment() {
      if (this.$route.params.id === undefined) {
        this.$router.push({ name: "environmentconfig" });
      } else {
        if (this.$route.params.type === "VMS") {
          const res = await this.$http.get("vmsdevicenamelist");
          if (res.data.status === 200) {
            this.eqlist = res.data.devicelist;
            this.radio = res.data.devicelist[0].value;
            this.getconfig(this.radio);
          } else {
            this.$message.error(res.data.msg);
          }
        } else {
          const res = await this.$http.get("pisdevicenamelist");
          if (res.data.status === 200) {
            this.eqlist = res.data.devicelist;
            this.radio = res.data.devicelist[0].value;
            this.getconfig(this.radio);
          } else {
            this.$message.error(res.data.msg);
          }
        }
      }
    },
    // 获取配置信息
    async getconfig(devid) {
      const res = await this.$http.get(
        `configinfo/${this.$route.params.id}/${devid}`
      );
      if (res.data.status === 200) {
        this.workconfigform = res.data.configinfo;
      }
    },
    // 获取表格非仿真类工具信息
    async getruandata() {
      if (this.$route.params.id === undefined) {
        this.$router.push({ name: "environmentconfig" });
      } else {
        const res = await this.$http.get(`benchnosimtools/${this.$route.params.id}`);
        if (res.data.status === 200) {
          this.ruanData = res.data.toolsinfo;
          this.checkedCities = [];
          res.data.toolsinfo.forEach(element => {
            this.checkedCities.push(element.id);
          });
        }
      }
    },
    // 获取所有非仿真工具信息
    async addbenchsoft() {
      const res = await this.$http.get(`nosimtools/${this.$route.params.type}`);
      if (res.data.status === 200) {
        this.caselist = res.data.tools;
        this.createsoft = true;
        this.casesAll = [];
        res.data.tools.forEach(element => {
          this.casesAll.push(element.id);
        });
        if (this.checkedCities.length > 0 && this.checkedCities.length < this.caselist.length) {
          this.isIndeterminate = true;
          this.checkAll = false;
        } else if (this.checkedCities.length ===  this.caselist.length) {
          this.isIndeterminate = false;
          this.checkAll = true;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 非软件选取全选
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.casesAll : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.caselist.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.caselist.length;
    },
    // 添加非仿真工具信息
    async creatsofts() {
      const res = await this.$http.post(
        `benchnosimtools/${this.$route.params.id}`,
        { tool_id: this.checkedCities }
      );
      if (res.data.status === 200) {
        this.$message.success("添加成功");
        this.createsoft = false;
        this.getruandata();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取表格仿真类工具信息
    async getfzdata() {
      if (this.$route.params.id === undefined) {
        this.$router.push({ name: "environmentconfig" });
      } else {
        const res = await this.$http.get(`benchsimtools/${this.$route.params.id}`);
        if (res.data.status === 200) {
          this.fzdata = res.data.toolsinfo;
          this.checkedCities2 = [];
          res.data.toolsinfo.forEach(element => {
            this.checkedCities2.push(element.id);
          });
        }
      }
    },
    // 获取所有仿真工具信息
    async addfzsoft() {
      const res = await this.$http.get(`simtools/${this.$route.params.type}`);
      if (res.data.status === 200) {
        this.caselist2 = res.data.tools;
        this.fzsoft = true;
        this.casesAll2 = [];
        res.data.tools.forEach(element => {
          this.casesAll2.push(element.id);
        });
        if (this.checkedCities2.length > 0 && this.checkedCities2.length < this.caselist2.length) {
          this.isIndeterminate2 = true;
          this.checkAll2 = false;
        } else if (this.checkedCities2.length ===  this.caselist2.length) {
          this.isIndeterminate2 = false;
          this.checkAll2 = true;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 仿真软件选取全选
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? this.casesAll2 : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.caselist2.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.caselist2.length;
    },
    // 添加仿真工具信息
    async creatsofts2() {
      const res = await this.$http.post(
        `benchsimtools/${this.$route.params.id}`,
        { tool_id: this.checkedCities2 }
      );
      if (res.data.status === 200) {
        this.$message.success("添加成功");
        this.fzsoft = false;
        this.getfzdata();
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.geteqment();
    this.getbench();
    this.getruandata();
    this.getfzdata();
  }
};
</script>

<style>
.configmore {
  margin: 12px 0 20px 20px;
}
.selecteq {
  margin: 0 0 0 50px;
}
.workcon .el-cascader-menu {
  min-width: 210px !important;
}
.workconfigtop {
  display: inline-block;
  vertical-align: middle;
}
.workconfigbox {
  width: 1520px;
  margin: 10px auto;
  height: 276px;
}
.workconfigbox .el-form-item {
  width: 470px;
  margin: 0 0 14px 0;
}
.workconfigbox .el-form-item__content {
  width: 300px;
}
.workbtn {
  margin-top: 20px;
  text-align: center;
}
.workconfigcard {
  margin: 0 30px 0 30px;
  height: 420px;
  width: 1626px;
}
.workconfigcard .el-card__body {
  padding: 20px 20px 10px 20px;
}
.workconfigcard-lb {
  width: 808px;
  display: inline-block;
  margin: 10px 10px 0 30px;
  height: 400px;
}
.workconfigcard-rb {
  display: inline-block;
  vertical-align: top;
  margin: 10px 0 0 0;
  width: 808px;
  height: 400px;
}
.workconfigcard-lb .el-card__body {
  padding: 0px 20px 10px 20px;
}
.workconfigcard-rb .el-card__body {
  padding: 0px 20px 10px 20px;
}
.workconfigcard-lb .el-form-item {
  margin: 0 0 14px 0;
}
.workconfig-radio {
  text-align: center;
  margin-bottom: 20px;
}
.table-title {
  border-bottom: 1px solid #dcdfe6;
  height: 40px;
  /* box-sizing: border-box; */
  line-height: 40px;
  color: #606266;
  font-weight: 700;
  padding-left: 10px;
}
.checked-box {
  height: 500px;
  overflow: auto;
}
.casescheckbox {
  width: 460px;
  margin-left: 30px;
}
</style>

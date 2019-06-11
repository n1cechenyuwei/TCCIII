<template>
  <div>
    <el-card shadow="always" class="simulcard">
      <div class="simultitle">
        <span>
          工作台
        </span>
        <el-button class="simultop-btn" size="mini" type="success" @click="creatework">添加工作台</el-button>
      </div>
      <el-table
        :data="benchData"
        stripe
        height="250"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="number"
          label="工作台编号">
        </el-table-column>
        <el-table-column
          prop="system_version"
          label="系统版本号">
        </el-table-column>
        <el-table-column
          width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-setting" @click="handleeqcaozuo(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="always" class="simulcard">
      <div class="simultitle">
        <span>
          服务器
        </span>
        <el-button class="simultop-btn" size="mini" type="success" @click="serverDialogVisible = true">添加服务器</el-button>
      </div>
      <el-table
        :data="serverData"
        stripe
        height="250"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scopetwo">
            <div class="cases-list cases-listtitle">软件列表：</div>
            <div class="tagbox">
              <el-tag size="medium" class="tag-class" v-for="(li, index) in scopetwo.row.tools" :key="index" type="warning">{{li.toolname}}（{{li.version}}）</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="number"
          label="服务器编号">
        </el-table-column>
        <el-table-column
          prop="ip_address"
          label="IP地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="system_version"
          label="系统版本号">
        </el-table-column>
        <el-table-column
          width="200"
          label="操作">
          <template slot-scope="scopetwo">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editserver(scopetwo.row.id)"></el-button>
            <el-button type="warning" size="mini" icon="el-icon-circle-plus-outline" @click="serversoft(scopetwo.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteserver(scopetwo.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card shadow="always" class="simulcard3">
      <div class="simultitle">
        <span>
          环境参数
        </span>
        <el-button class="simultop-btn" size="mini" type="success" @click="argumentDialogVisible = true">添加环境参数</el-button>
      </div>
      <el-table
        :data="argumentdata"
        stripe
        height="240"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="eq_type"
          show-overflow-tooltip
          label="软件名称">
        </el-table-column>
        <el-table-column
          prop="ip_address"
          label="IP地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="port"
          show-overflow-tooltip
          label="端口">
        </el-table-column>
        <el-table-column
          prop="sip_id"
          show-overflow-tooltip
          label="SIPID">
        </el-table-column>
        <el-table-column
          prop="field"
          show-overflow-tooltip
          label="域">
        </el-table-column>
        <el-table-column
          prop="password"
          show-overflow-tooltip
          label="密码">
        </el-table-column>
         <el-table-column
          width="150"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="primary" @click="editargumentdata(scope.row.id)"></el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteargumentdata(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加工作台 -->
    <el-dialog
      title="添加工作台"
      :visible.sync="selectwork"
      width="576px"
      center>
      <div class="checked-box">
        <div v-if="caselist.length === 0">暂无工作台</div>
        <el-checkbox :indeterminate="isIndeterminate" v-if="caselist.length !== 0" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="casescheckbox" v-for="item in caselist" :label="item.id" :key="item.id">{{item.number}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectwork = false">取 消</el-button>
        <el-button size="small" type="primary" @click="workhandle">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建服务器 -->
    <el-dialog
      title="新建服务器"
      @close="workclose"
      :visible.sync="serverDialogVisible"
      width="500px"
      center>
      <el-form label-position="right" label-width="150px" ref="createserverform" :model="createserverform">
        <el-form-item
        label="服务器编号"
        :rules="[
          { required: true, message: '请输入服务器编号', trigger: 'blur' },
          { max: 15, message: '服务器编号最长为15个汉字', trigger: 'blur' }
        ]"
        prop="number">
          <el-input size="small" class="workconfiginput" v-model="createserverform.number"></el-input>
        </el-form-item>
        <el-form-item
          label="服务器IP地址"
          :rules="[
            { required: true, message: '请输入服务器IP地址', trigger: 'blur' },
            { max: 20, message: '服务器ip最长为20个字符', trigger: 'blur' }
          ]"
          prop="ip_address">
          <el-input size="small"  class="workconfiginput" v-model="createserverform.ip_address"></el-input>
        </el-form-item>
        <el-form-item
          label="系统版本"
          :rules="[
            { required: true, message: '请输入服务器系统版本', trigger: 'blur' },
            { max: 30, message: '系统版本最长为30个汉字', trigger: 'blur' }
          ]"
          prop="system_version">
          <el-input size="small"  class="workconfiginput" v-model="createserverform.system_version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="serverDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitserver">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改服务器信息 -->
    <el-dialog
      title="新建服务器"
      :visible.sync="editserverDialogVisible"
      width="500px"
      center>
      <el-form label-position="right" label-width="150px" ref="editeserverform" :model="editeserverform">
        <el-form-item
        label="服务器编号"
        :rules="[
          { required: true, message: '请输入服务器编号', trigger: 'blur' },
          { max: 15, message: '服务器编号最长为15个汉字', trigger: 'blur' }
        ]"
        prop="number">
          <el-input size="small" class="workconfiginput" v-model="editeserverform.number"></el-input>
        </el-form-item>
        <el-form-item
          label="服务器IP地址"
          :rules="[
            { required: true, message: '请输入服务器IP地址', trigger: 'blur' },
            { max: 20, message: '服务器ip最长为20个字符', trigger: 'blur' }
          ]"
          prop="ip_address">
          <el-input size="small"  class="workconfiginput" v-model="editeserverform.ip_address"></el-input>
        </el-form-item>
        <el-form-item
          label="系统版本"
          :rules="[
            { required: true, message: '请输入服务器系统版本', trigger: 'blur' },
            { max: 30, message: '系统版本最长为30个汉字', trigger: 'blur' }
          ]"
          prop="system_version">
          <el-input size="small"  class="workconfiginput" v-model="editeserverform.system_version"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editserverDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submiteditserver">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选取服务器软件 -->
    <el-dialog
      title="添加仿真软件信息"
      :visible.sync="selectwork2"
      width="576px"
      center>
      <div class="checked-box">
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
          <el-checkbox class="casescheckbox" v-for="item in caselist2" :label="item.id" :key="item.id">{{item.toolname}}（{{item.version}}）</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="selectwork2 = false">取 消</el-button>
        <el-button size="small" type="primary" @click="serverhandle">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加环境参数 -->
    <el-dialog
      title="添加环境参数"
      @close="argumentclose"
      :visible.sync="argumentDialogVisible"
      width="500px"
      center>
      <el-form label-position="right" label-width="150px" ref="craetargumentform" :model="craetargumentform">
        <el-form-item
        label="软件名称"
        :rules="[
          { required: true, message: '请输入软件名称', trigger: 'blur' },
          { max: 15, message: '软件名称最长为15个汉字', trigger: 'blur' }
        ]"
        prop="eq_type">
          <el-input size="small" class="workconfiginput" v-model="craetargumentform.eq_type"></el-input>
        </el-form-item>
        <el-form-item
          label="IP地址"
          :rules="[
            { required: true, message: '请输入IP地址', trigger: 'blur' },
            { max: 30, message: 'IP地址最长为30个字符', trigger: 'blur' }
          ]"
          prop="ip_address">
          <el-input size="small"  class="workconfiginput" v-model="craetargumentform.ip_address"></el-input>
        </el-form-item>
        <el-form-item
          label="端口"
          :rules="[
            { required: true, message: '请输入端口', trigger: 'blur' },
            { max: 4, message: '端口最长为4个字符', trigger: 'blur' }
          ]"
          prop="port">
          <el-input size="small"  class="workconfiginput" v-model="craetargumentform.port"></el-input>
        </el-form-item>
        <el-form-item
          label="SIPID"
          :rules="[
            { required: true, message: '请输入SIPID', trigger: 'blur' },
            { max: 10, message: 'SIPID最长为10个字符', trigger: 'blur' }
          ]"
          prop="sip_id">
          <el-input size="small"  class="workconfiginput" v-model="craetargumentform.sip_id"></el-input>
        </el-form-item>
        <el-form-item
          label="域"
          :rules="[
            { required: true, message: '请输入域名', trigger: 'blur' },
            { max: 10, message: '域名最长为10个字符', trigger: 'blur' }
          ]"
          prop="field">
          <el-input size="small"  class="workconfiginput" v-model="craetargumentform.field"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 10, message: '密码最长为10个字符', trigger: 'blur' }
          ]"
          prop="password">
          <el-input size="small"  class="workconfiginput" v-model="craetargumentform.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="argumentDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitargument">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改环境参数 -->
    <el-dialog
      title="修改环境参数"
      :visible.sync="editargumentDialogVisible"
      width="500px"
      center>
      <el-form label-position="right" label-width="150px" ref="editargumentform" :model="editargumentform">
        <el-form-item
        label="软件名称"
        :rules="[
          { required: true, message: '请输入软件名称', trigger: 'blur' }
        ]"
        prop="eq_type">
          <el-input size="small" class="workconfiginput" v-model="editargumentform.eq_type"></el-input>
        </el-form-item>
        <el-form-item
          label="IP地址"
          :rules="[
            { required: true, message: '请输入IP地址', trigger: 'blur' },
            { max: 30, message: 'IP地址最长为30个字符', trigger: 'blur' }
          ]"
          prop="ip_address">
          <el-input size="small"  class="workconfiginput" v-model="editargumentform.ip_address"></el-input>
        </el-form-item>
        <el-form-item
          label="端口"
          :rules="[
            { required: true, message: '请输入端口', trigger: 'blur' },
            { max: 4, message: '端口最长为4个字符', trigger: 'blur' }
          ]"
          prop="port">
          <el-input size="small"  class="workconfiginput" v-model="editargumentform.port"></el-input>
        </el-form-item>
        <el-form-item
          label="SIPID"
          :rules="[
            { required: true, message: '请输入SIPID', trigger: 'blur' },
            { max: 10, message: 'SIPID最长为10个字符', trigger: 'blur' }
          ]"
          prop="sip_id">
          <el-input size="small"  class="workconfiginput" v-model="editargumentform.sip_id"></el-input>
        </el-form-item>
        <el-form-item
          label="域"
          :rules="[
            { required: true, message: '请输入域名', trigger: 'blur' },
            { max: 10, message: '域名最长为10个字符', trigger: 'blur' }
          ]"
          prop="field">
          <el-input size="small"  class="workconfiginput" v-model="editargumentform.field"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { max: 10, message: '密码最长为10个字符', trigger: 'blur' }
          ]"
          prop="password">
          <el-input size="small"  class="workconfiginput" v-model="editargumentform.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editargumentDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="editsubargument">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["type", "bcname", "bcpath", "bctype"],
  data() {
    return {
      worktype: this.type,
      wbcname: this.bcname,
      wbcpath: this.bcpath,
      wbctype: this.bctype,
      serverDialogVisible: false,
      editserverDialogVisible: false,
      argumentDialogVisible: false,
      editargumentDialogVisible: false,
      benchData: [],
      serverData: [],
      argumentdata: [],
      selectwork: false,
      isIndeterminate: false,
      checkAll: false,
      checkedCities: [], // 选中的工作台
      caselist: [], // 所有工作台数据
      casesAll: [], // 所有工作台的id
      createserverform: {
        number: "",
        ip_address: "",
        system_version: ""
      },
      editeserverform: {
        number: "",
        ip_address: "",
        system_version: ""
      },
      selectwork2: false,
      isIndeterminate2: false,
      checkAll2: false,
      checkedCities2: [], // 选中的服务器软件
      caselist2: [], // 所有仿真服务器软件数据
      casesAll2: [], // 所有仿真服务器软件的id
      serverid: "", // 服务器id
      craetargumentform: {
        eq_type: "",
        ip_address: "",
        port: "",
        sip_id: "",
        field: "",
        password: ""
      },
      editargumentform: {}
    };
  },
  methods: {
    async creatework() {
      const res = await this.$http.get(`workbenches/${this.worktype}`);
      if (res.data.status === 200) {
        this.caselist = res.data.benchlist;
        this.selectwork = true;
        this.casesAll = [];
        res.data.benchlist.forEach(element => {
          this.casesAll.push(element.id);
        });
        if (
          this.checkedCities.length > 0 &&
          this.checkedCities.length < this.caselist.length
        ) {
          this.isIndeterminate = true;
          this.checkAll = false;
        } else if (this.checkedCities.length === this.caselist.length) {
          this.isIndeterminate = false;
          this.checkAll = true;
        }
      }
    },
    // 工作台选取全选
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
    // 获取表格工作台数据
    async getbench() {
      const res = await this.$http.get(`simulationbench/${this.worktype}`);
      if (res.data.status === 200) {
        this.benchData = res.data.benchlist;
        this.checkedCities = [];
        res.data.benchlist.forEach(element => {
          this.checkedCities.push(element.id);
        });
      }
    },
    // 提交工作台
    async workhandle() {
      const res = await this.$http.put(`batchsetsim/${this.worktype}`, {
        benchids: this.checkedCities
      });
      if (res.data.status === 200) {
        this.$message.success(res.data.msg);
        this.selectwork = false;
        this.getbench();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleeqcaozuo(row) {
      this.$router.push({
        name: "workconfig",
        params: {
          id: row.id,
          name: this.wbcname,
          path: this.wbcpath,
          type: this.wbctype
        }
      });
    },
    // 获取服务器列表
    async getserver() {
      const res = await this.$http.get(`simservers/${this.worktype}`);
      if (res.data.status === 200) {
        this.serverData = res.data.serverinfo;
      }
    },
    // 添加服务器弹窗关闭
    workclose() {
      this.$refs.createserverform.resetFields();
    },
    // 提交服务器
    async submitserver() {
      this.$refs.createserverform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入服务器信息");
        }
        const res = await this.$http.post(
          `simservers/${this.worktype}`,
          this.createserverform
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.serverDialogVisible = false;
          this.getserver();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    async editserver(id) {
      const res = await this.$http.get(`simserver/${id}`);
      if (res.data.status === 200) {
        this.editserverDialogVisible = true;
        this.editeserverform = res.data.serverinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 提交修改服务器信息
    async submiteditserver() {
      this.$refs.editeserverform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入服务器信息");
        }
        const res = await this.$http.put(
          `simserver/${this.editeserverform.id}`,
          this.editeserverform
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.editserverDialogVisible = false;
          this.getserver();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除服务器信息
    async deleteserver(id) {
      this.$confirm("确定要删除该服务器吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`simserver/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getserver();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    async serversoft(row) {
      this.serverid = row.id;
      this.checkedCities2 = [];
      row.tools.forEach(element => {
        this.checkedCities2.push(element.id);
      });
      const res = await this.$http.get(`simtools/${this.worktype}`);
      if (res.data.status === 200) {
        this.caselist2 = res.data.tools;
        this.selectwork2 = true;
        this.casesAll2 = [];
        res.data.tools.forEach(element => {
          this.casesAll2.push(element.id);
        });
        if (
          this.checkedCities2.length > 0 &&
          this.checkedCities2.length < this.caselist2.length
        ) {
          this.isIndeterminate2 = true;
          this.checkAll2 = false;
        } else if (this.checkedCities2.length === this.caselist2.length) {
          this.isIndeterminate2 = false;
          this.checkAll2 = true;
        } else {
          this.isIndeterminate2 = false;
          this.checkAll2 = false;
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 服务器工具选取全选
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? this.casesAll2 : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.caselist2.length;
      this.isIndeterminate2 =
        checkedCount > 0 && checkedCount < this.caselist2.length;
    },
    // 提交服务器工具信息
    async serverhandle() {
      const res = await this.$http.post(`simserver/${this.serverid}`, {
        tool_id: this.checkedCities2
      });
      if (res.data.status === 200) {
        this.$message.success(res.data.msg);
        this.selectwork2 = false;
        this.getservertools();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取单个服务器下的软件列表
    async getservertools() {
      const res = await this.$http.get(`localsearchsimtools/${this.serverid}`);
      if (res.data.status === 200) {
        for (let i = 0; i < this.serverData.length; i++) {
          if (this.serverData[i].id === this.serverid) {
            this.serverData[i].tools = res.data.tools;
          }
        }
      }
    },
    // 获取所有环境参数
    async getargumentdata() {
      const res = await this.$http.get(`envparameters/${this.worktype}`);
      if (res.data.status === 200) {
        this.argumentdata = res.data.parameters;
      }
    },
    // 添加环境参数弹窗关闭
    argumentclose() {
      this.$refs.craetargumentform.resetFields();
    },
    // 修改环境参数按钮
    async editargumentdata(id) {
      const res = await this.$http.get(`envparameter/${id}`);
      if (res.data.status === 200) {
        this.editargumentform = res.data.parameters;
        this.editargumentDialogVisible = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 提交环境参数
    async submitargument() {
      this.$refs.craetargumentform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入环境参数信息");
        }
        const res = await this.$http.post(
          `envparameters/${this.worktype}`,
          this.craetargumentform
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.argumentDialogVisible = false;
          this.getargumentdata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 修改环境参数提交
    async editsubargument() {
      this.$refs.editargumentform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入环境参数信息");
        }
        const res = await this.$http.put(
          `envparameter/${this.editargumentform.id}`,
          this.editargumentform
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.editargumentDialogVisible = false;
          this.getargumentdata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除环境参数信息
    deleteargumentdata(id) {
      this.$confirm("确定要删除该环境参数吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`envparameter/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getargumentdata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    }
  },
  created() {
    this.getbench();
    this.getserver();
    this.getargumentdata();
  }
};
</script>

<style>
.simulcard {
  padding: 0;
  margin: 0 0 10px 0;
}
.simulcard .el-card__body {
  padding: 0 20px;
}
.simulcard3 {
  padding: 0;
  margin: 0;
}
.simulcard3 .el-card__body {
  padding: 0 20px;
}
.simultitle {
  border-bottom: 1px solid #dcdfe6;
  height: 40px;
  vertical-align: middle;
  line-height: 40px;
  font-size: 20px;
  /* color: #303133; */
  color: #606266;
  font-weight: 700;
  position: relative;
}
.simultop-btn {
  position: absolute;
  right: 10px;
  top: 6px;
}
.checked-box {
  height: 500px;
  overflow: auto;
}
.tagbox {
  width: 1300px;
  display: inline-block;
  vertical-align: top;
}
.casescheckbox {
  width: 450px;
  margin-left: 30px;
}
.cases-list {
  display: inline-block;
  vertical-align: top;
}
.cases-listtitle {
  width: 100px;
}
.tag-class {
  margin: 0 0 6px 10px;
}
</style>

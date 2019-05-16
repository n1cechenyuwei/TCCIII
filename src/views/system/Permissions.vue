<template>
  <div>
    <div class="mytask-content-top">
      <el-button type="success" size="small" @click="createrole" class="creatrole">创建角色</el-button>
    </div>
    <div class="personnel-table">
      <el-table
        :data="rolesData"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="execute_task"
          width="200"
          label="可执行任务类型">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="角色描述">
        </el-table-column>
        <el-table-column
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="permissionsEdit(scope.row.id)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)"></el-button>
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
    <!-- 创建角色 -->
    <el-dialog
      title="创建角色"
      :visible.sync="creatroleVisible"
      width="500px"
      @close="creatroleclose"
      center>
      <el-form label-position="right" label-width="110px" ref="creatroleform" :model="creatroleform" :rules="creatroleformrules">
        <el-form-item label="角色名称" prop="role_name">
          <el-input style="width: 290px" size="small" v-model.number.trim="creatroleform.role_name"></el-input>
        </el-form-item>
        <el-form-item label="执行任务类型" prop="worktype">
          <el-input style="width: 290px" size="small" v-model.number.trim="creatroleform.execute_task"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledescribe">
          <el-input style="width: 290px" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" resize="none" v-model.trim="creatroleform.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="creatroleVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handlecreatrole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="权限分配"
      :visible.sync="permissionsVisible"
      width="500px"
      @close="checkrolesclose"
      center>
      <el-tree
        :data="permissionslist"
        accordion
        show-checkbox
        ref="rolestree"
        node-key="id"
        :default-checked-keys="check_keys"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="permissionsVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handlepermissions">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creatroleVisible: false,
      permissionsVisible: false,
      currentPage: 1, // 当前页数
      personnelpagesize: 10, // 每页显示条数
      total_num: 0,
      creatroleform: {
        role_name: "",
        execute_task: "",
        describe: ""
      },
      creatroleformrules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        execute_task: [
          { required: true, message: "请选择执行任务类型", trigger: "blur" }
        ],
        describe: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      rolesData: [],
      cosplayid: "",
      permissionslist: [],
      check_keys: [],
      defaultProps: {
        children: "children",
        label: "label"
      } // 树形结构默认绑定名称
    };
  },
  methods: {
    createrole() {
      this.creatroleVisible = true;
    },
    handlecreatrole() {
      this.$refs.creatroleform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请补全信息");
        }
        const res = await this.$http.post(`createrole`, this.creatroleform);
        if (res.data.status === 200) {
          this.$message.success("创建角色成功");
          this.creatroleVisible = false;
          this.getdata(this.currentPage);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    creatroleclose() {
      this.$refs.creatroleform.resetFields();
    },
    checkrolesclose() {
      this.check_keys = [];
      this.permissionslist = [];
    },
    handlePageChange(page) {
      this.getdata(page);
    },
    async permissionsEdit(id) {
      this.allrolesData();
      this.cosplayid = id;
      this.check_keys = [];
      const res = await this.$http.get(`rolemenus/${id}`);
      if (res.data.status === 200) {
        this.check_keys = res.data.permissions;
        this.permissionsVisible = true;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handleDelete(id) {
      this.$confirm("确定要删除该角色吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`deleterole/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getdata(this.currentPage);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    async handlepermissions() {
      const checkedKeys = this.$refs.rolestree.getCheckedKeys();
      const oneKeys = this.$refs.rolestree.getHalfCheckedKeys();
      // const allkeys = checkedKeys.concat(oneKeys);
      const res = await this.$http.post(`rolemenus/${this.cosplayid}`, {
        half_selected: oneKeys,
        check_all: checkedKeys
      });
      if (res.data.status === 200) {
        this.$message.success("角色权限关联成功");
        this.permissionsVisible = false;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async getdata(page) {
      const res = await this.$http.get(`roles/${page}`);
      if (res.data.status === 200) {
        this.rolesData = res.data.roles;
        this.total_num = res.data.total_num;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 获取所有权限
    async allrolesData() {
      const res = await this.$http.get(`menus`);
      if (res.data.status === 200) {
        this.permissionslist = res.data.menu_list;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.getdata(this.currentPage);
    this.allrolesData();
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
.creatrole {
  margin: 10px 0 0 20px;
}
.roleselect {
  width: 100%;
}
.personnel-table {
  height: 760px;
  min-width: 1670px;
}
.taskpage {
  margin-left: 30px;
}
</style>

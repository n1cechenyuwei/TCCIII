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
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="worktype"
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
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="permissionsEdit"></el-button>
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
      title="创建角色"
      :visible.sync="creatroleVisible"
      width="500px"
      @close="creatroleclose"
      center>
      <el-form label-position="right" label-width="110px" ref="creatroleform" :model="creatroleform" :rules="creatroleformrules">
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model.number.trim="creatroleform.name"></el-input>
        </el-form-item>
        <el-form-item label="执行任务类型" prop="worktype">
          <el-select v-model="creatroleform.worktype" placeholder="请选择执行任务类型" size="small" class="roleselect">
            <el-option
              v-for="item in projectoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述" prop="roledescribe">
          <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 6}" resize="none" v-model.trim="creatroleform.roledescribe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="creatroleVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="handlecreatrole">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="权限分配"
      :visible.sync="permissionsVisible"
      width="500px"
      center>
      <el-tree
        :data="permissionslist"
        show-checkbox
        node-key="id"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="permissionsVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="handlepermissions">确 定</el-button>
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
      creatroleform: {
        name: "",
        worktype: "",
        roledescribe: ""
      },
      creatroleformrules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        worktype: [
          { required: true, message: "请选择执行任务类型", trigger: "blur" }
        ],
        roledescribe: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },
      projectoptions: [
        {
          value: 1,
          label: "实验室检测任务"
        },
        {
          value: 2,
          label: "合同签订任务"
        }
      ],
      rolesData: [
        {
          name: "申请审批员",
          worktype: "申请审批任务",
          describe: "该角色负责审批送检厂家的申请审批"
        },
        {
          name: "合同管理员",
          worktype: "合同签订任务",
          describe: "该角色负责合同的管理"
        }
      ],
      permissionslist: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
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
      this.$refs.creatroleform.validate(valid => {
        if (!valid) {
          this.$message.error("请补全信息");
        } else {
          console.log(111);
        }
      });
    },
    creatroleclose() {
      this.$refs.creatroleform.resetFields();
    },
    handlePageChange() {},
    permissionsEdit() {
      this.permissionsVisible = true;
    },
    handleDelete() {},
    handlepermissions() {
      this.permissionsVisible = false;
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
.creatrole {
  margin: 10px 0 0 20px;
}
.roleselect {
  width: 100%;
}
.personnel-table {
  height: 720px;
  min-width: 1670px;
}
.taskpage {
  margin-left: 30px;
}
</style>

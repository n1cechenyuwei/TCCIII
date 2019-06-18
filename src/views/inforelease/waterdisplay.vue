<template>
  <div>
    <div class="mytask-content-top">
      <el-button type="success" size="small" @click="creatwaterinfovs = true" class="creatrole">创建水牌</el-button>
    </div>
    <div class="personnel-table">
      <el-table
        max-height="800"
        :data="waterinfodata"
        style="width: 100%">
        <el-table-column
          align="center"
          label="房间号"
          prop="room_num"
          width="120">
        </el-table-column>
        <el-table-column
          prop="room_name"
          label="房间名"
          width="200">
        </el-table-column>
        <el-table-column
          width="200"
          label="负责人">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.duty_person" :key="index">{{item}}&nbsp;&nbsp;</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="projects"
          label="项目">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.projects" :key="index">{{item}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </template>
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
    <!-- 创建角色 -->
    <el-dialog
      title="水牌信息"
      :visible.sync="creatwaterinfovs"
      width="600px"
      @close="creatroleclose"
      center>
      <div style="margin: 0 auto">
        <el-form label-position="right" label-width="110px" ref="waterform" :model="waterform" :rules="waterformrules">
          <el-form-item label="房间号" prop="room_num">
            <el-input style="width: 340px" size="small" v-model.trim="waterform.room_num"></el-input>
          </el-form-item>
          <el-form-item label="房间名" prop="room_name">
            <el-input style="width: 340px" size="small" v-model.trim="waterform.room_name"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="duty_person">
            <el-select style="width: 340px" v-model="waterform.duty_person" multiple placeholder="请选择" size="mini">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前任务" prop="projects">
            <el-checkbox-group v-model="waterform.projects" class="wainfo_checkbox">
              <el-checkbox size="mini" border class="wainfo_checkbox_li" v-for="(item, index) in taskoptions" :label="item.proid" :key="index">{{item.project_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="creatwaterinfovs = false">取 消</el-button>
        <el-button size="small" type="primary" @click="creatwaterinfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="电子水牌信息修改"
      :visible.sync="permissionsVisible"
      width="600px"
      @close="checkrolesclose"
      center>
      <el-form label-position="right" label-width="110px" ref="editwaterform" :model="editwaterform">
        <el-form-item
          label="房间号"
          :rules="[
            { required: true, message: '请输入房间名', trigger: 'blur' },
            { max: 15, message: '房间名最长为20个字符', trigger: 'blur' }
          ]"
          prop="room_num">
          <el-input style="width: 340px" size="small" v-model.trim="editwaterform.room_num"></el-input>
        </el-form-item>
        <el-form-item
          label="房间名"
          prop="room_name"
          :rules="[
            { required: true, message: '请输入房间名', trigger: 'blur' },
            { max: 15, message: '房间名最长为20个字符', trigger: 'blur' }
          ]">
          <el-input style="width: 340px" size="small" v-model.trim="editwaterform.room_name"></el-input>
        </el-form-item>
        <el-form-item
          label="负责人"
          :rules="[
            { required: true, message: '请选择负责人', trigger: 'blur' }
          ]"
          prop="duty_person">
          <el-select style="width: 340px" v-model="editwaterform.duty_person" multiple placeholder="请选择" size="mini">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前任务" prop="projects">
          <el-checkbox-group v-model="editwaterform.projects" class="wainfo_checkbox">
            <el-checkbox size="mini" border class="wainfo_checkbox_li" v-for="(item, index) in taskoptions" :label="item.proid" :key="index">{{item.project_name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="permissionsVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handlewaterinfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      creatwaterinfovs: false,
      permissionsVisible: false,
      waterinfodata: [],
      options: [],
      taskoptions: [],
      waterform: {
        room_num: "",
        room_name: "",
        duty_person: [],
        projects: []
      },
      waterformrules: {
        room_num: [
          { required: true, message: "请输入房间号", trigger: "blur" },
          { max: 20, message: "房间号最长为20个字符", trigger: "blur" }
        ],
        room_name: [
          { required: true, message: "请输入房间名", trigger: "blur" },
          { max: 15, message: "房间名最长为15个字符", trigger: "blur" }
        ],
        duty_person: [
          { required: true, message: "请选择负责人", trigger: "blur" }
        ]
      },
      editwaterform: {
        id: "",
        room_num: "",
        room_name: "",
        duty_person: [],
        projects: []
      }
    };
  },
  methods: {
    creatroleclose() {
      this.$refs.waterform.resetFields();
    },
    checkrolesclose() {
      this.$refs.editwaterform.resetFields();
    },
    creatwaterinfo() {
      this.$refs.waterform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入房间信息");
        }
        const res = await this.$http.post(`signs`, this.waterform);
        if (res.data.status === 200) {
          this.$message.success("创建成功");
          this.creatwaterinfovs = false;
          this.getdata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    async permissionsEdit(id) {
      const res = await this.$http.get(`sign/${id}`);
      if (res.data.status === 200) {
        this.permissionsVisible = true;
        this.editwaterform.id = res.data.signs.id;
        this.editwaterform.duty_person = res.data.signs.duty_person;
        if (res.data.signs.projects === null) {
          this.editwaterform.projects = [];
        } else {
          this.editwaterform.projects = res.data.signs.projects;
        }
        this.editwaterform.room_name = res.data.signs.room_name;
        this.editwaterform.room_num = res.data.signs.room_num;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    handlewaterinfo() {
      this.$refs.editwaterform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入房间信息");
        }
        console.log(this.editwaterform)
        const res = await this.$http.put(
          `sign/${this.editwaterform.id}`,
          this.editwaterform
        );
        if (res.data.status === 200) {
          this.$message.success("修改房间信息成功");
          this.permissionsVisible = false;
          this.getdata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleDelete(id) {
      this.$confirm("确定要删除该房间吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`sign/${id}`);
          if (res.data.status === 200) {
            this.$message.success(res.data.msg);
            this.getdata();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    async getdata() {
      const res = await this.$http.get(`signs`);
      if (res.data.status === 200) {
        this.waterinfodata = res.data.signs;
      }
    },
    async getppop() {
      const res = await this.$http.get(`users`);
      if (res.data.status === 200) {
        this.options = res.data.users;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async projectdata() {
      const res = await this.$http.get("testprojects");
      if (res.data.status === 200) {
        this.taskoptions = res.data.projects;
      } else {
        this.$message.error(res.data.msg);
      }
    }
  },
  created() {
    this.getdata();
    this.getppop();
    this.projectdata();
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
.wainfo_checkbox {
  margin: 8px 0 0 0;
}
.wainfo_checkbox_li {
  margin-right: 5px;
}
.wainfo_checkbox .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
  /* margin-right: 5px; */
}
</style>

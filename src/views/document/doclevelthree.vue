<template>
  <div
    v-loading="up_disabled"
    element-loading-text="文件上传中，请稍等"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
    <div class="mydoc-top">
      <div class="breac">
        <span class="tiaozhuan" @click="pushdocument">{{levelthreedata.breacname}} </span>
        <i class="mianbaoicon el-icon-arrow-right"></i>
        <span class="tiaozhuan" @click="pushleveltwo"> {{levelthreedata.leveltwoname}} </span>
        <i class="mianbaoicon el-icon-arrow-right"></i>
        <span class="butiaozhuan"> {{levelthreedata.levelthreename}}</span>
        <el-upload
          accept=".docx, .doc, .pdf, .xlsx, .txt"
          :name="levelthreedata.upname"
          :headers="httpheader"
          :http-request="uploador"
          :action="$store.state.baseurl + levelthreedata.upaction"
          :show-file-list="false"
          :on-error="uploaderror"
          :data="levelthreedata.updata"
          :multiple="false">
          <el-button class="docupbtn" size="mini" type="primary">{{levelthreedata.btnname}}</el-button>
        </el-upload>
      </div>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table5">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one"
          stripe
          max-height="800"
          style="width: 100%">
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="名称">
            <template slot-scope="scope">
              <div class="docclick1">
                <i v-show="scope.row.file_ext !== 'xlsx' && scope.row.file_ext !== 'doc' && scope.row.file_ext !== 'docx' && scope.row.file_ext !== 'pptx' && scope.row.file_ext !== 'pdf' && scope.row.file_ext !== 'txt'" class="el-icon-document wenjian"></i>
                <i v-show="scope.row.file_ext === 'xlsx'" class="iconfont icon-excel docexcel"></i>
                <i v-show="scope.row.file_ext === 'doc' || scope.row.file_ext === 'docx'" class="iconfont icon-excel docword"></i>
                <i v-show="scope.row.file_ext === 'pptx'" class="iconfont icon-ppt1 docppt"></i>
                <i v-show="scope.row.file_ext === 'pdf'" class="iconfont icon-pdf docpdf"></i>
                <i v-show="scope.row.file_ext === 'txt'" class="iconfont icon-txt doctxt"></i>
                <span>{{scope.row.name}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="文档类型"
            show-overflow-tooltip
            width="180">
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="生成时间"
            show-overflow-tooltip
            width="200">
          </el-table-column>
          <el-table-column
            prop="paper_position"
            label="纸质文档存放位置"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            width="200"
            label="操作">
            <template slot-scope="scope">
              <a :href="scope.row.down_url" :download="scope.row.down_url" class="docbtn">
                <el-button size="mini" type="primary" icon="el-icon-download"></el-button>
              </a>
              <el-button size="mini" @click="editposition(scope.row)" type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" @click="deletedoc(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="修改纸质文档存放位置"
      :visible.sync="paper_positionvs"
      @close="paper_positionclose"
      width="576px">
      <el-form :model="docfrom" ref="docfrom" label-width="180px" class="demo-dynamic" label-position="right">
        <el-form-item
          prop="paper_position"
          label="纸质文档存放位置"
          :rules="[
            { max: 66, message: '最多 66 个字符', trigger: 'blur' }
          ]">
          <el-input style="width: 300px" size="small" v-model="docfrom.paper_position"></el-input>
        </el-form-item>
      </el-form>
      <div class="deca-btn">
        <el-button plain size="small" @click="paper_positionvs = false">取 消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="submitpp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paper_positionvs: false,
      projectlist: [],
      levelthreedata: "",
      docfrom: {
        id: "",
        paper_position: ""
      },
      edittypeurl: "",
      httpheader: {
        token: ""
      },
      up_disabled: false
    };
  },
  methods: {
    token() {
      const token = sessionStorage.getItem("token");
      this.httpheader.token = token;
    },
    async uploador(params) {
      if (params.file) {
        const res = await this.$http.get(
          "verificationpermissions/uploadcommondocs"
        );
        if (res.data.status === 333) {
          return this.$message.error(res.data.msg);
        } else if (res.data.status === 222) {
          this.up_disabled = true;
          const _file = params.file;
          let formData = new FormData();
          formData.append(this.levelthreedata.upname, _file);
          formData.append(
            this.levelthreedata.updataname,
            this.levelthreedata.updataid
          );
          const res2 = await this.$http.post(
            `${this.levelthreedata.upaction}`,
            formData
          );
          if (res2.data.status === 200) {
            this.up_disabled = false;
            this.$message.success("上传成功");
            this.getdoc();
          } else {
            this.up_disabled = false;
            this.$message.error(res2.data.msg);
          }
        }
      }
    },
    loadingdata() {
      this.levelthreedata = this.$route.params.nextdata;
      this.getdoc();
    },
    pushdocument() {
      this.$router.push({
        name: this.levelthreedata.breacpath
      });
    },
    pushleveltwo() {
      this.$router.push({
        name: "docleveltwo",
        params: {
          nextdata: this.levelthreedata
        }
      });
    },
    async getdoc() {
      const res = await this.$http.get(
        `${this.levelthreedata.geturl}/${this.levelthreedata.toid}`
      );
      if (res.data.status === 200) {
        this.projectlist = res.data.docs;
      }
    },
    uploaderror() {
      this.$message.error("上传失败");
    },
    editposition(row) {
      this.docfrom.id = row.id;
      this.docfrom.paper_position = row.paper_position;
      this.paper_positionvs = true;
    },
    submitpp() {
      this.$refs.docfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入纸质文档位置信息");
        }
        if (this.levelthreedata.levelthreename === "其他文档") {
          this.edittypeurl = "otherdoc";
        } else if (this.levelthreedata.levelthreename === "合同文档") {
          this.edittypeurl = "comasy";
        } else {
          this.edittypeurl = "dreport";
        }
        const res = await this.$http.put(
          `${this.edittypeurl}/${this.docfrom.id}`,
          {
            paper_position: this.docfrom.paper_position
          }
        );
        if (res.data.status === 200) {
          this.paper_positionvs = false;
          this.loadingdata();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    deletedoc(id) {
      this.$confirm(`确定删除该文档吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (this.levelthreedata.levelthreename === "其他文档") {
            this.edittypeurl = "otherdoc";
            const res = await this.$http.delete(`${this.edittypeurl}/${id}`);
            if (res.data.status === 200) {
              this.loadingdata();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          } else if (this.levelthreedata.levelthreename === "合同文档") {
            this.edittypeurl = "dropfinalcompact";
            const res = await this.$http.delete(`${this.edittypeurl}/${id}`);
            if (res.data.status === 200) {
              this.loadingdata();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          } else {
            this.edittypeurl = "report";
            const res = await this.$http.delete(`${this.edittypeurl}/${id}`);
            if (res.data.status === 200) {
              this.loadingdata();
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          }
        })
        .catch(() => {});
    },
    paper_positionclose() {
      this.$refs.docfrom.resetFields();
      this.docfrom.paper_position = "";
    }
  },
  created() {
    this.loadingdata();
    this.token();
  }
};
</script>

<style>
.docbtn {
  margin-right: 10px;
}
.mydoc-top {
  height: 44px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
}
.mytask-content-table5 {
  height: 800px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.breac {
  margin: 0 0 0 40px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  height: 44px;
  position: relative;
}
.docupbtn {
  position: absolute;
  right: 50px;
  top: 8px;
}
.wenjian {
  font-size: 22px;
  margin: 0 12px 0 2px;
  color: #409eff;
}
/* .docclick1 {
  cursor: pointer;
} */
.docclick1:hover {
  color: #409eff;
}
.docword {
  font-size: 20px;
  margin: 0 12px 0 4px;
  color: #409eff;
}
.docexcel {
  font-size: 20px;
  margin: 0 12px 0 4px;
  color: #67c23a;
}
.docppt {
  font-size: 26px;
  margin: 0 10px 0 0px;
  color: #d04626;
}
.docpdf {
  font-size: 26px;
  margin: 0 10px 0 0;
  color: #d04626;
}
.doctxt {
  font-size: 26px;
  margin: 0 10px 0 0;
  color: #909399;
}
</style>

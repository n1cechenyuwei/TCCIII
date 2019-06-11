<template>
  <div
    v-loading="up_disabled"
    element-loading-text="文件上传中，请稍等"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(256, 256, 256, 0.8)">
    <div class="mydoc-top">
      <div class="push-box">
        <div class="breacpush" v-for="(item, index) in pushbreac" :key="index">
          <span class="pushtitle" @click="pushclick(item.id, index)">{{item.name}} </span>
          <i class="mianbaoicon el-icon-arrow-right"></i>&nbsp;
        </div>
      </div>
      <div class="nopushtitle">{{nopushbreac.name}}</div>
      <el-button class="ggdoc-btn1" type="success" size="mini" @click="folderfromvs = true">新建文件夹</el-button>
      <el-upload
        name="file"
        :headers="httpheader"
        :action="$store.state.baseurl + 'uploadcommondocs'"
        :show-file-list="false"
        :http-request="uploador"
        :on-error="uploaderror"
        :data="{ pid: docid }"
        :multiple="false">
        <el-button class="ggdoc-btn2" size="mini" type="primary" @click="uploador">上传文件</el-button>
      </el-upload>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table4">
        <el-table
          v-loading="loading"
          :data="projectlist"
          class="mytask-content-table-one4"
          stripe
          max-height="800"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
            <template slot-scope="scope">
              <i v-show="scope.row.type === 'F'" class="iconfont wenjianjia icon-tubiaozhizuomoban"></i>
              <i v-show="scope.row.type === 'D' && scope.row.file_ext !== 'xlsx' && scope.row.file_ext !== 'doc' && scope.row.file_ext !== 'docx' && scope.row.file_ext !== 'pptx' && scope.row.file_ext !== 'pdf' && scope.row.file_ext !== 'txt' && scope.row.file_ext !== 'mpg' && scope.row.file_ext !== 'mp4' && scope.row.file_ext !== 'rmvb' && scope.row.file_ext !== 'mpeg'" class="el-icon-document wenjian"></i>
              <i v-show="scope.row.file_ext === 'xlsx'" class="iconfont icon-excel docexcel"></i>
              <i v-show="scope.row.file_ext === 'doc' || scope.row.file_ext === 'docx'" class="iconfont icon-excel docword"></i>
              <i v-show="scope.row.file_ext === 'pptx'" class="iconfont icon-ppt1 docppt"></i>
              <i v-show="scope.row.file_ext === 'pdf'" class="iconfont icon-pdf docpdf"></i>
              <i v-show="scope.row.file_ext === 'txt'" class="iconfont icon-txt doctxt"></i>
              <i v-show="scope.row.type === 'D' && scope.row.file_ext === 'mp4' || scope.row.file_ext === 'rmvb' || scope.row.file_ext === 'mpeg' || scope.row.file_ext === 'mpg'" class="iconfont icon-video docvideo"></i>
              <span class="docclick" @click="pushF(scope.row)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="paper_position"
            label="纸质文档存放位置"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-show="scope.row.type === 'F'">——</span>
              <span v-show="scope.row.type === 'D'">{{scope.row.paper_position}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="操作">
            <template slot-scope="scope">
              <div style="text-align: right">
                <a v-show="scope.row.type === 'D'" :href="scope.row.down_url" :download="scope.row.down_url" class="docbtn">
                  <el-button size="mini" type="primary" icon="el-icon-download"></el-button>
                </a>
                <el-button v-show="scope.row.type === 'D'" size="mini" @click="editposition(scope.row)" type="primary" icon="el-icon-edit"></el-button>
                <el-button style="margin-right: 10px" size="mini" @click="deletedoc(scope.row.id)" type="danger" icon="el-icon-delete"></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="新建文件夹"
      @close="closefolderfrom"
      :visible.sync="folderfromvs"
      width="576px">
      <el-form :model="folderfrom" ref="folderfrom" label-width="180px" class="demo-dynamic" label-position="right">
        <el-form-item
          prop="name"
          label="文件夹名"
          :rules="[
            { required: true, message: '请输入文件夹名称', trigger: 'blur' },
            { max: 20, message: '最多 20 个字符', trigger: 'blur' }
          ]">
          <el-input style="width: 300px" size="small" v-model="folderfrom.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="deca-btn">
        <el-button plain size="small" @click="folderfromvs = false">取 消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="submifolderfrom">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="修改纸质文档存放位置"
      :visible.sync="paper_positionvs2"
      @close="paper_positionclose"
      width="576px">
      <el-form :model="docfrom2" ref="docfrom2" label-width="180px" class="demo-dynamic" label-position="right">
        <el-form-item
          prop="paper_position"
          label="纸质文档存放位置"
          :rules="[
            { max: 25, message: '最多 25 个字符', trigger: 'blur' }
          ]">
          <el-input style="width: 300px" size="small" v-model="docfrom2.paper_position"></el-input>
        </el-form-item>
      </el-form>
      <div class="deca-btn">
        <el-button plain size="small" @click="paper_positionvs2 = false">取 消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="submitpp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      folderfromvs: false,
      paper_positionvs2: false,
      loading: false,
      projectlist: [],
      allbreac: [
        {
          id: 0,
          name: "公共文档"
        }
      ], // 全部面包屑
      pushbreac: [], // 可点击面包屑
      nopushbreac: "", // 不可点击面包屑
      folderfrom: {
        name: ""
      },
      docid: 0, // 文档id
      docfrom2: {
        id: "",
        paper_position: ""
      },
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
          formData.append("file", _file);
          formData.append("pid", this.docid);
          const res2 = await this.$http.post("uploadcommondocs", formData);
          if (res2.data.status === 200) {
            this.up_disabled = false;
            this.$message.success("上传成功");
            this.getdocdata();
          } else {
            this.up_disabled = false;
            this.$message.error(res2.data.msg);
          }
        }
      }
    },
    uploaderror() {
      this.$message.error("上传失败");
    },
    // 计算面包屑可点击和不可点击
    breacfunc() {
      this.nopushbreac = this.allbreac[this.allbreac.length - 1];
      this.pushbreac = this.allbreac.slice(0, this.allbreac.length - 1);
    },
    // 面包屑的跳转减少
    pushclick(id, index) {
      this.docid = id;
      this.allbreac = this.allbreac.slice(0, index + 1);
      this.breacfunc();
      this.getdocdata();
    },
    // 点击文件夹名进行加载下面的文件
    pushF(row) {
      if (row.type === "D") {
        return false;
      } else {
        this.docid = row.id;
        const newbreac = {};
        newbreac.id = row.id;
        newbreac.name = row.name;
        this.allbreac.push(newbreac);
        this.breacfunc();
        this.getdocdata();
      }
    },
    closefolderfrom() {
      this.$refs.folderfrom.resetFields();
    },
    // 提交创建文件夹
    submifolderfrom() {
      this.$refs.folderfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入文件夹名称");
        }
        const res = await this.$http.post(
          `folders/${this.docid}`,
          this.folderfrom
        );
        if (res.data.status === 200) {
          this.$message.success(res.data.msg);
          this.folderfromvs = false;
          this.getdocdata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 页面初始化需要做的
    getloading() {
      this.breacfunc();
      this.getdocdata();
    },
    // 获取文档数据
    async getdocdata() {
      this.loading = true;
      const res = await this.$http.get(`folders/${this.docid}`);
      if (res.data.status === 200) {
        this.projectlist = res.data.docs;
        this.loading = false;
      }
    },
    paper_positionclose() {
      this.$refs.docfrom2.resetFields();
      this.docfrom2.paper_position = "";
    },
    // 修改文档位置按钮
    editposition(row) {
      this.docfrom2.id = row.id;
      this.docfrom2.paper_position = row.paper_position;
      this.paper_positionvs2 = true;
    },
    submitpp() {
      this.$refs.docfrom2.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确输入纸质文档位置信息");
        }
        const res = await this.$http.put(`commondocs/${this.docfrom2.id}`, {
          paper_position: this.docfrom2.paper_position
        });
        if (res.data.status === 200) {
          this.paper_positionvs2 = false;
          this.getdocdata();
          this.$message.success(res.data.msg);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除文件及文件夹
    deletedoc(id) {
      this.$confirm(`确定删除该文档吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`commondocs/${id}`);
          if (res.data.status === 200) {
            this.getdocdata();
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    }
  },
  created() {
    this.getloading();
    this.token();
  }
};
</script>

<style>
.mydoc-top {
  height: 44px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
}
.mytask-content-table4 {
  height: 800px;
}
.mytask-content-table-one4 {
  font-size: 16px;
}
.push-box {
  display: inline-block;
  margin-left: 40px;
}
.nopushtitle {
  display: inline-block;
  line-height: 44px;
  height: 44px;
  font-size: 14px;
  color: #606266;
}
.breacpush {
  line-height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  display: inline-block;
  height: 44px;
}
.pushtitle {
  cursor: pointer;
}
.pushtitle:hover {
  color: #409eff;
}
.ggdoc-btn1 {
  position: absolute;
  top: 8px;
  right: 140px;
}
.ggdoc-btn2 {
  position: absolute;
  top: 8px;
  right: 40px;
}
.wenjianjia {
  font-size: 28px;
  color: #ffd659;
  position: relative;
  top: 4px;
  margin: 0 10px 0 0;
}
.wenjian {
  font-size: 22px;
  margin: 0 12px 0 2px;
  color: #409eff;
}
.docclick {
  cursor: pointer;
}
.docclick:hover {
  color: #409eff;
}
.mianbaoicon {
  font-size: 14px;
  color: #c0c4cc;
}
.docbtn {
  margin-right: 10px;
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
.docvideo {
  font-size: 20px;
  margin: 0 12px 0 4px;
  color: #088fff;
}
</style>

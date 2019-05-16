<template>
  <div ref="appendchild">
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
        :action="$store.state.baseurl + 'uploadtrainingdoc'"
        :show-file-list="false"
        :on-success="uploadsuccess"
        :on-error="uploaderror"
        :data="{ pid: docid }"
        :multiple="false">
        <el-button class="ggdoc-btn2" size="mini" type="primary">上传文件</el-button>
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
            prop="filename"
            label="名称">
            <template slot-scope="scope">
              <i v-show="scope.row.doc_type === 'F'" class="iconfont wenjianjia icon-tubiaozhizuomoban"></i>
              <i v-show="scope.row.doc_type === 'D' && scope.row.file_ext !== 'xlsx' && scope.row.file_ext !== 'doc' && scope.row.file_ext !== 'docx' && scope.row.file_ext !== 'pptx' && scope.row.file_ext !== 'pdf' && scope.row.file_ext !== 'txt' && scope.row.file_ext !== 'mp4' && scope.row.file_ext !== 'webm' && scope.row.file_ext !== 'ogg'" class="el-icon-document wenjian"></i>
              <i v-show="scope.row.file_ext === 'xlsx'" class="iconfont icon-excel docexcel"></i>
              <i v-show="scope.row.file_ext === 'doc' || scope.row.file_ext === 'docx'" class="iconfont icon-excel docword"></i>
              <i v-show="scope.row.file_ext === 'pptx'" class="iconfont icon-ppt1 docppt"></i>
              <i v-show="scope.row.file_ext === 'pdf'" class="iconfont icon-pdf docpdf"></i>
              <i v-show="scope.row.file_ext === 'txt'" class="iconfont icon-txt doctxt"></i>
              <i v-show="scope.row.doc_type === 'D' && scope.row.file_ext === 'mp4' || scope.row.file_ext === 'ogg' || scope.row.file_ext === 'webm'" class="iconfont icon-video docvideo"></i>
              <span class="docclick" @click="pushF(scope.row)">{{scope.row.filename}}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="操作">
            <template slot-scope="scope">
              <div style="text-align: right">
                <el-button style="margin-right: 10px" v-show="scope.row.file_ext === 'mp4' || scope.row.file_ext === 'ogg' || scope.row.file_ext === 'webm' || scope.row.file_ext === 'pdf'" size="mini" type="primary" icon="el-icon-view" @click="videoorpdf(scope.row.down_url)"></el-button>
                <a v-show="scope.row.doc_type === 'D' && scope.row.file_ext !== 'mp4' && scope.row.file_ext !== 'ogg' && scope.row.file_ext !== 'webm' && scope.row.file_ext !== 'pdf'" :href="scope.row.down_url" download class="docbtn">
                  <el-button size="mini" type="primary" icon="el-icon-download"></el-button>
                </a>
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
            { max: 66, message: '最多 66 个字符', trigger: 'blur' }
          ]">
          <el-input style="width: 300px" size="small" v-model="folderfrom.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="deca-btn">
        <el-button plain size="small" @click="folderfromvs = false">取 消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="submifolderfrom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      folderfromvs: false,
      loading: false,
      projectlist: [],
      allbreac: [
        {
          id: 0,
          name: "模拟培训"
        }
      ], // 全部面包屑
      pushbreac: [], // 可点击面包屑
      nopushbreac: "", // 不可点击面包屑
      folderfrom: {
        name: ""
      },
      docid: 0 // 文档id
    };
  },
  methods: {
    // 上传成功
    uploadsuccess() {
      this.$message.success("上传成功");
      this.getdocdata();
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
      if (row.doc_type === "D") {
        return false;
      } else {
        this.docid = row.id;
        const newbreac = {};
        newbreac.id = row.id;
        newbreac.name = row.filename;
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
          `trainfolders/${this.docid}`,
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
    // 播放视频或者打开新页面查看pdf文件
    videoorpdf(url) {
      window.open(url, "_blank");
    },
    // 页面初始化需要做的
    getloading() {
      this.breacfunc();
      this.getdocdata();
    },
    // 获取文档数据
    async getdocdata() {
      this.loading = true;
      const res = await this.$http.get(`trainfolders/${this.docid}`);
      if (res.data.status === 200) {
        this.projectlist = res.data.folder;
        this.loading = false;
      }
    },
    // 删除文件及文件夹
    deletedoc(id) {
      this.$confirm(`确定删除该文档吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`folder/${id}`);
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

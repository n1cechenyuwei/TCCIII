<template>
  <div>
    <div class="mytask-content-top">
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入受检单位名称"
          @keyup.enter.native="reportssearch"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini" @click="reportssearch">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="eqpislist"
          class="mytask-content-table-one"
          stripe
          max-height="720"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-card v-for="(item, index) in scope.row.projectinfo" :key="index" class="inspeccard" shadow="hover">
                <div slot="header">
                  <span>项目名称：<span class="projectpush" @click="push(item)">{{item.proname}}</span></span>
                </div>
                <div class="text item">
                  <span>项目进度：{{item.sechedule}}%</span>
                </div>
              </el-card>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            width="120"
            show-overflow-tooltip
            label="账号名">
          </el-table-column>
          <el-table-column
            prop="company"
            show-overflow-tooltip
            label="单位名称">
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            label="单位地址">
          </el-table-column>
           <el-table-column
            prop="legalperson"
            width="120"
            show-overflow-tooltip
            label="法人">
          </el-table-column>
          <el-table-column
            prop="linkman"
            width="120"
            show-overflow-tooltip
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="legalpersonphone"
            width="150"
            show-overflow-tooltip
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="email"
            width="180"
            show-overflow-tooltip
            label="电子邮箱">
          </el-table-column>
          <el-table-column
            width="100"
            show-overflow-tooltip
            label="通过率">
            <template slot-scope="scope">
              <span>{{scope.row.pass_rate}}%</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            width="120"
            align="center"
            label="营业执照">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-view" @click="showimg(scope.row.license_url)"></el-button>
            </template>
          </el-table-column> -->
          <el-table-column
            width="180"
            label="信用等级">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.star"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="handeleditinfo(scope.row)"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-refresh" @click="handleRefresh(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="taskpage"
        :current-page.sync="currentPage"
        @current-change="handleprojectChange"
        :page-size="taskpagesize"
        layout="total, prev, pager, next, jumper"
        :total="eqpistotal">
      </el-pagination>
    </div>
    <el-dialog
      title="营业执照"
      @closed="insimgclose"
      :visible.sync="imgshow"
      width="944px">
      <img width="100%" :src="imgpath" alt="照片丢失了">
    </el-dialog>
    <el-dialog
      title="修改信息"
      class="detail"
      :visible.sync="dialogVisible2"
      @close="filepic = []"
      width="944px">
      <el-form ref="detailform" :model="detailform" :rules="detailformrules" class="demo-form-inline" :inline="true">
        <el-form-item prop="company_name">
          <div class="details-title">单位名称</div>
          <el-input v-model.trim="detailform.company_name" placeholder="单位名称" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="company_address">
          <div class="details-title">单位地址</div>
          <el-input v-model.trim="detailform.company_address" placeholder="单位地址" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="linkman">
          <div class="details-title">联系人</div>
          <el-input v-model.trim="detailform.linkman" placeholder="联系人" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="linkphone">
          <div class="details-title">联系电话</div>
          <el-input v-model.trim="detailform.linkphone" placeholder="联系电话" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <div class="details-title">电子邮箱</div>
          <el-input v-model.trim="detailform.email" placeholder="电子邮箱" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="identifynumber">
          <div class="details-title">统一社会信用代码</div>
          <el-input v-model.trim="detailform.identifynumber" placeholder="纳税人识别号" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="legalperson">
          <div class="details-title">法定代表人</div>
          <el-input v-model.trim="detailform.legalperson" placeholder="法定代表人" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item prop="legalpersonphone">
          <div class="details-title">法人联系电话</div>
          <el-input v-model.trim="detailform.legalpersonphone" placeholder="法人联系电话" spellcheck ="false"></el-input>
        </el-form-item>
      </el-form>
      <div class="details-yyzz2">营业执照</div>
      <el-upload
        name="license"
        :headers="headers"
        :file-list="filepic"
        :action="$store.state.baseurl + 'outeruserlicense/' + userid"
        accept=".png, .jpg, .JPG, .PNG, .jpeg, .JPEG"
        list-type="picture-card"
        :before-remove="beforeRemove"
        :on-success="success"
        :limit="1"
        :on-exceed="handleExceed"
        class="details-yyzz2"
        :on-preview="handlePictureCardPreview">
        <i class="el-icon-plus"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleuserinfo">确 定</el-button>
      </span>
      <!-- <div class="te-btn">
        <el-button size="small" plain type="warning" @click="dialogVisible = false">取消</el-button>
        <el-button @click="handleuserinfo" class="btn-queding" size="small" type="primary" plain>保 存</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    let validphone = (rule, value, callback) => {
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的11位手机号"));
      } else {
        callback();
      }
    };
    let validid = (rule, value, callback) => {
      const reg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确的统一社会信用代码"));
      } else {
        callback();
      }
    };
    return {
      imgshow: false,
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      eqpistotal: 0,
      eqpislist: [],
      myprojectsearch: "",
      userid: "",
      imgpath: "",
      dialogVisible: false,
      dialogVisible2: false,
      dialogImageUrl: "",
      detailform: {
        company_address: "",
        company_name: "",
        linkman: "",
        linkphone: "",
        email: "",
        identifynumber: "",
        legalperson: "",
        legalpersonphone: ""
      },
      detailformrules: {
        company_name: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
          { max: 20, message: "单位名称最长20个字符", trigger: "blur" }
        ],
        company_address: [
          { required: true, message: "请输入单位地址", trigger: "blur" },
          { max: 33, message: "单位地址最长33个字符", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          { max: 10, message: "联系人名称最长10个字符", trigger: "blur" }
        ],
        linkphone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: validphone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        identifynumber: [
          { required: true, message: "请输入纳税人识别号", trigger: "blur" },
          { validator: validid, trigger: "blur" }
        ],
        legalperson: [
          { required: true, message: "请输入法定代表人", trigger: "blur" },
          { max: 10, message: "法定代表人名称最长10个字符", trigger: "blur" }
        ],
        legalpersonphone: [
          { required: true, message: "请输入法人联系电话", trigger: "blur" },
          { validator: validphone, trigger: "blur" }
        ]
      },
      headers: {
        token: ""
      },
      filepic: [],
      bigpic: "" // 图片
    };
  },
  methods: {
    handleprojectChange(val) {
      this.getinspec(val);
    },
    // 获取受检单位信息
    async getinspec(page) {
      const res = await this.$http.post(`outercompanies/${page}`, {
        search: this.myprojectsearch
      });
      if (res.data.status === 200) {
        this.eqpistotal = res.data.total_num;
        this.eqpislist = res.data.companyinfo;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    showimg(path) {
      this.imgpath = path;
      this.imgshow = true;
    },
    insimgclose() {
      this.imgpath = "";
    },
    // 项目跳转
    push(row) {
      if (row.pro_iscomplete === 0) {
        this.$router.push({
          name: "project",
          params: {
            id: row.id,
            path: "/goingproject",
            name: "进行中项目"
          }
        });
      } else if (row.pro_iscomplete === 1) {
        this.$router.push({
          name: "project",
          params: {
            id: row.id,
            path: "/projected",
            name: "已完成项目"
          }
        });
      }
    },
    // 搜索按钮
    reportssearch() {
      if (this.myprojectsearch === "") {
        this.$message.warning("请输入内容");
      } else {
        this.currentPage = 1;
        this.getinspec(1);
      }
    },
    // 重置密码
    handleRefresh(id) {
      this.$confirm(
        "<div>确定重置该账号密码吗？重置后密码为 “<span style='color: red'>123456</span>” ！</div>",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true
        }
      )
        .then(async () => {
          const res = await this.$http.put(`resetouteruserpw/${id}`);
          if (res.data.status === 200) {
            this.$message.success("密码重置成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {});
    },
    // 点击修改信息按钮
    handeleditinfo(row) {
      this.dialogVisible2 = true;
      this.filepic = [];
      if (row.has_license === "yes") {
        let url = [{ url: "" }];
        url[0].url = row.license_url + "?" + date;
        this.bigpic = row.license_url + "?" + date;
        this.filepic = url;
      } else {
        this.filepic = [];
      }
      const date = new Date().getTime();
      this.userid = row.id;
      this.detailform.company_address = row.address;
      this.detailform.company_name = row.company;
      this.detailform.email = row.email;
      this.detailform.linkman = row.linkman;
      this.detailform.identifynumber = row.identifynumber;
      this.detailform.legalperson = row.legalperson;
      this.detailform.legalpersonphone = row.legalpersonphone;
      this.detailform.linkphone = row.phone;
    },
    // 保存个人信息
    handleuserinfo() {
      this.$refs.detailform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请正确填写个人信息");
        }
        const res = await this.$http.put(
          `outeruser/${this.userid}`,
          this.detailform
        );
        if (res.data.status === 200) {
          this.$message.success("信息更新成功");
          // this.xinxitwo();
          this.getinspec(this.currentPage);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 删除之前提示
    beforeRemove() {
      return new Promise((res, rej) => {
        this.$confirm("您确定要删除该文件吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            const resone = await this.$http.delete(
              `outeruserlicense/${this.userid}`
            );
            if (resone.data.status === 200) {
              this.$message.success("删除成功");
              this.getinspec(this.currentPage);
              this.filepic = [];
            } else {
              this.$message.error(resone.msg);
            }
          })
          .catch(() => {
            rej();
          });
      });
    },
    // 点击放大镜查看图片
    handlePictureCardPreview() {
      this.imgpath = this.bigpic;
      this.imgshow = true;
    },
    // 上传文件超出限制
    handleExceed() {
      this.$message.warning(`只允许上传一个文件，请删除后再进行上传`);
    },
    // 上传成功
    async success(response) {
      if (response.data.status === 200) {
        this.$message.success("图片上传成功");
        const date = new Date().getTime();
        this.bigpic = response.data.license_url + "?" + date;
      } else {
        this.$message.error(response.msg);
      }
    },
    async token() {
      this.headers.token = sessionStorage.getItem("token");
    }
  },
  created() {
    this.token();
    this.getinspec(this.currentPage);
  },
  watch: {
    myprojectsearch(val) {
      if (val === "") {
        this.getinspec(1);
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
.mytasksearch {
  width: 300px;
  margin-top: 11px;
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
}
.sreach-icon {
  position: absolute;
  top: 0px;
}
.mytask-dropdown {
  margin-left: 30px;
}
.mytask-content-middle {
  border-top: 1px solid #c6e7ff;
  margin-top: 10px;
  height: 100%;
}
.mytask-content-middle .page {
  margin-left: 30px;
}
.mytask-content-middle .colcell {
  cursor: Pointer;
}
.mytask-content-middle .colcell:hover {
  color: #409eff;
}
.mytask-content-table {
  height: 720px;
  min-width: 1670px;
}
.mytask-content-table-one {
  font-size: 16px;
}
.inspeccard {
  width: 500px;
  display: inline-block;
  margin: 0 10px 6px 0px;
}
.projectpush {
  cursor: pointer;
}
.projectpush:hover {
  color: #409eff;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.details-title {
  text-align: left;
  width: 400px;
  font-size: 16px;
  color: #303133;
}
.detail .el-form--inline .el-form-item {
  margin-right: 30px;
  margin-bottom: 10px;
  margin-left: 20px;
}
.details-yyzz2 {
  margin: 20px 0 0 20px;
}
</style>

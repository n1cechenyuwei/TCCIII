<template>
  <el-container class="sec">
    <el-header class="header">
      <el-row class="menu">
        <el-col :span="4">
          <div class="logo">
          </div>
        </el-col>
        <el-col :span="16">
          <el-menu 
          :router="true"
          mode="horizontal"
          :default-active="newroute"
          class="menuitem"
          @select="handleSelect"
          background-color="#004fa1"
          text-color="#fff"
          active-text-color="#fff">
            <el-menu-item index="/home" class="aaa">首页</el-menu-item>
            <el-menu-item index="/task" class="aaa">任务</el-menu-item>
            <el-menu-item index="/project" class="aaa">项目</el-menu-item>
            <el-submenu index="2" popper-class="more-menu">
              <template slot="title" >更多</template>
              <template>
                <el-row class="gengduo">
                  <el-col :span="6">
                    <p>检测流程</p>
                    <el-menu-item index="/contract" class="xuanxiang">合同管理</el-menu-item>
                    <el-menu-item index="/reports" class="xuanxiang">报告管理</el-menu-item>
                    <el-menu-item index="/equipment" class="xuanxiang">设备管理</el-menu-item>
                  </el-col>
                  <el-col :span="6">
                    <p>支持</p>
                    <el-menu-item index="2-1" class="xuanxiang">知识资源</el-menu-item>
                    <el-menu-item index="/cases" class="xuanxiang">检测用例</el-menu-item>
                  </el-col>
                  <el-col :span="6">
                    <p>辅助</p>
                    <el-menu-item index="document" class="xuanxiang">文档管理</el-menu-item>
                    <el-menu-item index="/company" class="xuanxiang">单位管理</el-menu-item>
                  </el-col>
                  <el-col :span="6">
                    <p>系统</p>
                    <el-menu-item index="/system" class="xuanxiang">系统管理</el-menu-item>
                  </el-col>
                </el-row>
              </template>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <div class="user-right">
            <el-dropdown @command="handleCommandUser" class="user-dropdown" placement="bottom-start">
              <span class="el-dropdown-link">
                <i class="iconfont icon-weixintupian_"></i>                
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="handlepassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="user-name">{{username}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="content">
      <router-view></router-view>
    </el-main>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      @close="closepass"
      :visible.sync="dialogrese"
      center
      width="576px">
      <el-form :model="passform"
      v-loading="passloading"
      element-loading-text="密码修改中"
      element-loading-spinner="el-icon-loading"
      :rules="passformrules"
      ref="passform" label-width="100px"
      class="demo-ruleForm passform">
        <el-form-item label="旧密码" prop="old_password">
          <el-input class="passinput" type="password" v-model.trim="passform.old_password" autocomplete="off" size="small" spellcheck="false" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input class="passinput" type="password" placeholder="请输入新密码" v-model.trim="passform.new_password" size="small" spellcheck ="false"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="new_password_two">
          <el-input class="passinput" type="password" placeholder="请再次输入新密码" v-model.trim="passform.new_password_two" size="small" spellcheck ="false"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlereseclose" size="small">取 消</el-button>
        <el-button type="primary" @click="handlerese" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设备出库弹窗 -->
    <el-dialog
      title="设备出库"
      @closed="eqoutclose"
      center
      :visible.sync="$store.state.outdialog"
      width="576px">
      <div class="dialogeq-open">
        <el-form label-width="130px" :model="$store.state.diaoutopen" ref="outfrom" :rules="outfromrules" label-suffix=":" size="small">
          <el-form-item label="设备名称">
            <span class="wwwwww">{{$store.state.diaoutopen.divicename}}</span>
          </el-form-item>
          <el-form-item label="设备类型">
            <span class="wwwwww">{{$store.state.diaoutopen.devicetype}}</span>
          </el-form-item>
          <el-form-item label="设备型号">
            <span class="wwwwww">{{$store.state.diaoutopen.model}}</span>
          </el-form-item>
          <el-form-item label="设备编号">
            <span class="wwwwww">{{$store.state.diaoutopen.id}}</span>
          </el-form-item>
          <el-form-item label="出厂序列号">
            <span class="wwwwww">{{$store.state.diaoutopen.serialnumber}}</span>
          </el-form-item>
          <el-form-item label="出库人" prop="outstorage_person">
            <el-input class="timeselect" v-model="$store.state.diaoutopen.outstorage_person" placeholder="请填写出库人"></el-input>
          </el-form-item>
          <el-form-item label="出库时间" prop="outstorage_time">
            <el-date-picker
              class="timeselect"
              v-model="$store.state.diaoutopen.outstorage_time"
              value-format="yyyy-MM-dd">
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备外观">
            <span class="wwwwww">{{$store.state.diaoutopen.appearance}}</span>
          </el-form-item>
          <el-form-item label="上电检查">
            <span class="wwwwww">{{$store.state.diaoutopen.power_on}}</span>
          </el-form-item>
          <el-form-item label="设备尺寸（cm）">
            <span class="wwwwww">{{$store.state.diaoutopen.de_size}}</span>
          </el-form-item>
          <el-form-item label="出库状态" prop="state">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaoutopen.state" placeholder="请选择">
              <el-option label="出库" value="出库"></el-option>
              <!-- <el-option label="入库" value="入库"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogeq-open-btn">
        <el-button plain type="success" size="small" @click="$store.commit('outstoragedialogclose')">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="outsubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 审批任务设备详情弹出框 -->
    <el-dialog
      title="设备详情"
      :visible.sync="$store.state.DialogEquipment"
      width="1344px"
      center>
      <el-table
        :data="$store.state.appeqlist"
        border
        height="480"
        style="width: 100%">
        <el-table-column
          prop="temdid"
          align="center"
          label="设备编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          show-overflow-tooltip
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="type"
          show-overflow-tooltip
          width="160"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="model"
          width="160"
          show-overflow-tooltip
          label="硬件型号">
        </el-table-column>
        <el-table-column
          prop="version"
          show-overflow-tooltip
          width="100"
          label="软件版本">
        </el-table-column>
        <el-table-column
          width="160"
          show-overflow-tooltip
          prop="serialnumber1"
          label="设备一出厂序列号">
        </el-table-column>
        <el-table-column
          width="160"
          show-overflow-tooltip
          prop="serialnumber2"
          label="设备二出厂序列号">
        </el-table-column>
        <el-table-column
          width="200"
          prop="manufacturers"
          show-overflow-tooltip
          label="生产厂家">
        </el-table-column>
        <el-table-column
          width="140"
          align="center"
          show-overflow-tooltip
          label="生产厂家营业执照">
          <template slot-scope="scope">
            <i class="iconfont icon-yingyezhizhao" @click="eqimg(scope.row.temdid)"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="50%"
        @close="yyzzimgclose"
        center
        title="生产厂家营业执照"
        :visible.sync="eqimgshow"
        append-to-body>
        <img id="eqimgloading" :src="eqimgdata" alt="图片丢失了" width="100%">
      </el-dialog>
    </el-dialog>
    <!-- 营业执照弹窗 -->
    <el-dialog
      :visible.sync="$store.state.opyyzz"
      @closed="$store.commit('closeyyzz')"
      center
      width="960px">
      <img width="100%" :src="$store.state.license" alt="照片丢失了">
    </el-dialog>
    <!-- 设备入库任务操作弹出框 -->
    <el-dialog
      class="dialogeq-open-box"
      title="设备详情"
      @closed="eqputclose"
      :visible.sync="$store.state.Dialogshebei"
      width="576px">
      <div class="dialogeq-open">
        <el-form label-width="130px" :model="$store.state.diaeqopen" ref="putfrom" :rules="putfromrules" label-suffix=":" size="small">
          <el-form-item label="设备名称">
            <span class="wwwwww">{{$store.state.diaeqopen.divicename}}</span>
          </el-form-item>
          <el-form-item label="设备类型">
            <span class="wwwwww">{{$store.state.diaeqopen.devicetype}}</span>
          </el-form-item>
          <el-form-item label="设备型号">
            <span class="wwwwww">{{$store.state.diaeqopen.model}}</span>
          </el-form-item>
          <el-form-item label="设备编号">
            <span class="wwwwww">{{$store.state.diaeqopen.id}}</span>
          </el-form-item>
          <el-form-item label="出厂序列号" prop="serialnumber">
            <el-input class="timeselect" v-model="$store.state.diaeqopen.serialnumber" placeholder="请填写出厂序列号"></el-input>
          </el-form-item>
          <el-form-item label="送检人" prop="deliverer">
            <el-input class="timeselect" v-model="$store.state.diaeqopen.deliverer" placeholder="请填写送检人"></el-input>
          </el-form-item>
          <el-form-item label="送检时间" prop="deliver_time">
            <el-date-picker
              class="timeselect"
              v-model="$store.state.diaeqopen.deliver_time"
              value-format="yyyy-MM-dd">
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="设备外观" prop="appearance">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaeqopen.appearance" placeholder="请选择">
              <el-option label="完好" value="完好"></el-option>
              <el-option label="破损" value="破损"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上电检查" prop="power_on">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaeqopen.power_on" placeholder="请选择">
              <el-option label="正常" value="正常"></el-option>
              <el-option label="异常" value="异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备尺寸（cm）" prop="de_size">
            <el-input class="timeselect" v-model="$store.state.diaeqopen.de_size" placeholder="请填写设备尺寸"></el-input>
          </el-form-item>
          <el-form-item label="入库状态" prop="state">
            <el-select class="dialog-open-select timeselect" v-model="$store.state.diaeqopen.state" placeholder="请选择">
              <el-option label="待入库" value="待入库"></el-option>
              <el-option label="入库" value="入库"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogeq-open-btn">
        <el-button plain type="success" size="small" @click="$store.commit('putstoragedialogclose')">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="putsubmit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 检测任务日志弹窗 -->
    <el-dialog
      title="报文详情"
      @closed="detectionclose"
      center
      :visible.sync="$store.state.caselogshow"
      width="960px">
      <div class="baowen">{{$store.state.log.data}}</div>
    </el-dialog>
    <!-- 检测任务照片弹窗 -->
    <el-dialog
      title="照片详情"
      @closed="detectionimgclose"
      :visible.sync="$store.state.caseimgshow"
      width="960px">
      <img width="100%" :src="$store.state.caseimage" alt="照片丢失了">
    </el-dialog>
    <!-- 检测任务视频弹窗 -->
    <el-dialog
      @close="detectionvideoclose"
      :visible.sync="$store.state.casevideoshow"
      width="960px">
      <video-player  class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="$store.state.playerOptions">
      </video-player>
    </el-dialog>
    <!-- 报告审核测试用例弹窗 -->
    <el-dialog
      title="用例详情"
      :visible.sync="$store.state.caselistshow"
      center
      width="576px">
      <el-tree
        :data="$store.state.caselist"
        show-checkbox
        ref="tree"
        node-key="id"
        v-loading="$store.state.caseloading"
        element-loading-text="测试用例加载中"
        accordion
        :props="{ label: 'name', children: 'case_list' }">
      </el-tree>
      <div class="deca-btn">
        <el-button plain type="success" size="small" @click="$store.state.caselistshow = false">取消</el-button>
        <el-button type="primary" size="small" class="dialogbtn-right" @click="handleCheckChange">生成报告</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    let validoldpassword = (rule, value, callback) => {
      if (value !== this.passform.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      data: "r",
      username: "",
      newroute: "/home",
      eqimgshow: false, //设备生产厂家照片显示
      eqimgdata: "", //生厂厂家照片
      putfromrules: {
        serialnumber: [
          { required: true, message: "请输入出厂序列号", trigger: "blur" },
          { max: 30, message: "序列号不超过 30 个字符", trigger: "blur" }
        ],
        deliverer: [
          { required: true, message: "请输入送检人", trigger: "blur" },
          { max: 10, message: "送检人名不超过 10 个字符", trigger: "blur" }
        ],
        deliver_time: [
          { required: true, message: "请选择送检时间", trigger: "blur" }
        ],
        appearance: [
          {
            required: true,
            message: "请选择设备外观",
            trigger: ["blur", "change"]
          }
        ],
        power_on: [
          {
            required: true,
            message: "请选择上电检查",
            trigger: ["blur", "change"]
          }
        ],
        de_size: [
          { required: true, message: "请选择设备尺寸", trigger: "blur" },
          { max: 16, message: "设备尺寸不超过 16 个字符", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择入库状态", trigger: "blur" }]
      },
      outfromrules: {
        outstorage_person: [
          { required: true, message: "请输入出库人", trigger: "blur" },
          { max: 10, message: "出库人名不超过 10 个字符", trigger: "blur" }
        ],
        outstorage_time: [
          { required: true, message: "请选择出库时间", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择出库状态", trigger: "blur" }]
      },
      dialogrese: false,
      passform: {
        old_password: "",
        new_password: "",
        new_password_two: ""
      },
      passformrules: {
        old_password: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        new_password_two: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validoldpassword, trigger: "blur" }
        ]
      },
      passloading: false
    };
  },
  created() {
    this.router();
  },
  methods: {
    router() {
      this.username = sessionStorage.getItem("username");
      this.newroute = this.$route.matched[1].path;
    },
    handleCommandUser(command) {
      if (command === "logout") {
        sessionStorage.clear();
        this.$router.push({ name: "login" });
        this.$message.success("退出成功");
      } else if (command === "handlepassword") {
        this.dialogrese = true;
      }
    },
    // 选中菜单关闭右侧滑块
    handleSelect() {
      this.$store.commit("taskhuakuaihidden");
    },
    // 设备出库dialog关闭
    eqoutclose() {
      this.$refs.outfrom.resetFields();
    },
    // 设备出库提交设备信息
    outsubmit() {
      this.$refs.outfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整填写设备信息");
        }
        this.$store.dispatch(
          "outstoragedialogsubmit",
          this.$store.state.diaoutopen.id
        );
      });
    },
    // 点击设备图标，查看图片
    async eqimg(id) {
      this.eqimgshow = true;
      const date = new Date().getTime();
      this.eqimgdata = `${
        this.$store.state.baseurl
      }showdevicelicense/${id}?${date}`;
    },
    // dialog关闭设备营业图片消失
    yyzzimgclose() {
      this.eqimgdata = "";
    },
    // 设备入库提交设备信息
    putsubmit() {
      this.$refs.putfrom.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整填写设备信息");
        }
        this.$store.dispatch(
          "putstoragedialogsubmit",
          this.$store.state.diaeqopen.id
        );
      });
    },
    // 设备入库dialog关闭
    eqputclose() {
      this.$refs.putfrom.resetFields();
    },
    // 日志弹窗关闭
    detectionclose() {
      this.$store.state.log = "";
    },
    // 检测用例照片弹窗关闭
    detectionimgclose() {
      this.$store.state.caseimage = "";
    },
    // 检测用例视频弹窗关闭
    detectionvideoclose() {
      this.$refs.videoPlayer.player.pause();
    },
    // 报告审核选择用例
    async handleCheckChange() {
      const checkedKeys = this.$refs.tree.getCheckedKeys();
      if (checkedKeys.length === 0) {
        this.$message.error("请选择用例");
      } else {
        let newArr = checkedKeys.filter(item => item != undefined);
        const res = await this.$http.post(
          `generatereport/${this.$store.state.devid}`,
          { caseid_list: newArr }
        );
        if (res.status === 200) {
          this.$message.success("报告生成成功");
          this.$store.state.caselistshow = false;
          this.$store.dispatch("draft_report", this.$store.state.devid);
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    closepass() {
      this.$refs.passform.resetFields();
    },
    handlereseclose() {
      this.dialogrese = false;
    },
    handlerese() {
      this.$refs.passform.validate(async valid => {
        if (!valid) {
          return this.$message.error("请填写完整信息");
        }
        this.passloading = true;
        const res = await this.$http.put("changepassword", this.passform);
        if (res.status === 200) {
          this.$message.success("密码修改成功");
          this.dialogrese = false;
          this.passloading = false;
          this.$refs.passform.resetFields();
          sessionStorage.clear();
          this.$router.push({ name: "login" });
        } else {
          this.passloading = false;
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style>
.sec {
  height: 100%;
}
.header {
  padding: 0;
}
.menu {
  height: 60px;
  background-color: #004fa1;
  box-shadow: 0px 0px 4px 3px #507cce !important;
}
.logo {
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  background: url(../assets/LOGO.png) no-repeat;
  background-position: 10px 14px;
}
.menuitem {
  min-width: 500px;
}
.aaa {
  font-size: 20px !important;
  margin-right: 40px !important;
}
.gengduo {
  width: 424px;
  height: 150px;
  color: #666666;
  background-color: #fff;
}
.header .gengduo p {
  font-size: 16px;
  line-height: 16px;
  margin: 18px 0px 6px 18px;
  height: 18px;
}
.xuanxiang {
  font-size: 15px !important;
  margin-left: 20px;
  border-right: 1px solid #f6f6f6;
}
.xuanxiang:hover {
  color: #409eff !important;
}
.content {
  padding: 10px 0px 0px 0;
  height: 100%;
}
.icon-weixintupian_ {
  font-size: 24px;
  color: #fff;
  position: relative;
  top: 3px;
  cursor: pointer;
}
.user-name {
  position: relative;
  margin-left: 5px;
}
.user-dropdown {
  height: 24px;
  line-height: 24px;
}
.user-right {
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  margin-left: 50px;
}
.deca-btn {
  text-align: center;
  padding-top: 10px;
}
.baowen {
  height: 400px;
  overflow: auto;
}
.passinput {
  width: 300px !important;
}
</style>

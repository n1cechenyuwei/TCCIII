<template>
  <div class="login-wrap">
    <div>
      <h2 class="login-title">检验测试管理系统</h2>
      <div>
        <el-form
          class="login-form"
          label-position="top"
          label-width="80px"
          :rules="formDatarules"
          ref="loginFormData"
          :model="formData">
          <el-form-item prop="username">
            <el-input v-model.trim="formData.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input @keyup.enter.native="handleLogin" placeholder="密码" type="password" v-model.trim="formData.password"></el-input>
          </el-form-item>
          <el-button @click="handleLogin" class="login-button" type="primary" :loading="loginout">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 绑定表单数据
      formData: {
        username: "",
        password: ""
      },
      formDatarules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
          // {
          //   type: "number",
          //   message: "用户名必须为数字"
          // }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }, //新增历史验证规则
      treeOne: [],
      treeTwo: "",
      newroute: "",
      loginout: false
    };
  },
  methods: {
    // 点击按钮，登录
    async handleLogin() {
      this.$refs.loginFormData.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入用户名和密码");
        }
        this.loginout = true;
        const res = await this.$http.post("login", this.formData);
        if (res.data.status === 200) {
          this.loginout = false;
          this.$message.success(res.data.msg);
          const token = res.data.token;
          const username = res.data.username;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("username", username);
          this.treeOne = [];
          this.treeTwo = "";
          const res1 = await this.$http.get("getpermistree");
          if (res1.data.permis_list) {
            if (res1.data.permis_list.length !== 0) {
              res1.data.permis_list.forEach(element => {
                if (element.name === "更多") {
                  this.treeTwo = element;
                } else {
                  this.treeOne.push(element);
                }
              });
              if (this.treeOne.length !== 0) {
                this.newroute = this.treeOne[0].route;
                this.$router.push({ path: this.newroute });
              } else if (this.treeOne.length === 0 || this.treeTwo !== "") {
                this.newroute = this.treeTwo.children[0].children[0].route;
                this.$router.push({ path: this.newroute });
              }
            } else {
              this.$message.error("该账号没有任何权限，请联系管理员添加权限");
            }
          } else {
            this.$message.error(res1.data.msg);
          }
        } else {
          this.loginout = false;
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style>
.login-wrap {
  background: url(../assets/background.png) no-repeat;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  width: 350px;
  margin: 0 auto;
}

.login-button {
  width: 100%;
}
.login-title {
  font-size: 48px;
  color: #fff;
}
</style>

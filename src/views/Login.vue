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
            <el-input v-model.trim.number="formData.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input @keyup.enter.native="handleLogin" placeholder="密码" type="password" v-model.trim="formData.password"></el-input>
          </el-form-item>
          <el-button @click="handleLogin" class="login-button" type="primary">登录</el-button>
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
          },
          {
            type: "number",
            message: "用户名必须为数字"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      } //新增历史验证规则
    };
  },
  methods: {
    // 点击按钮，登录
    async handleLogin() {
      this.$refs.loginFormData.validate(async valid => {
        if (!valid) {
          return this.$message.error("请完整输入用户名和密码");
        }
        const res = await this.$http.post("login", this.formData);
        if (res.status === 200) {
          this.$message.success(res.msg);
          const token = res.token;
          const username = res.username;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("username", username);
          this.$router.push({ name: "navigation" });
        } else {
          this.$message.error(res.msg);
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

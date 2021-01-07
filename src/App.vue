<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(243, 238, 231)"
      text-color="rgb(198, 53, 69)"
      active-text-color="rgb(198, 53, 69)"
    >
      <el-menu-item
        index="1"
        style="font-weight: 700; font-family: monospace; font-size: 30px"
        >御魂推荐器</el-menu-item
      >
      <el-menu-item
        v-if="gameShot.name"
        index="1"
        style="
          font-weight: 700;
          font-family: monospace;
          font-size: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
        "
        >{{ gameShot.name || "" }}</el-menu-item
      >
      <el-menu-item
        v-if="!user"
        index="2"
        style="float: right"
        @click="login = true"
        >注册/登录</el-menu-item
      >
      <el-menu-item
        v-if="user"
        index="3"
        style="float: right; font-wight: 900px"
        >{{ user.username }}</el-menu-item
      >
      <el-menu-item
        v-if="user"
        index="2"
        style="float: right"
        @click="changePass = true"
        >修改密码</el-menu-item
      >
    </el-menu>
    <el-dialog :visible.sync="login">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="用户登陆" name="login">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
            <el-form-item label="用户名" label-width="100px" prop="username">
              <el-input
                v-model="loginForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="100px" prop="password">
              <el-input
                v-model="loginForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="submitForm('loginForm')"
              >确 定</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="用户注册" name="registry">
          <el-form
            :model="registryForm"
            :rules="registryRules"
            ref="registryForm"
          >
            <el-form-item label="用户名" label-width="100px" prop="username">
              <el-input
                v-model="registryForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="100px" prop="password">
              <el-input
                v-model="registryForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="100px" prop="password2">
              <el-input
                v-model="registryForm.password2"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="submitForm('registryForm')"
              >确 定</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="changePass">
      <el-form
        :model="changePassForm"
        :rules="changePassRules"
        ref="changePassForm"
      >
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input
            readonly
            :value="user.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="password">
          <el-input
            v-model="changePassForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px" prop="password2">
          <el-input
            v-model="changePassForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="submitForm('changePassForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registryForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass22 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePassForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "1",
      activeName: "login",
      changePass: false,
      login: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registryForm: {
        username: "",
        password: "",
        password2: "",
      },
      registryRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
      changePassForm: {
        password: "",
        password2: "",
      },
      changePassRules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ validator: validatePass22, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapState(["user", "gameShot"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return false;
      });
      if (formName == "loginForm") {
        let params = {
          username: this.loginForm.username,
          password: this.loginForm.password,
        };
        this.$axios
          .get("http://localhost:8080/user/login", {
            params,
          })
          .then((res) => {
            if (!res.data) return this.$message.error("用户名或密码错误");
            this.$message.success("登陆成功");
            this.login = false;
            this.setUser(params);
            if (this.$route.path != "/import") {
              this.$router.push("/import");
            }
          });
      } else if (formName == "registryForm") {
        let params = {
          username: this.registryForm.username,
          password: this.registryForm.password,
        };
        this.$axios
          .get("http://localhost:8080/user/registry", {
            params,
          })
          .then((res) => {
            if (!res.data) return this.$message.error("用户名已存在");
            this.$message.success("注册成功");
            this.login = false;
            this.setUser(params);
            if (this.$route.path != "/import") {
              this.$router.push("/import");
            }
          });
      } else {
        let params = {
          username: this.user.username,
          password: this.user.password,
          newPass: this.changePassForm.password,
        };
        this.$axios
          .get("http://localhost:8080/user/changePass", {
            params,
          })
          .then((res) => {
            if (!res.data) return this.$message.error("修改失败");
            this.$message.success("修改成功");
            this.changePass = false;
            this.setUser({ ...user, password: this.changePassForm.password });
          });
      }
    },
    handleSelect() {
      console.log("xxxx");
    },
  },
  created() {
    window.addEventListener("beforeunload", () => {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("gameShot");
      if (!username) return;
      sessionStorage.removeItem("username");

      return this.$axios.get(
        `http://localhost:8080/common/deleteTemp/${username}`
      );
    });
  },
  destroyed() {},
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

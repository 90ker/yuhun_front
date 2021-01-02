<template>
  <div>
    <el-upload
      v-loading="loading"
      class="upload-demo"
      drag
      :show-file-list="false"
      :on-progress="startUpload"
      :action="`http://localhost:8080/common/uploadFile/${username}/${Math.floor((Math.random()*4+10))}`"
      :on-success="uploadSuccess"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        点击此处选择文件导入，或将 .json 文件拖到此处
      </div>
    </el-upload>
    <el-row>
      <el-col :span="6" v-for="(item, index) in gameShots" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-button type="danger" icon="el-icon-delete" circle ></el-button>
          <img
            :src="`../assets/png/hero/${item.pic}.png`"
            class="image"
          />
          <div style="padding: 14px">
            <div class="bottom clearfix">
              <time class="time">{{ item.name }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="sass" scoped>
</style>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      loading: false,
      gameShots: "",
    };
  },
  computed: {
    ...mapState(["user"]),
    username() {
      return (
        this.user.username ||
        new Date().getTime() + "" + Math.random().toFixed(2) * 100
      );
    },
  },
  created() {
    if (this.user) {
      sessionStorage.removeItem("username");
    }
    sessionStorage.removeItem("gameShot");
  },
  updated() {
    if (this.user) {
      if (!this.gameShots) {
        this.$axios
          .get(`http://localhost:8080/gameshot/${this.user.username}`)
          .then((res) => (this.gameShots = res.data));
      }
    }
  },
  methods: {
    startUpload(e, file, fileList) {
      this.loading = true;
      sessionStorage.setItem("gameShot", file.name);
    },
    uploadSuccess(response) {
      setTimeout(() => {
        this.loading = false;
        if(response=="已存在")  {
          this.$message.error("已存在")
          sessionStorage.removeItem("gameShot")
        }
        this.$router.push("/home");
        sessionStorage.setItem("username", this.username);
      }, 1000);
    },
  },
};
</script>
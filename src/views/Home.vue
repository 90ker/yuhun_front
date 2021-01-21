<template>
  <div style="position: relative">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#e6e6e6"
    >
      <el-menu-item index="1" @click="go('/home/caculator')">计算</el-menu-item>
      <el-menu-item index="2" @click="go('/home/collection')"
        >收藏</el-menu-item
      >
      <el-menu-item index="3" @click="go('/home/heroData')"
        >式神数据</el-menu-item
      >
      <el-menu-item index="4" @click="go('/home/yuhunData')"
        >御魂数据</el-menu-item
      >
    </el-menu>
    <el-card class="chat-room">
      <div slot="header" class="title">
        <span>在线聊天区</span>
      </div>
      <div class="content">
        <template v-for="(item, index) in chatList">
          <div
            class="msg-block"
            style="justify-content: flex-start"
            v-if="item.username != username"
            :key="index"
          >
            <el-avatar
              :size="30"
              icon="el-icon-user-solid"
              style="display: inline-block"
            ></el-avatar>
            <div class="msg" style="background-color: #eee">{{item.msg}}</div>
          </div>
          <div
            class="msg-block"
            style="justify-content: flex-end"
            v-else
            :key="index"
          >
            <div class="msg" style="background-color: lightgreen">{{item.msg}}</div>
            <el-avatar
              :size="30"
              icon="el-icon-user-solid"
              style="display: inline-block"
            ></el-avatar>
          </div>
        </template>
      </div>
      <el-row :gutter="5">
        <el-col :span="20"
          ><el-input placeholder="聊起来" v-model="chatInput" clearable>
          </el-input
        ></el-col>
        <el-col :span="4">
          <el-button icon="el-icon-message" circle @click="sendChat"></el-button
        ></el-col>
      </el-row>
    </el-card>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      activeIndex: "1",
      chatInput: "",
      socket: null,
      chatList: [],
    };
  },
  computed: {
    ...mapState(["user"]),
    username(){
      console.log(this.user)
      return this.user.username || sessionStorage.getItem("username")
    }
  },
  created() {
    this.initChatRoom();
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    initChatRoom() {
      if (this.socket) return;
      this.socket = new WebSocket(
        `ws://localhost:8080/websocket/${this.username}`
      );
      this.socket.onmessage =  (result) =>{
        let msg = JSON.parse(result.data);
        if (Array.isArray(msg)) {
          this.chatList = msg;
        } else {
          this.chatList.push(msg);
        }
      };
    },
    sendChat() {
      this.socket.send(this.chatInput);
      this.chatInput = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-room {
  width: 270px;
  height: 400px;
  position: absolute;
  right: 20px;
  top: 90px;
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .content {
    height: 270px;
    overflow-y: scroll;
  }
  .msg-block {
    width: 100%;
    height: 30px;
    display: flex;
    margin: 5px 0;
    .msg {
      display: inline-block;
      vertical-align: top;
      border-radius: 5px;
      line-height: 30px;
      font-size: 12px;
      padding: 0 10px;
    }
  }
}
</style>


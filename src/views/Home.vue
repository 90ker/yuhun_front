<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#e6e6e6"
    >
      <el-menu-item index="1" @click="go('/home/caculator')">计算</el-menu-item>
      <el-menu-item index="2" @click="go('/home/collection')"
        >收藏</el-menu-item
      >
      <el-menu-item index="3" @click="go('/home/heroData')">式神数据</el-menu-item>
      <el-menu-item index="4" @click="go('/home/yuhunData')">御魂数据</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    handleSelect() {
      console.log("2");
    },
  },
};
</script>

<style>
</style>
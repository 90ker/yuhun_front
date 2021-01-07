<template>
  <div>
    <el-button
      size="mini"
      style="text-align: left"
      v-for="(item, index) in target"
      :key="index"
      >{{ item.target }}</el-button
    >
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
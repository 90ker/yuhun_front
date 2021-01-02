<template>
  <div>
    <el-table :data="soulData" style="width: 100%">
      <el-table-column prop="name" label="御魂类型" width="180"></el-table-column>
      <el-table-column prop="name" label="主属性" width="180"></el-table-column>
      <el-table-column prop="name" label="等级" width="180"></el-table-column>
      <el-table-column prop="name" label="位置" width="180"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import soulData from "../assets/EQUIP_SUIT_DATA.json";
export default {
  data() {
    return {
      soulData,

    };
  },
  methods:{
      
  }
};
</script>
<style lang="sass" scoped>
</style>
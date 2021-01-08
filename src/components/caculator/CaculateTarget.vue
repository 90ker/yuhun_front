<template>
   <el-radio-group v-model="target">
      <el-radio-button size="mini"
      style="text-align: left"
      v-for="(item, index) in targets"
      :label="item.value"
      :key="index"
      >{{ item.target }}</el-radio-button>
    </el-radio-group>
</template>

<script>
import { targets } from "../../assets/view_json/caculator";
export default {
  data() {
    return {
      targets,
      target:''
    };
  },
  methods: {},
};
</script>

<style>
</style>
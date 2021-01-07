<template>
  <el-card>
    <el-row>
      <el-col :span="12" v-for="(item, index) in limitAttrList" :key="index">
        <el-row>
          <el-col :span="6">{{ item.name }}</el-col>
          <el-col :span="9"
            ><el-input-number
              :min="0"
              :max="100000"
              v-model="item.max"
              controls-position="right"
            ></el-input-number
          ></el-col>
          <el-col :span="9"
            ><el-input-number
              :min="0"
              :max="100000"
              v-model="item.min"
              controls-position="right"
            ></el-input-number
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { limitAttrList } from "../../assets/view_json/caculator";
export default {
  data() {
    return {
      limitAttrList,
    };
  },
  methods: {},
};
</script>

<style>
</style>
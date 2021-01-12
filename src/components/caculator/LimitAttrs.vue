<template>
  <el-card>
    <el-row>
      <el-col :span="12" v-for="(item, index) in limitAttrList" :key="index">
        <el-row>
          <el-col :span="6">{{ item.name }}</el-col>
          <el-col :span="9"
            ><el-input-number
              :min="item.min"
              :max="100000"
              :value="item.max"
              @input="setMax($event,index)"
              controls-position="right"
            ></el-input-number
          ></el-col>
          <el-col :span="9"
            ><el-input-number
              :min="item.min"
              :max="item.max"
              :value="item.min"
              @input="setMin($event,index)"
              controls-position="right"
            ></el-input-number
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["limitAttrList"]),
  },
  methods: {
    setMax(e,index){
       this.limitAttrList[index].max = e
       this.$store.commit('setLimitAttrList',this.limitAttrList)
    },
    setMin(e,index){
      this.limitAttrList[index].min = e
      this.$store.commit('setLimitAttrList',this.limitAttrList)
    }
  },
};
</script>

<style>
</style>
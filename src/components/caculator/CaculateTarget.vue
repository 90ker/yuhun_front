<template>
  <el-radio-group v-model="target">
    <el-radio-button
      size="mini"
      style="text-align: left"
      v-for="(item, index) in targets"
      :label="item.value"
      :key="index"
      >{{ item.target }}</el-radio-button
    >
  </el-radio-group>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { targets } from "../../assets/view_json/caculator";
export default {
  data() {
    return {
      targets,
    };
  },
  computed: {
    target: {
      get() {
        return this.$store.state.target;
      },
      set(val) {
        this.setTarget(val);
      },
    },
  },
  methods: {
    ...mapMutations(["setTarget"]),
  },
};
</script>

<style>
</style>
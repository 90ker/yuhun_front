<template>
  <div>
    <el-form
      :model="formInline"
      size="small"
      style="width: 800px; margin: 0 auto 100px"
    >
      <el-form-item label="御魂范围" >
        <YuhunRange  />
      </el-form-item>
      <el-form-item label="目标式神">
        <TagetHero  />
      </el-form-item>
      <el-form-item label="限制属性" v-show="heroId">
        <LimitAttrs />
      </el-form-item>
      <!-- <el-form-item label="位置指定">
        <PosSelect />
      </el-form-item> -->
      <!-- <el-form-item label="计算指标">
        <CaculateTarget />
      </el-form-item> -->
    </el-form>

    <div
      style="
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: 10px;
        background-color: white;
        z-index: 100;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
      "
    >
      <el-button size="middle" type="primary" style="text-align: left"
        >极速计算</el-button
      >
    </div>
  </div>
</template>
<script>

import {
  rarityOptions,
  heroStarOptions,
  limitAttrList,

  yuhunSite,
  target,
} from "../assets/view_json/caculator";
import YuhunRange from "../components/caculator/YuhunRange";
import TagetHero from "../components/caculator/TargetHero";
import LimitAttrs from "../components/caculator/LimitAttrs";
import PosSelect from "../components/caculator/PosSelect";
import CaculateTarget from "../components/caculator/CaculateTarget";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    YuhunRange,
    TagetHero,
    LimitAttrs,
    PosSelect,
    CaculateTarget,
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      
      limitAttrList,
      yuhunSite,
      target,
    };
  },
  filters: {
    roundPer(val) {
      let newVal = Math.round(val * 100);
      if (newVal) {
        return "+" + newVal + "%";
      } else {
        return "";
      }
    },
    round(val) {
      let newVal = Math.round(val);
      if (newVal) {
        return "+" + newVal;
      } else {
        return "";
      }
    },
  },
  computed: {
    ...mapState(["gameShot", "user","heroId"]),
  },
  methods: {
    
   
    yuhunSelect(idx) {
      this.getYuhunPage();
    },
    onSubmit() {
      console.log("submit!");
    },
    
    getYuhunPage(idx) {
      this.$axios
        .post(
          `http://localhost:8080/yuhun/page/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`,
          {
            pos: idx,
          }
        )
        .then((res) => (this.yuhunList = res.data));
    },
  },
};
</script>
<style lang="sass" scoped>
.popover-contetn
  border-top: 1px solid rgb(201, 201, 201)
  padding-right: 0px
  display: flex
  flex-direction: column
</style>

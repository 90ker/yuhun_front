<template>
  <div>
    <el-form size="small" style="width: 800px; margin: 0 auto 100px">
      <el-form-item label="御魂范围">
        <YuhunRange />
      </el-form-item>
      <el-form-item label="目标式神">
        <TagetHero />
      </el-form-item>
      <el-form-item label="限制属性" v-show="hid">
        <LimitAttrs />
      </el-form-item>
      <el-form-item label="位置指定">
        <PosSelect />
      </el-form-item>
      <el-form-item label="计算指标">
        <CaculateTarget />
      </el-form-item>
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
      <el-button
        size="middle"
        type="primary"
        style="text-align: left"
        @click="startCaculate"
        >极速计算</el-button
      >
    </div>
  </div>
</template>
<script>
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
      socket: "",
    };
  },
  computed: {
    ...mapState([
      "gameShot",
      "user",
      "hid",
      "limitAttrList",
      "yuhunSite",
      "includeList",
      "target"
    ]),
  },
  methods: {
    startCaculate() {
      if (!this.socket) {
        this.socket = new WebSocket("ws://localhost:8080/caculate/a");
      }
      // 实例化socket
      // 监听socket消息
      this.socket.onmessage = (msg) => {
        console.log(msg.data);
      };

      let condition = this.includeList.filter((item) => item.include);
      let attrsLimit =  this.limitAttrList
      let targetObj = { sitesAddition: this.yuhunSite.map(item=>item.selects), target: this.target };
      console.log(condition)
      this.socket.onopen = () => {
        this.socket.send(JSON.stringify({ condition, targetObj, attrsLimit }));
      };
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

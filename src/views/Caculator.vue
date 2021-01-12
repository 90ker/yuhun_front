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

    <el-dialog title="结果" :visible.sync="showResult" width="80%">
      <el-table
        :data="top"
        border
        fix
        stripe
        size="midium"
        empty-text="请耐心等待。。。"
      >
        <el-table-column property="damage" label="伤害"></el-table-column>
        <el-table-column property="attack" label="攻击"></el-table-column>
        <el-table-column property="critRate" label="暴击率"></el-table-column>
        <el-table-column property="critPower" label="爆伤"></el-table-column>
        <el-table-column property="speed" label="速度"></el-table-column>
        <el-table-column property="defense" label="防御"></el-table-column>
        <el-table-column property="hp" label="生命"></el-table-column>
        <el-table-column
          property="effectHitRate"
          label="效果命中"
        ></el-table-column>
        <el-table-column
          property="effectResistRate"
          label="效果抵抗"
        ></el-table-column>
      </el-table>
    </el-dialog>
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
      top: [],
      showResult: false,
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
      "target",
      "hid",
    ]),
  },
  created() {
    window.addEventListener("beforeunload", () => {
      this.socket.close();
    });
  },
  methods: {
    startCaculate() {
      this.showResult = true;
      if (!this.socket) {
        this.socket = new WebSocket(
          `ws://localhost:8080/caculate/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`
        );
      }
      // 实例化socket
      // 监听socket消息
      this.socket.onmessage = (msg) => {
        let top = JSON.parse(msg.data).top;
        if (top && top.length > 0) {
          this.top =  top.map((item) => {
            for (let i in item) {
               if (i.includes("crit") || i.includes("Rate")) {
                item[i] =  Math.round(item[i] * 100);
              } else {
                item[i] = Math.round(item[i]);
              }
            }
            return item
          });
        }
      };

      let condition = this.includeList.filter((item) => item.include);
      let sitesAddition = this.yuhunSite.map((item) => ({
        selects: item.selects,
        pos: item.pos,
      }));
      let attrsLimit = this.limitAttrList;
      let target = this.target;
      let hid = this.hid;
      this.socket.onopen = () => {
        this.socket.send(
          JSON.stringify({ condition, sitesAddition, attrsLimit, target, hid })
        );
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

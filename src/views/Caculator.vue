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
        :data="result"
        border
        fix
        stripe
        size="midium"
        empty-text="请耐心等待..."
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <template v-for="(item, index) in scope.row.entity">
              <div
                style="
                  display: inline-block;
                  width: 140px;
                  height: 70px;
                  position: relative;
                  margin: 0 10px;
                  font-size: 12px;
                "
                :key="index"
              >
                <el-badge
                  :value="'+' + item.myLevel"
                  class="item"
                  :type="item.myLevel == 15 ? 'warning' : 'primary'"
                >
                  <el-image
                    style="width: 70px; height: 70px"
                    :src="require('../assets/yuhun_border.png')"
                    fit="cover"
                    :style="degree(item.pos)"
                  ></el-image>
                </el-badge>
                <el-image
                  style="
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    z-index: 10;
                  "
                  :src="`http://localhost:8080/png/yuhun/${item.suitId}.png`"
                  fit="cover"
                />
                <div
                  style="
                    display: inline-block;
                    padding: 10px;
                    box-shadow: 0 0 3px 1px #ccc;
                  "
                >
                  <div
                    class="attrs"
                    style="color: #fff; background-color: #000"
                    v-for="(it, index, c) in item.baseAttr"
                    :key="c"
                  >
                    <span>{{ index | toCN }}</span>
                    <span>{{ it | round(index) }}</span>
                  </div>
                  <div
                    class="attrs"
                    v-for="(it, index) in item.attrs"
                    :key="index"
                  >
                    <span>{{ index | toCN }}</span>
                    <span>{{ it | round(index) }}</span>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="伤害">
          <template slot-scope="scope">
            {{ scope.row.attrs.Damage }}
          </template>
        </el-table-column>
        <el-table-column label="攻击">
          <template slot-scope="scope">
            {{ scope.row.attrs.Attack }}
          </template>
        </el-table-column>
        <el-table-column label="暴击率">
          <template slot-scope="scope">
            {{ scope.row.attrs.CritRate }}
          </template>
        </el-table-column>
        <el-table-column label="爆伤">
          <template slot-scope="scope">
            {{ scope.row.attrs.CritPower }}
          </template>
        </el-table-column>
        <el-table-column label="速度">
          <template slot-scope="scope">
            {{ scope.row.attrs.Speed }}
          </template>
        </el-table-column>
        <el-table-column label="防御">
          <template slot-scope="scope">
            {{ scope.row.attrs.Defense }}
          </template>
        </el-table-column>
        <el-table-column label="生命"
          ><template slot-scope="scope">
            {{ scope.row.attrs.Hp }}
          </template></el-table-column
        >
        <el-table-column label="效果命中"
          ><template slot-scope="scope">
            {{ scope.row.attrs.EffectHitRate }}
          </template></el-table-column
        >
        <el-table-column label="效果抵抗"
          ><template slot-scope="scope">
            {{ scope.row.attrs.EffectResistRate }}
          </template></el-table-column
        >
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="collect(scope.row)" type="text" size="small"
              >收藏</el-button
            >
          </template>
        </el-table-column>
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
      result: [],
      showResult: false,
      interval: null,
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
    degree(val) {
      return {
        transform: "rotate(" + val * -56 + "deg)",
      };
    },

    onmessage(msg) {
      let result = JSON.parse(msg.data).result;
      if (result && result.length > 0) {
        this.result = result.map((item) => {
          for (let i in item.attrs) {
            if (i.includes("Crit") || i.includes("Rate")) {
              item.attrs[i] = Math.round(item.attrs[i] * 100);
            } else {
              item.attrs[i] = Math.round(item.attrs[i]);
            }
          }
          return item;
        });
      }
    },
    onopen() {
      let condition = this.includeList.filter((item) => item.include);
      let sitesAddition = this.yuhunSite.map((item) => ({
        selects: item.selects,
        pos: item.pos,
      }));
      let attrsLimit = this.limitAttrList;
      let target = this.target;
      let hid = this.hid;
      this.socket.send(
        JSON.stringify({ condition, sitesAddition, attrsLimit, target, hid })
      );

      this.interval = setInterval(() => {
        this.socket.send('getResult');
      }, 2000);
    },
    startCaculate() {
      this.showResult = true;
      if (!this.socket) {
        this.socket = new WebSocket(
          `ws://localhost:8080/caculate/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`
        );
      }
      this.socket.onmessage = this.onmessage;
      this.socket.onopen = this.onopen;
    },
  },
};
</script>
<style lang="scss" scoped>
.popover-contetn {
  border: 1px solid rgb(201, 201, 201);
  padding-right: 0px;
  display: flex;
  flex-direction: column;
}

.attrs {
  display: flex;
  justify-content: space-between;
}
</style>

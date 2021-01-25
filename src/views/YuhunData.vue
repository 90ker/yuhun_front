<template>
  <div>
    <el-form inline>
      <el-form-item label="御魂类型">
        <el-select v-model="suitId" style="width: 100px" @change="handleSelect">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="御魂等级">
        <el-select v-model="level" style="width: 100px" @change="handleSelect">
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="御魂星级">
        <el-select
          v-model="quality"
          style="width: 100px"
          @change="handleSelect"
        >
          <el-option
            v-for="item in qualityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置" v-if="!outPos">
        <el-select v-model="pos" style="width: 100px" @change="handleSelect">
          <el-option
            v-for="item in posOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="yuhunList"
      style="width: 1121px; margin: 0 auto"
      :row-style="{ height: '40px' }"
      border
      v-loading="loading"
      stripe
      mini
    >
      <el-table-column
        label="#"
        width="120"
        style="position: relative; height: 80px"
      >
        <template slot-scope="scope">
          <el-badge
            :value="'+' + scope.row.myLevel"
            class="item"
            :type="scope.row.myLevel == 15 ? 'warning' : 'primary'"
          >
            <el-image
              style="width: 40px; height: 40px"
              :src="require('../assets/yuhun_border.png')"
              fit="cover"
              :style="degree(scope.row.pos)"
            ></el-image>
          </el-badge>
          <el-image
            style="
              width: 30px;
              height: 30px;
              position: absolute;
              left: 15px;
              top: 25px;
              z-index: 10;
            "
            :src="`http://localhost:8080/png/yuhun/${scope.row.suitId}.png`"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="御魂类型" width="120">
        <template slot-scope="scope">
          <span style="color: red; margin-right: 5px">{{
            yuhunKV[scope.row.suitId]
          }}</span>
          <el-tag size="mini" type="danger" v-if="scope.row.quality == 5"
            >五星</el-tag
          >
          <el-tag size="mini" type="warning" v-if="scope.row.quality == 6"
            >六星</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="主属性" width="90">
        <template slot-scope="scope"> {{ scope.row.baseAttr | toCN }}</template>
      </el-table-column>
      <el-table-column label="攻击加成" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["AttackRate"] | roundPer
          }}</span
          >{{ scope.row.attrs.AttackRate | roundPer }}</template
        >
      </el-table-column>
      <el-table-column label="暴击伤害" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["CritPower"] | roundPer
          }}</span
          >{{ scope.row.attrs.CritPower | roundPer }}</template
        >
      </el-table-column>
      <el-table-column label="暴击率" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["CritRate"] | roundPer
          }}</span
          >{{ scope.row.attrs.CritRate | roundPer }}</template
        >
      </el-table-column>
      <el-table-column label="速度" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["Speed"] | round
          }}</span
          >{{ scope.row.attrs.Speed | round }}</template
        >
      </el-table-column>
      <el-table-column label="效果命中" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["EffectHitRate"] | roundPer
          }}</span
          >{{ scope.row.attrs.EffectHitRate | roundPer }}</template
        >
      </el-table-column>
      <el-table-column label="效果抵抗" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["EffectResistRate"] | roundPer
          }}</span
          >{{ scope.row.attrs.EffectResistRate | roundPer }}</template
        >
      </el-table-column>
      <el-table-column label="攻击力" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["Attack"] | round
          }}</span
          >{{ scope.row.attrs.Attack | round }}</template
        >
      </el-table-column>
      <el-table-column label="生命值" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{ scope.row.baseAttr["Hp"] | round }}</span
          >{{ scope.row.attrs.Hp | round }}</template
        >
      </el-table-column>
      <el-table-column label="防御力" width="90">
        <template slot-scope="scope">
          <span style="color: red">{{
            scope.row.baseAttr["Defense"] | round
          }}</span
          >{{ scope.row.attrs.Defense | round }}</template
        >
      </el-table-column>
      <el-table-column label="" fixed="right" width="90" v-if="outPos">
        <template slot-scope="scope">
          <el-button @click="check(scope.row,pos)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-size="size"
      layout="total, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import yuhunData from "../assets/EQUIP_SUIT_DATA.json";
export default {
  props: ["outPos"],
  data() {
    return {
      yuhunList: [],
      yuhunKV: {},
      loading: false,
      total: 0,
      current: 1,
      size: 10,
      quality: 0,
      level: 0,
      pos: this.outPos ? this.outPos : 6,
      suitId: 0,
      typeOptions: [
        {
          label: "全部",
          value: 0,
        },
      ],
      qualityOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "四星",
          value: 4,
        },
        {
          label: "五星",
          value: 5,
        },
        {
          label: "六星",
          value: 6,
        },
      ],
      levelOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "满级",
          value: 15,
        },
      ],
      posOptions: [
        {
          label: "全部",
          value: 6,
        },
        {
          label: "一号位",
          value: 0,
        },
        {
          label: "二号位",
          value: 1,
        },
        {
          label: "三号位",
          value: 2,
        },
        {
          label: "四号位",
          value: 3,
        },
        {
          label: "五号位",
          value: 4,
        },
        {
          label: "六号位",
          value: 5,
        },
      ],
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
    toCN(val) {
      let type = Object.keys(val)[0];
      switch (type) {
        case "Speed":
          return "速度";
        case "Hp":
          return "生命值";
        case "HpRate":
          return "生命加成";
        case "Attack":
          return "攻击力";
        case "AttackRate":
          return "攻击加成";
        case "CritRate":
          return "暴击率";
        case "CritPower":
          return "暴击加成";
        case "Defense":
          return "防御力";
        case "EffectResistRate":
          return "效果抵抗";
        case "EffectHitRate":
          return "效果命中";
      }
    },
  },
  methods: {
    check(item,pos) {
      this.$emit("select-success", item,pos);
    },
    degree(val) {
      return {
        transform: "rotate(" + val * -56 + "deg)",
      };
    },
    handleSelect() {
      this.current = 1;
      this.getAll().then(() => {
        this.getPage();
      });
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getAll().then(() => {
        this.getPage();
      });
    },
    getAll() {
      return this.$axios
        .post(
          `/yuhun/num/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`,
          {
            quality: this.quality,
            level: this.level,
            pos: this.pos,
            suitId: this.suitId,
          }
        )
        .then((res) => (this.total = res.data));
    },
    getPage() {
      this.loading = true;
      this.$axios
        .post(
          `/yuhun/page/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`,
          {
            quality: this.quality,
            level: this.level,
            pos: this.pos,
            suitId: this.suitId,
            current: this.current,
            size: this.size,
          }
        )
        .then((res) => (this.yuhunList = res.data))
        .then(() => (this.loading = false));
    },
  },
  created() {
    console.log(this.pos)
    yuhunData.map((item) => {
      this.yuhunKV[item.id] = item.name;
      let obj = {
        label: item.name,
        value: parseInt(item.id),
      };
      this.typeOptions.push(obj);
    });
    this.getAll().then(() => {
      this.getPage();
    });
  },
  computed: {
    ...mapState(["gameShot", "user"]),
  },
};
</script>
<style lang="sass" scoped>
.item
  margin-top: 10px
  margin-right: 10px
</style>
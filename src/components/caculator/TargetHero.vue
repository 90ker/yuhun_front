<template>
  <div>
    <el-select v-model="rarity" style="width: 100px" @change="changeSelect">
      <el-option
        v-for="item in rarityOptions"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="heroStar" style="width: 100px" @change="changeSelect">
      <el-option
        v-for="item in heroStarOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="heroId" style="width: 100px" @change="heroSelect">
      <el-option
        v-for="item in heroList"
        :key="item.heroId"
        :label="heroKV[item.heroId]"
        :value="item.heroId"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import heroData from "../../assets/HERO_DATA.json";
import {
  rarityOptions,
  heroStarOptions,
} from "../../assets/view_json/caculator";
export default {
  data() {
    return {
      rarityOptions,
      heroStarOptions,
      rarity: "SSR",
      heroStar: 6,
      heroList: [],
      heroKV: {},
      heroId: "",
    };
  },
  computed: {
    ...mapState(["gameShot", "user", "limitAttrList"]),
  },
  created() {
    heroData.map((item) => {
      this.heroKV[item.id] = item.name;
    });
    this.getHeroPage();
  },
  methods: {
    ...mapMutations(["setHid", "setLimitAttrList"]),
    getHeroPage() {
      this.$axios
        .post(
          `http://localhost:8080/hero/page/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`,
          {
            rarity: this.rarity,
            star: this.heroStar,
          }
        )
        .then((res) => (this.heroList = res.data));
    },
    heroSelect() {
      let hero = this.heroList.filter((item) => item.heroId == this.heroId)[0];
      hero.attrsList.map((attr) =>
        this.setLimitAttrList(
          this.limitAttrList.map((item) => {
            let type = item.type;
            if (type == attr.name) {
              if (type.includes("crit") || type.includes("Rate")) {
                item.min = Math.round(attr.value * 100);
                item.max = item.min + 500
              } else {
                item.min = Math.round(attr.value);
                item.max = item.min + 40000
              }
            }
            return item;
          })
        )
      );
      this.$store.commit('setHid',hero.id)
    },
    changeSelect() {
      this.$store.commit('setHid','')
      this.heroId = ''
      this.getHeroPage();
    },
  },
};
</script>

<style>
</style>
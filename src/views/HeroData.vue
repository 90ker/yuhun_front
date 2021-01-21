<template>
  <div>
    <el-form inline>
      <el-form-item label="式神稀有度">
        <el-select v-model="rarity" style="width: 100px" @change="handleSelect">
          <el-option
            v-for="item in rarityOptions"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="式神星级">
        <el-select v-model="star" style="width: 100px" @change="handleSelect">
          <el-option
            v-for="item in starOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      :data="heroList"
      style="width: 481px; margin: 0 auto"
      v-loading="loading"
      border
      stripe
    >
      <el-table-column prop="heroId" label="#" width="80">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="`http://localhost:8080/png/hero/${scope.row.heroId}.png`"
            fit="cover"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div></el-image
          >
        </template>
      </el-table-column>
      <el-table-column label="式神名称" width="100">
        <template slot-scope="scope">
          {{ heroKV[scope.row.heroId] }}
        </template>
      </el-table-column>
      <el-table-column label="稀有度" width="80">
        <template slot-scope="scope"
          ><el-image
            :src="`http://localhost:8080/png/rarity/${scope.row.rarity}.png`"
          ></el-image
        ></template>
      </el-table-column>
      <el-table-column prop="star" label="星级" width="60"> </el-table-column>
      <el-table-column label="属性" width="80">
        <template slot-scope="scope">
          <el-popover placement="left" width="200" trigger="click">
            <el-card>
              <div
                class="attrs"
                v-for="(item, index) in scope.row.attrsList"
                :key="index"
              >
                <span>{{ item.name | toCN }}</span>
                <span>{{ item.value }} <span>+{{}}</span></span>
              </div>
            </el-card>
            <el-button slot="reference" size="mini">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="御魂方案" width="80">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="200"
            trigger="click"
            v-if="scope.row.equips"
          >
            <el-button slot="reference" size="mini">查看</el-button>
          </el-popover>
          <el-button v-else type="danger" disabled size="mini"> 暂无</el-button>
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
import heroData from "../assets/HERO_DATA.json";
export default {
  data() {
    return {
      heroKV: {},
      rarityOptions: [
        {
          value: "全部",
        },
        {
          value: "SP",
        },
        {
          value: "SSR",
        },
        {
          value: "SR",
        },
        {
          value: "R",
        },
        {
          value: "N",
        },
      ],
      rarity: "全部",
      starOptions: [
        {
          label: "全部",
          value: 0,
        },
        {
          label: "二星",
          value: 2,
        },
        {
          label: "三星",
          value: 3,
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
      star: 0,
      heroList: [],
      loading: false,
      total: 0,
      current: 1,
      size: 10,
    };
  },
  methods: {
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
          `http://localhost:8080/hero/num/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`,
          {
            rarity: this.rarity,
            star: this.star,
          }
        )
        .then((res) => (this.total = res.data));
    },
    getPage() {
      this.loading = true;
      this.$axios
        .post(
          `http://localhost:8080/hero/page/${
            this.user.username || sessionStorage.getItem("username")
          }/${this.gameShot.name}`,
          {
            current: this.current,
            size: this.size,
            rarity: this.rarity,
            star: this.star,
          }
        )
        .then((res) => (this.heroList = res.data))
        .then(() => (this.loading = false));
    },
  },
  created() {
    heroData.map((item) => {
      this.heroKV[item.id] = item.name;
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
.attrs
  display: flex
  justify-content: space-between
</style>
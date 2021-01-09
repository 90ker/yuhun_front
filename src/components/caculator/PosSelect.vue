<template>
  <el-card>
    <el-button-group>
      <el-tooltip
        class="item"
        effect="dark"
        content="点击快捷设置"
        placement="right"
      >
        <el-row>
          <el-col :span="24">
            <el-button
              type="success"
              size="mini"
              style="text-align: left"
              v-for="(item, index) in quickSetOptions"
              :key="index"
              @click="quickSet(item.value)"
              >{{ item.name }}</el-button
            >
          </el-col>
        </el-row>
      </el-tooltip>
    </el-button-group>
    <el-form-item
      :label="site.site"
      v-for="(site, index) in yuhunSite"
      :key="index"
    >
      <el-row>
        <el-col :span="6"
          ><el-button
            size="mini"
            style="text-align: left; margin-right: 20px"
            @click="selectAll(site, index)"
            >全选</el-button
          ></el-col
        >
        <el-col :span="16">
          <el-checkbox-group
            size="mini"
            :value="site.selects"
            @change="setSelect($event, index)"
            v-model="site.selects"
          >
            <el-checkbox-button
              style="text-align: left"
              v-for="(item, idx) in site.obj"
              :key="idx"
              :label="item.value"
              >{{ item.name }}</el-checkbox-button
            >
          </el-checkbox-group></el-col
        >
      </el-row>
    </el-form-item>
  </el-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      quickSetOptions: [
        { name: "攻攻爆", value: [1, 1, 4, 5] },
        { name: "速攻爆", value: [4, 1, 4, 5] },
        { name: "生生爆", value: [2, 2, 4, 5] },
        { name: "生生生", value: [2, 2, 2] },
        { name: "速命生", value: [4, 4, 2] },
        { name: "速抗生", value: [4, 5, 2] },
      ],
    };
  },
  computed: {
    ...mapState(["yuhunSite"]),
  },
  methods: {
    ...mapMutations(["setYuhunSite"]),
    quickSet(val) {
      let [a, b, ...c] = val;
      this.yuhunSite.map((item) => (item.selects = []));
      this.yuhunSite[0].selects = [a];
      this.yuhunSite[1].selects = [b];
      this.yuhunSite[2].selects = [...c];
      this.setYuhunSite(this.yuhunSite);
    },
    selectAll(site, index) {
      if (site.obj.every((item) => site.selects.includes(item.value))) {
        site.selects = [];
      } else {
        site.selects = [];
        site.obj.forEach((item) => {
          site.selects.push(item.value);
          return site;
        });
      }
      this.yuhunSite[index] = site;
      this.setYuhunSite(this.yuhunSite);
    },
    setSelect(e, index) {
      this.yuhunSite[index].selects = e;
      this.setYuhunSite(this.yuhunSite);
    },
  },
};
</script>

<style>
</style>
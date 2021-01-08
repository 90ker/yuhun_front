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
            <el-button type="success" size="mini" style="text-align: left"
              >攻攻爆</el-button
            >
            <el-button type="success" size="mini" style="text-align: left"
              >速攻爆</el-button
            >
            <el-button type="success" size="mini" style="text-align: left"
              >生生爆</el-button
            >
            <el-button type="success" size="mini" style="text-align: left"
              >生生生</el-button
            >
            <el-button type="success" size="mini" style="text-align: left"
              >速命生</el-button
            >
            <el-button type="success" size="mini" style="text-align: left"
              >速抗生</el-button
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
            @click="selectAll(site,index)"
            >全选</el-button
          ></el-col
        >
        <el-col :span="16">
          <el-checkbox-group size="mini" :value="site.selects" @change="setSelect($event,index)" v-model="site.selects">
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
import {  mapState } from 'vuex';

export default {
  data() {
    return { };
  },
  computed:{
    ...mapState(['yuhunSite'])
  },
  methods: {
    selectAll(site,index) {
      if (site.obj.every((item) => site.selects.includes(item.value))) {
        site.selects = [];
      } else {
        site.selects = [];
        site.obj.forEach((item) => {
          site.selects.push(item.value);
          return site;
        });
      }
      this.yuhunSite[index] = site
      this.$store.commit('setYuhunSite',this.yuhunSite)
    },
    setSelect(e,index){
      this.yuhunSite[index].selects = e 
      this.$store.commit('setYuhunSite',this.yuhunSite)
    }
  },
};
</script>

<style>
</style>
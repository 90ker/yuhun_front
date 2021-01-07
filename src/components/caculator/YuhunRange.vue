<template>
  <div>
    <template v-for="(item, index) in tags">
      <el-tag :key="index" v-if="item.name">{{ item.name }}</el-tag>
    </template>

    <el-button v-popover:popover>自定义</el-button
    ><el-popover
      ref="popover"
      placement="bottom"
      title="定义参与计算的御魂范围"
      width="650"
      trigger="click"
    >
      <div class="popover-content">
        <el-form>
          <el-form-item label="位置排除">
            <el-checkbox-group
              v-model="excludeList"
              :max="5"
              @change="changeExclude"
            >
              <el-checkbox
                v-for="(item, index) in excludeOptions"
                :key="index"
                :label="item.value"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="御魂星级">
            <el-radio-group v-model="starRadio" @change="changeStarRadio">
              <el-radio label="1">统一制定</el-radio>
              <el-radio label="2">分别制定</el-radio>
            </el-radio-group>
            <el-checkbox-group
              v-model="yuhunStarList"
              v-show="starRadio == 1"
              @change="changeStar"
            >
              <el-checkbox
                v-for="(item, index) in yuhunStarOptions"
                :key="index"
                :label="item.value"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
            <el-row
              v-show="starRadio == 2"
              v-for="(item, index) in includeListView"
              :key="index"
            >
              <el-col :span="4">{{ item.name }}</el-col>
              <el-col :span="20"
                ><el-checkbox-group v-model="item.star">
                  <el-checkbox
                    v-for="(item, index) in yuhunStarOptions"
                    :key="index"
                    :label="item.value"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item label="御魂等级">
            <el-radio-group v-model="levelRadio" @change="changeLevelRadio">
              <el-radio label="1">统一制定</el-radio>
              <el-radio label="2">分别制定</el-radio>
            </el-radio-group>
            <el-row v-show="levelRadio == 1">
              <el-col :span="4">{{
                (level[0] != level[1] ? level[0] + "-" : "") + level[1] + "级"
              }}</el-col>
              <el-col :span="20">
                <el-slider
                  v-model="level"
                  range
                  show-stops
                  :max="15"
                  @change="changeLevel"
                >
                </el-slider>
              </el-col>
            </el-row>
            <el-row
              v-show="levelRadio == 2"
              v-for="(item, index) in includeListView"
              :key="index"
            >
              <el-col :span="4">{{ item.name }}</el-col>
              <el-col :span="4">{{
                (item.level[0] != item.level[1] ? item.level[0] + "-" : "") +
                item.level[1] +
                "级"
              }}</el-col>
              <el-col :span="16">
                <el-slider v-model="item.level" range show-stops :max="15">
                </el-slider>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="指定御魂">
            <el-button
              v-for="(item, index) in includeListView"
              @click="selectYuhun(index)"
              :key="index"
              size="mini"
              type="warning"
              >{{ item.name }}</el-button
            >
          </el-form-item>
        </el-form>
        <div></div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {
  tags,
  includeList,
  yuhunStarOptions,
  excludeOptions,
} from "../../assets/view_json/caculator";
export default {
  props: [],
  data() {
    return {
      tags,
      includeList,
      yuhunStarOptions,
      excludeOptions,
      excludeList: [],
      includeListView: [],
      starRadio: "1",
      levelRadio: "1",
      yuhunStarList: [],
      level: [15, 15],
    };
  },
  methods: {
    changeExclude() {
      if (this.excludeList.length > 0) {
        let name = "排除" + this.excludeList.join(",") + "号位";
        this.tags.map((item) => item.type == 1 && (item.name = name));
      } else {
        this.tags.map((item) => item.type == 1 && (item.name = ""));
      }
      this.includeListView = this.includeList.filter((item) => {
        return !this.excludeList.some((val) => item.value == val);
      });
    },
    changeStarRadio() {
      if (this.starRadio == 2) {
        this.tags.map(
          (item) => item.type == 2 && (item.name = "自定义各位置星级")
        );
      } else {
        this.changeStar();
      }
    },
    changeStar() {
      if (this.yuhunStarList.length > 0) {
        let name = "选定" + this.yuhunStarList.join(",") + "星";
        this.tags.map((item) => item.type == 2 && (item.name = name));
      } else {
        this.tags.map((item) => item.type == 2 && (item.name = ""));
      }
    },
    changeLevelRadio() {
      if (this.levelRadio == 2) {
        this.tags.map(
          (item) => item.type == 3 && (item.name = "自定义各位置等级")
        );
      } else {
        this.changeLevel();
      }
    },
    changeLevel() {
      let name =
        "选定" +
        (this.level[0] != this.level[1] ? this.level[0] + "-" : "") +
        this.level[1] +
        "级";
      this.tags.map((item) => item.type == 3 && (item.name = name));
    },
  },
};
</script>

<style>
</style>
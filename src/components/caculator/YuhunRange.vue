<template>
  <div>
    <template v-for="(item, index) in tags">
      <el-tag :key="index" v-if="item.name">{{ item.name }}</el-tag>
    </template>

    <el-button v-popover:popover trigger="manual">自定义</el-button
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
              ><template v-for="(item, index) in includeList"
                ><el-checkbox
                  v-if="!item.entity"
                  :key="index"
                  :label="item.pos"
                  >{{ item.name }}</el-checkbox
                ></template
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
              v-for="(item, index) in includeList"
              :key="index"
              ><template v-if="item.include">
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
                ></template
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
              v-for="(item, index) in includeList"
              :key="index"
            >
              <template v-if="item.include">
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
              </template>
            </el-row>
          </el-form-item>
          <el-form-item label="指定御魂">
            <template v-for="(item, index) in includeList">
              <el-button
                @click="yuhunSelect(item.pos)"
                :key="index"
                size="mini"
                type="warning"
                :disabled="!item.include"
                v-if="!item.entity"
                >{{ item.name }}</el-button
              >
              <div
                style="
                  display: inline-block;
                  width: 70px;
                  height: 70px;
                  position: relative;
                  margin: 0 10px;
                "
                :key="index"
                v-if="item.entity"
              >
                <el-badge
                  :value="'+' + item.entity.myLevel"
                  class="item"
                  :type="item.entity.myLevel == 15 ? 'warning' : 'primary'"
                >
                  <el-image
                    style="width: 70px; height: 70px"
                    :src="require('../../assets/yuhun_border.png')"
                    fit="cover"
                    :style="degree(item.entity.pos)"
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
                  :src="`http://localhost:8080/png/yuhun/${item.entity.suitId}.png`"
                  fit="cover"
                />
              </div>
            </template>
          </el-form-item>
        </el-form>
      </div>
    </el-popover>
    <el-dialog :visible="pos != ''" :show-close="false" @click.stop>
      <YuhunData
        v-if="pos != ''"
        @select-success="selectSuccess"
        :outPos="pos"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="pos = ''">取 消</el-button>
        <el-button type="primary" @click="pos = ''">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  tags,
  yuhunStarOptions,
  excludeOptions,
} from "../../assets/view_json/caculator";
import YuhunData from "../../views/YuhunData";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    YuhunData,
  },
  data() {
    return {
      tags,
      yuhunStarOptions,
      excludeOptions,
      starRadio: "1",
      levelRadio: "1",
      yuhunStarList: [],
      level: [15, 15],
      current: 1,
      size: 10,
      pos: "",
      excludeList: [],
    };
  },
  computed: {
    ...mapState(["gameShot", "user", "includeList"]),
  },
  created() {
    this.changeStar();
    this.changeLevel();
  },
  methods: {
    ...mapMutations(["setIncludeList"]),
    degree(val) {
      return {
        transform: "rotate(" + val * -56 + "deg)",
      };
    },
    changeExclude() {
      if (this.excludeList.length > 0) {
        
        let name = "排除" + this.excludeList.map(item=>item+1).join(",") + "号位";
        this.tags.map((item) => item.type == 1 && (item.name = name));
      } else {
        this.tags.map((item) => item.type == 1 && (item.name = ""));
      }
      this.includeList.forEach((item) => {
        if (this.excludeList.includes(item.pos)) {
          item.include = false;
        } else {
          item.include = true;
        }
        return item;
      });
      this.setIncludeList(this.includeList);
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

    changeLevelRadio() {
      if (this.levelRadio == 2) {
        this.tags.map(
          (item) => item.type == 3 && (item.name = "自定义各位置等级")
        );
      } else {
        this.changeLevel();
      }
    },
    changeStar() {
      if (this.yuhunStarList.length > 0) {
        let name = "选定" + this.yuhunStarList.join(",") + "星";
        this.tags.map((item) => item.type == 2 && (item.name = name));
        this.includeList.forEach((item) => (item.star = this.yuhunStarList));
      } else {
        this.tags.map((item) => item.type == 2 && (item.name = ""));
        this.includeList.forEach((item) => (item.star = []));
      }
      this.setIncludeList(this.includeList);
    },
    changeLevel() {
      let name =
        "选定" +
        (this.level[0] != this.level[1] ? this.level[0] + "-" : "") +
        this.level[1] +
        "级";
      this.tags.map((item) => item.type == 3 && (item.name = name));

      this.includeList.forEach((item) => (item.level = this.level));
      this.setIncludeList(this.includeList);
    },
    yuhunSelect(val) {
      this.pos = parseInt(val);
    },
    selectSuccess(entity, pos) {
      this.includeList[pos].entity = entity;
      this.setIncludeList(this.includeList);
      this.pos = "";
    },
  },
};
</script>

<style>
.item {
  margin-top: 0;
  margin-right: 0;
}
.el-badge__content.is-fixed {
  right: 30px;
}
</style>
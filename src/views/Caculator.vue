<template>
  <div>
    <el-form
      :model="formInline"
      size="small"
      style="width: 800px; margin: 0 auto 100px"
    >
      <el-form-item label="御魂范围">
        <el-tag>标签一</el-tag>
        <el-button v-popover:popover>自定义</el-button
        ><el-popover
          ref="popover"
          placement="bottom"
          title="定义参与计算的御魂范围"
          width="200"
          trigger="click"
        >
          <div class="popover-content">
            <el-form></el-form>
            <div></div>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="目标式神">
        <el-select v-model="heroLevel" style="width: 100px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="heroName" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="位置指定">
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
          <el-form-item label="二号位">
            <el-button size="mini" style="text-align: left; margin-right: 20px"
              >全选</el-button
            >
            <el-button-group>
              <el-button size="mini" style="text-align: left"
                >攻击加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >生命加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >防御加成</el-button
              >
              <el-button size="mini" style="text-align: left">速度</el-button>
            </el-button-group>
          </el-form-item>
          <el-form-item label="四号位">
            <el-button size="mini" style="text-align: left; margin-right: 20px"
              >全选</el-button
            >
            <el-button-group>
              <el-button size="mini" style="text-align: left"
                >攻击加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >生命加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >防御加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >效果命中</el-button
              >
              <el-button size="mini" style="text-align: left"
                >效果抵抗</el-button
              >
            </el-button-group>
          </el-form-item>
          <el-form-item label="六号位">
            <el-button size="mini" style="text-align: left; margin-right: 20px"
              >全选</el-button
            >
            <el-button-group>
              <el-button size="mini" style="text-align: left"
                >攻击加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >生命加成</el-button
              >
              <el-button size="mini" style="text-align: left"
                >防御加成</el-button
              >
              <el-button size="mini" style="text-align: left">暴击</el-button>
              <el-button size="mini" style="text-align: left"
                >暴击伤害</el-button
              >
            </el-button-group>
          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item label="计算指标">
        <el-button size="mini" style="text-align: left">攻击</el-button>
        <el-button size="mini" style="text-align: left">生命</el-button>
        <el-button size="mini" style="text-align: left">防御</el-button>
        <el-button size="mini" style="text-align: left">暴击</el-button>
        <el-button size="mini" style="text-align: left">暴击伤害</el-button>
        <el-button size="mini" style="text-align: left">速度</el-button>
        <el-button size="mini" style="text-align: left">效果命中</el-button>
        <el-button size="mini" style="text-align: left">效果抵抗</el-button>
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
      <el-button size="middle" type="primary" style="text-align: left"
        >极速计算</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
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
      heroOptions: null,
      heroLevel: "全部",
      heroName: "",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit() {
      console.log("submit!");
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

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
      <el-button size="mini" style="text-align: left; margin-right: 20px"
        >全选</el-button
      >
      <el-button-group>
        <el-button
          size="mini"
          style="text-align: left"
          v-for="(item, idx) in site.value"
          :key="idx"
          >{{ item.name }}</el-button
        >
      </el-button-group>
    </el-form-item>
  </el-card>
</template>

<script>
export default {};
</script>

<style>
</style>
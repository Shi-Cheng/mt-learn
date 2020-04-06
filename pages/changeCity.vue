<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/5
  @company Dingxuan
-->
<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <isselected/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import Isselected from '../components/changeCity/isselected'
    import Hot from '../components/changeCity/hot'
    import Category from '../components/changeCity/category'
    export default {
      name: 'ChangeCity',
      components: { Category, Hot, Isselected }
    }
</script>

<style lang="scss" scoped>

</style>

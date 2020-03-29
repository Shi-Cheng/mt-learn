<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/28
  @company Dingxuan
-->
<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="5"> <geo/> </el-col>
    <el-col :span="5"> <user/> </el-col>
    <el-col :span="14"> <navbar/> </el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
  import User from './user'
  import Navbar from './nav'
  export default {
    name: 'Nav',
    components: {
      Geo,
      User,
      Navbar
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/css/public/layout.scss";
  @import "../../../assets/css/public/header/index.scss";
</style>

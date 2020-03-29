<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/28
  @company Dingxuan
-->
<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TopBar from './topbar'
  import SearchBar from './searchbar'
  export default {
    name: 'Index',
    components: {
      TopBar,
      SearchBar
    }
  }
</script>

<style lang="scss">
@import "../../../assets/css/public/index";
</style>

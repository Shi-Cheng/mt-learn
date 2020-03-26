<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/24
  @company Dingxuan
-->
<template>
  <div>
    header
    <user/>
  </div>
</template>

<script>
  import User from './user'
  export default {
    name: 'Header',
    components: {
      User
    }
  }
</script>

<style lang="scss" scoped>

</style>

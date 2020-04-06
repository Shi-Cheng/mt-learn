<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/5
  @company Dingxuan
-->
<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd v-for="item in list" :key="item.id"> {{ item.name === '市辖区' ? item.province: item.name }}</dd>
    </dl>
  </div>
</template>

<script>
  import { STATUS_OK } from '../../server/config/auth'
  export default {
    name: 'Hot',
    data() {
      return {
        list: []
      }
    },
    async mounted() {
      const { status, data: { hots }} = await this.$axios.get('/geo/hotCity')
      if (status === STATUS_OK) {
        this.list = hots
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/css/changeCity/hot";
</style>

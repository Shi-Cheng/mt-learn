<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/6
  @company Dingxuan
-->
<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <msummary :meta="product"/>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" v-if="canOrder || !login">
        <mlist :list="list" v-if="login"/>
        <div
          v-else
          class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round>
            <a href="/login">立即登录</a>
          </el-button>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
  import Crumbs from '../components/detail/crumbs'
  import Msummary from '../components/detail/summary'
  import Mlist from '../components/detail/list'
  import { STATUS_OK } from '../server/config/auth'

  export default {
    name: 'Detail',
    components: {
      Mlist,
      Msummary,
      Crumbs
    },
    data() {
      return {
      }
    },
    computed: {
      canOrder() {
        return this.list.filter(item => item.photos.length).length
      }
    },
    async asyncData(ctx) { // asyncData是在服务端执行
      const { keyword, type } = ctx.query
      const { status, data: { product, more: list, login }} = await ctx.$axios.get('/search/products', {
        params: {
          keyword,
          type,
          city: ctx.store.state.geo.position.city
        }
      })
      if (status === STATUS_OK) {
        return {
          keyword,
          product,
          type,
          list,
          login
        }
      } else {
        return {
          keyword,
          product: {},
          type,
          list: [],
          login: false
        }
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/css/detail/index";
</style>

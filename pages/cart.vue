<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/6
  @company Dingxuan
-->
<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="list" :span="24" class="m-cart">
        <list :cart-data="cart"/>
        <p>
          应付金额: <em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else>购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
  import { STATUS_OK, ERROR_OK } from '../server/config/auth'
  import List from '../components/cart/list'
  export default {
    name: 'Cart',
    components: {
      List
    },
    data() {
      return {
        list: [],
        total: 12
      }
    },
    methods: {
      submit() {}
    },
    async asyncData(ctx) {
      const { status, data: { code, data: { name, price }}} = await ctx.$axios.post('/cart/getCart', {
        id: ctx.query.id
      })
      if (status === STATUS_OK && code === ERROR_OK && name) {
        return {
          cart: [{
            name,
            price,
            count: 1
          }],
          cartNo: ctx.query.id
        }
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/css/cart/index";
</style>

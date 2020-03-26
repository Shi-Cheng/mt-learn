<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/25
  @company Dingxuan
-->
<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">立即登录</nuxt-link>
      <nuxt-link
        class="register"
        to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: ''
      }
    },
    async mounted() {
      // const { status, data: { user }} = await this.$axios.get('/users/getUser')
      // if (status === 200) {
      //   this.user = user
      // }
    }
  }
</script>

<style lang="scss">

</style>

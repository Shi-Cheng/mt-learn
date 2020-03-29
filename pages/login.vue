<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/25
  @company Dingxuan
-->
<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo"/>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="../assets/images/mt-login.jpg"
          width="480"
          height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4
          v-if="error"
          class="tips"><i/>{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input
          v-model="username"
          prefix-icon="profile"/>
        <el-input
          v-model="password"
          prefix-icon="password"
          type="password"/>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button
          class="btn-login"
          type="success"
          size="mini"
          :loading="loading"
          @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import { STATUS_OK, ERROR_OK } from '../server/config/auth'

  export default {
    name: 'Login',
    data() {
      return {
        checked: '',
        username: '',
        password: '',
        error: '',
        loading: false
      }
    },
    layout: 'blank',
    methods: {
      login() {
        const self = this
        if (!self.username || !self.password) {
          self.$message({
            message: '登录名或密码不能为空',
            type: 'error'
          })
        }
        self.loading = true
        const params = {
          username: encodeURIComponent(self.username),
          password: CryptoJS.MD5(self.password).toString()
        }
        self.$axios.post('/users/signin', params).then((res) => {
          self.loading = false
          if (res.status === STATUS_OK) {
            if (res.data && res.data.code === ERROR_OK) {
              self.$message({
                message: '登录成功',
                type: 'success'
              })
              setTimeout(() => {
                window.location.href = '/'
              }, 1000)
            } else {
              self.error = res.data.msg
            }
          } else {
            self.error = '服务器出错'
          }
        })
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/css/login/index";
</style>

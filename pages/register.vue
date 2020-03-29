<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/24
  @company Dingxuan
-->
<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a class="site-logo" href="#"/>
        <span class="login">
          <em class="bold">已有账号？</em>
          <a href="#">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px" class="demo-registerForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" />
          <!--<el-button size="mini" round @click="sendMsg">发送验证码</el-button>-->
          <!--<span class="status">{{ statusMsg }}</span>-->
        </el-form-item>
        <!--<el-form-item label="验证码" prop="code">-->
        <!--<el-input v-model="registerForm.code" maxlength="4" />-->
        <!--</el-form-item>-->
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="registerForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="registerForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import { STATUS_OK, ERROR_OK } from '../server/config/auth'

  export default {
    name: 'Register',
    data() {
      return {
        statusMsg: '',
        error: '',
        registerForm: {
          name: '',
          code: '',
          pwd: '',
          cpwd: '',
          email: ''
        },
        rules: {
          name: [{
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            type: 'string',
            message: '请输入邮箱',
            trigger: 'blur'
          }],
          pwd: [{
            required: true,
            type: 'string',
            message: '请输入密码',
            trigger: 'blur'
          }],
          cpwd: [{
            required: true,
            type: 'string',
            message: '请确认密码',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.registerForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
        },
        loading: false
      }
    },
    layout: 'blank',
    methods: {
      sendMsg() {
        const self = this
        let namePass
        let emailPass
        if (self.timerid) {
          return false
        }
        this.$refs['registerForm'].validateField('name', (valid) => {
          namePass = valid // validateField 如果得到值表示有错误
        })
        self.statusMsg = ''
        if (namePass) {
          return false
        }
        // 206301534@qq.com
        this.$refs['registerForm'].validateField('email', (valid) => {
          if (valid) {
            emailPass = valid
          }
          if (!namePass && !emailPass) {
            self.$axios.post('/users/verify', {
              username: encodeURIComponent(self.registerForm.name),
              email: self.registerForm.email
            }).then(({ status, data }) => {
              if (status === 200 && data && data.code === 0) {
                let count = 60
                self.statusMsg = `验证码已发送，剩余${count--}秒`
                self.timerid = setInterval(() => {
                  self.statusMsg = `验证码已发送，剩余${count--}秒`
                  if (count === 0) {
                    clearInterval(self.timerid)
                  }
                }, 1000)
              } else {
                self.statusMsg = data.msg
                const password = CryptoJS.MD5(self.registerForm.pwd).toString()
                console.log(password)
              }
            })
          }
        })
      },
      register() {
        const self = this
        self.$refs.registerForm.validate((valid) => {
          if (valid) {
            self.loading = true
            const params = {
              username: window.encodeURIComponent(self.registerForm.name),
              password: CryptoJS.MD5(self.registerForm.pwd).toString(),
              email: self.registerForm.email
            }
            self.$axios.post('/users/signup', params).then((res) => {
              self.loading = false
              if (res.status === STATUS_OK) {
                if (res.data && res.data.code === ERROR_OK) {
                  self.$message({
                    message: '恭喜注册成功！',
                    type: 'success'
                  })
                  window.location.href = '/login'
                } else {
                  self.error = res.data.msg
                }
              } else {
                self.error = `服务器出错，错误码：${res.status}`
              }
              setTimeout(() => {
                self.error = ''
              }, 1500)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/css/register/index.scss";
</style>

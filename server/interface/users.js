// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/24
// @company Dingxuan
import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import Users from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body
  if (code) {
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  const user = await Users.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
  }
  const nuser = await Users.create({ username, password, email })
  if (nuser) {
    const res = await axios.post('/users/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  // 固定的用法
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  console.log(username)
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  const transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: Email.smtp.secure,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }

  })
  const ko = {
    code: Email.smtp.code,
    expire: Email.smtp.expire,
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  const mailOptions = {
    form: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '注册码',
    html: `您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error')
      return console.log(error)
    } else {
      Store.hmset(`nodemail: ${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.expire)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.password.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
  // const users = await Users.find()
  // ctx.body = {
  //   users: users.map(item => {
  //     return {
  //       name: item.username,
  //       email: item.email
  //     }
  //   })
  // }
})

export default router

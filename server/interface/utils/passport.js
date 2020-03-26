// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/25
// @company Dingxuan
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

// 用户验证
passport.use(new LocalStrategy(async function(username, password, done) {
  const where = {
    username
  }
  const result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

// 登录中每次请求从session读取对象 序列化和反序列化
// 如：用户每次登录时从本地取的session和服务器端session进行判断比较
passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  return done(null, user)
})

export default passport

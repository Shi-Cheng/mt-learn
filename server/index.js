const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import users from './interface/users.js'
import geo from './interface/geo.js'
import search from './interface/search.js'
import category from './interface/category'
import cart from './interface/cart'
import passport from './interface/utils/passport'
import mongoose from 'mongoose'
import dbConfig from './dbs/config'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'

const app = new Koa()
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

app.keys = ['admin', 'administration']
app.proxy = true
app.use(session({ key: 'admin', prefix: 'admin:uid', store: new Redis() }))
// post处理
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
// 处理登录相关的业务
app.use(passport.initialize())
app.use(passport.session())

// 连接数据库
var db = mongoose.connection
db.on('error', console.error.bind(console, '====== 数据库连接失败 ====='))
db.once('open', function() {
  console.log('========== 数据库已连接 ==========')
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(category.routes()).use(category.allowedMethods())
  app.use(cart.routes()).use(cart.allowedMethods())
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()

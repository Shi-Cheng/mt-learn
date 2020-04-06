// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/4/6
// @company Dingxuan

import Router from 'koa-router'
// import axios from './utils/axios'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart'

const router = new Router({
  prefix: '/cart'
})
router.post('/create', async (ctx) => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'Please Login'
    }
  } else {
    const time = Date()
    const cartNo = md5(Math.random() * 1000 + time).toString()
    const {
      params: {
        id,
        detail
      }
    } = ctx.request.body

    const cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    const result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getCart', async (ctx) => {
  const { id } = ctx.request.body
  console.log(id)
  try {
    const result = await Cart.findOne({ cartNo: id })
    console.info(result.detail[0])
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (e) {
    console.info('e', e)
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router

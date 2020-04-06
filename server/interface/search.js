// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/4/1
// @company Dingxuan
import Router from 'koa-router'
// import Poi from '../dbs/models/poi'
import axios from './utils/axios'
import { STATUS_OK } from '../config/auth'

const router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  const { status, data: { top }} = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  })
  ctx.body = {
    top: status === STATUS_OK ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result }} = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      city: city
    }
  })
  if (status === STATUS_OK) {
    ctx.body = {
      result: result
    }
  } else {
    ctx.body = {
      result: []
    }
  }
})

router.get('/resultByKeywords', async (ctx) => {
  // const { city, keyword } = ctx.query
  // console.log(ctx.query.keyword + '====' + ctx.query.city)
  const { status, data: { count, pois }} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`, {
    params: {
      keyword: ctx.query.keyword,
      city: ctx.query.city
    }
  })

  if (status === STATUS_OK) {
    ctx.body = {
      count: status === 200 ? count : 0,
      pois: status === 200
        ? pois
        : []
    }
  }
})

router.get('/products', async (ctx) => {
  const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '北京'
  const { status, data: { product, more }} = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city
    }
  })
  if (status === STATUS_OK) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated() // 判断是否登录状态
    }
  } else {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router

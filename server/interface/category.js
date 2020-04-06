// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/4/5
// @company Dingxuan
import Router from 'koa-router'
import axios from './utils/axios'
import { STATUS_OK } from '../config/auth'

const router = new Router({
  prefix: '/category'
})
router.get('/crumbs', async (ctx) => {
  const { status, data: { areas, types }} = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '市'
    }
  })
  if (status === STATUS_OK) {
    ctx.body = {
      areas: areas,
      types: types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
  // areas: status===200?areas:[],
  //  types: status===200?types:[]
})

export default router

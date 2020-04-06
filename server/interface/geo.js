// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/31
// @company Dingxuan
import Router from 'koa-router'
import axios from './utils/axios'
import { STATUS_OK } from '../config/auth'

const router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async (ctx) => {
  const { status, data: { province, city }} = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  if (status === STATUS_OK) {
    ctx.body = {
      province: province,
      city: city
    }
  } else {
    ctx.body = {
      province: '',
      city: city
    }
  }
})

router.get('/province', async (ctx) => {
  // const province = await Province.find()
  // console.log(province)
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  const { status, data: { province }} = await axios.get('http://cp-tools.cn/geo/province')
  if (status === STATUS_OK) {
    ctx.body = {
      province: province
    }
  } else {
    ctx.body = {
      province: []
    }
  }
})

router.get('/province/:id', async (ctx) => {
  // http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}
  const { status, data: { city }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === STATUS_OK) {
    ctx.body = {
      city: city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async(ctx) => {
  const { status, data: { city }} = await axios.get(`http://cp-tools.cn/geo/city`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async(ctx) => {
  const { status, data: { hots }} = await axios.get(`http://cp-tools.cn/geo/hotCity`)
  if (status === STATUS_OK) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

router.get('/menu', async(ctx) => {
  const { status, data: { menu }} = await axios.get('http://cp-tools.cn/geo/menu')
  if (status === STATUS_OK) {
    ctx.body = {
      menu: menu
    }
  } else {
    ctx.body = {
      menu: ''
    }
  }
})

export default router

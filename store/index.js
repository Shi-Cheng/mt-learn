// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/31
// @company Dingxuan

import { STATUS_OK } from '../server/config/auth'

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const { status, data: { province, city }} = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === STATUS_OK ? { province, city } : { province: '', city: '' })

    const { status: status2, data: { menu }} = await app.$axios.get('/geo/menu')
    commit('menu/setMenu', status2 === STATUS_OK ? menu : [])

    const { status: status3, data: { result }} = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('geo/setHotPlace', status3 === STATUS_OK ? result : [])
  }
}

// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/31
// @company Dingxuan
const state = () => ({
  menu: []
})

const mutations = {
  setMenu(state, val) {
    state.menu = val
  }
}

const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/31
// @company Dingxuan
const state = () => ({
  hotPlace: []
})

const mutations = {
  setHotPlace(state, val) {
    state.hotPlace = val
  }
}

const actions = {
  setHotPlace: ({ commit }, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

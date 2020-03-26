// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/25
// @company Dingxuan
import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 2000,
  headers: {

  }
})

export default instance

// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/25
// @company Dingxuan

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

export default mongoose.model('User', UserSchema)

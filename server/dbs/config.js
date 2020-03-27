// Copyright Dingxuan. All Rights Reserved.
//   description : 基于区块链分布式PKI管理系统
// @author 潘世成
// @date 2020/3/25
// @company Dingxuan
export default {
  dbs: 'mongodb://127.0.0.1:27017/db',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  // qq POP3/SMTP服务 qfsxuimvloovbjej  IMAP/SMTP服务 mfyytqdduxcjcagh 206301534@qq.com
  // 生成授权码  hkzptaifchgwbidc

  //IMAP/SMTP服务 163 AYZHZHFLUVCECUQN   CZOEDYCFHHATMUAK x_pan2016@163.com
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '206301534'
    },
    get pass() {
      return 'hkzptaifchgwbidc'
    },
    get secure() {
      return false
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase() // 生成随机验证码
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}

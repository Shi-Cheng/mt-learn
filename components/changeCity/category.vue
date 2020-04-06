<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/5
  @company Dingxuan
-->
<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  import { STATUS_OK } from '../../server/config/auth'
  import pyjs from 'js-pinyin'
  const LOW_CODE = 96
  const HIGH_CODE = 123
  export default {
    name: 'Category',
    data() {
      return {
        list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        block: []
      }
    },
    async mounted() {
      const self = this
      const blocks = []
      const { status, data: { city }} = await self.$axios.get('/geo/city')
      if (status === STATUS_OK) {
        let p
        let c
        const d = {}

        city.forEach(item => {
          // 取到首字母
          p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1)
          c = p.charCodeAt(0)
          // 临时变量记录
          if (c > LOW_CODE && c < HIGH_CODE) {
            if (!d[p]) {
              d[p] = []
            }
            // 按字母存储
            d[p].push(item.name)
          }
        })
        // 将对象转成数组
        for (const [k, v] of Object.entries(d)) {
          blocks.push({
            title: k.toUpperCase(),
            city: v
          })
        }
        // 排序
        blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
        self.block = blocks
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/css/changeCity/categroy";
</style>

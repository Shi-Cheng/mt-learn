<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/5
  @company Dingxuan
-->
<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <category :types="types" :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap v-if="point.length" :width="230" :height="290" :point="point"/>
    </el-col>
  </el-row>
</template>

<script>
  import Crumbs from '../components/products/crumbs'
  import List from '../components/products/list'
  import Category from '../components/products/categroy'
  import Amap from '../components/public/map'
  import { STATUS_OK } from '../server/config/auth'

  export default {
    name: 'Products',
    components: {
      List,
      Category,
      Crumbs,
      Amap
    },
    data() {
      return {
        keyword: '',
        types: [],
        areas: [],
        list: [],
        point: []
      }
    },
    async asyncData(ctx) {
      const keyword = ctx.query.keyword
      const city = ctx.store.state.geo.position.city
      const { status, data: { count, pois }} = await ctx.$axios.get('/search/resultByKeywords', {
        params: {
          keyword,
          city
        }
      })
      const { status: status2, data: { areas, types }} = await ctx.$axios.get('/category/crumbs', {
        params: {
          city
        }
      })
      if (status === STATUS_OK && count > 0 && status2 === STATUS_OK) {
        return {
          // 先进行过滤出符合要求的内容
          list: pois.filter(item => item.photos.length).map(item => {
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random() * 10000),
              rate: Number(item.biz_ext.rating),
              price: Number(item.biz_ext.cost),
              scene: item.tag,
              tel: item.tel,
              status: '可定明日',
              location: item.location,
              module: item.type.split(';')[0]
            }
          }),
          keyword,
          areas: areas.filter(item => item.type !== '').slice(0, 5),
          types: types.filter(item => item.type !== '').slice(0, 5),
          point: (pois.find(item => item.location).location || '').split(',')
        }
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/css/products/index";
</style>

<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/28
  @company Dingxuan
-->
<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="searchFocus" @blur="searchBlur" @input="searchInput" placeholder="搜索商家或地点"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/> </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd
              v-for="(item, idx) in $store.state.geo.hotPlace.slice(0, 5)"
              :key="idx"
              @click="selectItem(item)">
            <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a></dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd
              v-for="(item, idx) in searchList"
              :key="idx"
              @click="selectItem(item)">
            <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a></dd>
          </dl>
        </div>

        <p class="suggest">
          <a
            v-for="(item, idx) in $store.state.geo.hotPlace"
            :key="idx"
            :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"/><p class="txt">随时退</p> </li>
          <li><i class="single"/><p class="txt">不满意免单</p> </li>
          <li><i class="overdue"/><p class="txt">过期退</p> </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { STATUS_OK } from '../../../server/config/auth'

  export default {
    name: 'Search',
    data() {
      return {
        ifFocus: false,
        search: '',
        hotPlace: ['火锅', '火锅', '火锅', '火锅'],
        searchList: ['故宫', '故宫', '故宫', '故宫']
      }
    },
    computed: {
      isHotPlace() {
        return this.ifFocus && !this.search
      },
      isSearchList() {
        return this.ifFocus && this.search
      }
    },
    methods: {
      searchFocus() {
        this.ifFocus = true
      },
      searchBlur() {
        const self = this
        setTimeout(() => {
          self.ifFocus = false
        }, 200)
      },
      searchInput: _.debounce(async function(val) {
        this.search = val
        const self = this
        const city = self.$store.state.geo.position.city.replace('市', '')
        self.searchList = []
        const { status, data: { top }} = await self.$axios.get('/search/top', {
          params: {
            input: self.search,
            city
          }
        })
        if (status === STATUS_OK) {
          self.searchList = top.slice(0, 10)
        }
      }, 300),
      selectItem(val) {}
    }
  }
</script>

<style lang="scss">

</style>

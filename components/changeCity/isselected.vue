<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/4/5
  @company Dingxuan
-->
<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    />

  </div>
</template>

<script>
  import { STATUS_OK } from '../../server/config/auth'
  import _ from 'lodash'
  export default {
    name: 'Isselected',
    data() {
      return {
        province: [],
        city: [],
        cvalue: '',
        pvalue: '',
        input: '',
        cities: []
      }
    },
    watch: {
      pvalue: async function(newPvalue) {
        const self = this
        const { status, data: { city }} = await self.$axios.get(`/geo/province/${newPvalue}`)
        if (status === STATUS_OK) {
          self.city = city.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          self.cvalue = ''
        }
      }
    },
    async mounted() {
      const self = this
      const { status, data: { province }} = await self.$axios.get('/geo/province')
      if (status === STATUS_OK) {
        self.province = province.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      }
    },
    methods: {
      querySearchAsync: _.debounce(async function(query, cb) {
        const self = this
        if (query) {
          if (self.cities.length) {
            cb(self.cities.filter(item => item.value.indexOf(query) > -1))
          } else {
            const { status, data: { city }} = await self.$axios.get('/geo/city')
            if (status === STATUS_OK) {
              self.cities = city.map(item => {
                return {
                  value: item.name
                }
              })
              cb(self.cities.filter(item => item.value.indexOf(query) > -1))
            } else {
              cb([])
            }
          }
        }
      }, 200),
      handleSelect(val) {
        console.log(val)
      }
    }
  }
</script>

<style lang="scss">
@import "../../assets/css/changeCity/iselect";
</style>

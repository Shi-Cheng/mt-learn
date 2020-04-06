<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/28
  @company Dingxuan
-->
<template>
  <section class="m-istyle">
    <dl>
      <div v-for="(item, idx) in list" :key="idx">
        <dt v-if="idx === 0">{{ item }}</dt>
        <dd
          v-else
          @mouseover="over(idx)"
          :class="{ active:getClasses === idx}">{{ item }}</dd>
      </div>
    </dl>

    <div>
      <ul class="ibody">
        <li
          v-for="item in cur"
          :key="item.title">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="never">
            <img
              :src="item.img"
              class="image">
            <ul class="cbody">
              <li class="title">{{ item.title }}</li>
              <li class="pos"><span>{{ item.pos }}</span></li>
              <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
            </ul>
          </el-card>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { STATUS_OK } from '../../server/config/auth'
  const DEFAULT_OVER_ID = 1
  const DEFAULT_TYPE = '景点'
  const typeListCN = ['景点', '美食', '丽人', '电影', '旅游']
  const typeListEN = ['first', 'all', 'part', 'spa', 'travel']
  export default {
    name: 'Artistic',
    data() {
      return {
        list: ['有格调', '全部', '约会聚餐', '丽人SPA', '品质出游'],
        overId: DEFAULT_OVER_ID,
        typeList: {
          all: [],
          part: [],
          spa: [],
          travel: []
        }
      }
    },
    computed: {
      cur() {
        return this.typeList[typeListEN[this.overId]]
      },
      getClasses() {
        if (!this.overId) {
          return DEFAULT_OVER_ID
        }
        return this.overId
      }
    },
    async mounted() {
      const city = this.$store.state.geo.position.city
      const self = this
      const { status, data: { count, pois }} = await self.$axios.get(`/search/resultByKeywords`, {
        params: {
          keyword: DEFAULT_TYPE,
          city: city
        }
      })
      if (status === STATUS_OK && count > 0) {
        const r = pois.filter(item => item.photos.length).map(item => {
          return {
            title: item.name,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost || '暂无',
            img: item.photos[0].url,
            url: '//abc.com'
          }
        })
        self.typeList.all = r.slice(0, 9)
      } else {
        self.typeList.all = []
      }
    },
    methods: {
      over: async function(idx) {
        const self = this
        self.overId = idx
        const city = self.$store.state.geo.position.city
        const { status, data: { count, pois }} = await self.$axios.get(`/search/resultByKeywords`, {
          params: {
            keyword: typeListCN[self.overId],
            city: city
          }
        })
        if (status === STATUS_OK && count > 0) {
          const r = pois.filter(item => item.photos.length).map(item => {
            return {
              title: item.name,
              pos: item.type.split(';')[0],
              price: item.biz_ext.cost || '暂无',
              img: item.photos[0].url,
              url: '//abc.com'
            }
          })
          self.typeList[typeListEN[self.overId]] = r.slice(0, 10)
        } else {
          self.typeList = {}
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/index/artistic.scss";
</style>

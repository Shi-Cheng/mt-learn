<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统
  @author 潘世成
  @date 2020/3/28
  @company Dingxuan
-->
<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, idx) in $store.state.menu.menu"
        :key="idx"
        @mouseenter="enter">
        <i :class="item.type" /> {{ item.name }} <span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="childEnter"
      @mouseleave="childLeave">
      <div v-if="curDetail">
        <template v-for="(item,idx) in curDetail.child">
          <h4 :key="idx">{{ item.title }}</h4>
          <span v-for="v in item.child" :key="v"> {{ v }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
        kind: '',
        menu: [
          {
            type: 'food',
            name: '美食',
            child: [{
              title: '美食',
              child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
            }]
          }, {
            type: 'takeout',
            name: '外卖',
            child: [{
              title: '外卖',
              child: ['美团外卖']
            }]
          }, {
            type: 'hotel',
            name: '酒店',
            child: [{
              title: '酒店星级',
              child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            }]
          }]
      }
    },
    computed: {
      curDetail() {
        return this.$store.state.menu.menu.filter(item => item.type === this.kind)[0]
      }
    },
    methods: {
      mouseleave() {
        const self = this
        // 鼠标移开menu层后判断是否进入子项层
        self._timer = setTimeout(function() {
          self.kind = ''
        }, 150)
      },
      childEnter() {
        clearTimeout(this._timer)
      },
      childLeave() {
        self.kind = ''
      },
      enter(e) {
        this.kind = e.target.querySelector('i').className
      }
    }
  }
</script>

<style lang="scss">

</style>

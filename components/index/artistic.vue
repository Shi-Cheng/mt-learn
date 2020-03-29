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
  const OVER_ID = 0
  const DEFAULT_OVER_ID = 1
  export default {
    name: 'Artistic',
    data() {
      return {
        list: ['有格调', '全部', '约会聚餐', '丽人SPA', '品质出游'],
        overId: OVER_ID,
        all: [{
          title: '东星贝儿凯客生日蛋糕',
          img: '//p0.meituan.net/bbia/850ce195a4db8d447644429ac6e32c20330100.jpg@368w_208h_1e_1c',
          pos: '回龙观',
          price: '58'
        }, {
          title: '哈根达斯（东方广场店）',
          img: '//p1.meituan.net/msmerchant/08adfc2c365fe2ff08e4db1c0155bdf1189139.jpg@368w_208h_1e_1c',
          pos: '王府井/东单',
          price: '258'
        }, {
          title: '慕巴夫鲜花主题蛋糕（后沙峪店）',
          img: '//p0.meituan.net/msmerchant/455f8fe67ab4818446dda10061d394ee109929.jpg@368w_208h_1e_1c',
          pos: '后沙峪',
          price: '228'
        }],
        part: [{
          title: '东星贝儿凯客生日蛋糕',
          img: '//p0.meituan.net/msmerchant/b898bb77e76d2acaba804bbd699bfafa793287.jpg@368w_208h_1e_1c',
          pos: '回龙观',
          price: '58'
        }, {
          title: '哈根达斯（东方广场店）',
          img: '//p0.meituan.net/bbia/160826548_1584006150926.jpeg@368w_208h_1e_1c',
          pos: '王府井/东单',
          price: '258'
        }, {
          title: '慕巴夫鲜花主题蛋糕（后沙峪店）',
          img: '//p0.meituan.net/msmerchant/c08c616aa835bc7cebdc3bd17184afef312214.jpg@368w_208h_1e_1c',
          pos: '后沙峪',
          price: '228'
        }],
        spa: [{
          title: '东星贝儿凯客生日蛋糕',
          img: '//p1.meituan.net/wedding/5096ef2507aa4e2554a38ebab934446f341082.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
          pos: '回龙观',
          price: '58'
        }, {
          title: '哈根达斯（东方广场店）',
          img: '//p0.meituan.net/wedding/7f274360936a5233902be9afe5054eef4134276.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
          pos: '王府井/东单',
          price: '258'
        }, {
          title: '慕巴夫鲜花主题蛋糕（后沙峪店）',
          img: '//p0.meituan.net/merchantpic/c4cd218873953a976d9f1c485de2190718522.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
          pos: '后沙峪',
          price: '228'
        }],
        travel: [{
          title: '东星贝儿凯客生日蛋糕',
          img: '//p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c',
          pos: '回龙观',
          price: '58'
        }, {
          title: '哈根达斯（东方广场店）',
          img: '//p1.meituan.net/dnaimgdark/76af0465f5614ed089227449c9354b674427249.jpg@368w_208h_1e_1c',
          pos: '王府井/东单',
          price: '258'
        }, {
          title: '慕巴夫鲜花主题蛋糕（后沙峪店）',
          img: '//p1.meituan.net/tdchotel/bfc639b6a1b6079bb3739b6a92384656424277.jpg@368w_208h_1e_1c',
          pos: '后沙峪',
          price: '228'
        }]
      }
    },
    computed: {
      cur() {
        if (!this.overId || this.overId === 1) {
          return this.all
        } else if (this.overId === 2) {
          return this.part
        } else if (this.overId === 3) {
          return this.spa
        } else {
          return this.travel
        }
      },
      getClasses() {
        if (!this.overId) {
          return DEFAULT_OVER_ID
        }
        return this.overId
      }
    },
    methods: {
      over(idx) {
        this.overId = idx
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/index/artistic.scss";
</style>

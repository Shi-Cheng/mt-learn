<!--
  Copyright Dingxuan. All Rights Reserved.
  description : 基于区块链分布式PKI管理系统  动态组件
  @author 潘世成
  @date 2020/4/5
  @company Dingxuan
-->
<template>
  <div class="m-map" :id="id" :style="{width: width + 'px', height: height + 'px', margin: '34px auto'}"/>
</template>

<script>
    export default {
      name: 'Map',
      props: {
        width: {
          type: Number,
          default: 300
        },
        height: {
          type: Number,
          default: 300
        },
        point: {
          type: Array,
          default() {
            return [116.46, 39.92]
          }
        }
      },
      data() {
        return {
          id: `map`,
          key: '54e995e6e1c9236834e32b486289c224'
        }
      },
      mounted() {
        const self = this
        self.id = `map${Math.random().toString().slice(4, 6)}`

        window.onmaploaded = () => {
          const map = new window.AMap.Map(self.id, {
            resizeEnable: true,
            zoom: 11,
            center: self.point
          })

          self.map = map
          // AMap.plugin
          window.AMap.plugin('Amap.ToolBar', () => {
            const toolbar = new window.AMap.ToolBar()
            map.addControl(toolbar)
            const marker = new window.AMap.Marker({
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
              position: self.point
            })
            self.marker = marker
            marker.setMap(map)
          })
        }
        const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
        const jsapi = document.createElement('script')
        jsapi.charset = 'utf-8'
        jsapi.src = url
        document.head.appendChild(jsapi)
      }
    }
</script>

<style lang="scss" scoped>

</style>

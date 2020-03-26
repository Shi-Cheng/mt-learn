<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <mt-header/>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer height="100%">
      <mt-footer/>
    </el-footer>
  </el-container>
</template>

<script>
  import MtHeader from '../components/public/header/header'
  import MtFooter from '../components/public/footer/footer'
  export default {
    components: {
      MtHeader,
      MtFooter
    }
  }
</script>
<style>
</style>

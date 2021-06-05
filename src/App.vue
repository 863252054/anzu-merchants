<template>
  <div id="app">

    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/goods" icon="bag">商品</van-tabbar-item>
      <van-tabbar-item replace to="/home" icon="manager">个人</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>

export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      active: 0,
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
#app{
  width: 100%;
  height: 100%;
}
</style>

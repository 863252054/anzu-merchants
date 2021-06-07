<template>
  <div id="goods">
    <van-nav-bar title="商品" @click-right="addGoods">
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs type="card">
      <van-tab title="已上架">内容 1</van-tab>
      <van-tab title="审核中">内容 2</van-tab>
      <van-tab title="已下架">内容 3</van-tab>
    </van-tabs>

    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'goods',
  methods: {
    addGoods () {
      this.$router.push('/goods/addGoods')
    }
  },
  mounted () {
    if (this.$store.state.merchant_id === '') {
      this.$router.push('home')
    }
  }
}
</script>

<style scoped lang="less">
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>

<template>
  <div id="goods">
    <van-nav-bar title="商品" @click-right="onClickRight">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs type="card">
      <van-tab title="已上架">内容 1</van-tab>
      <van-tab title="审核中">内容 2</van-tab>
      <van-tab title="已下架">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'goods',
  methods: {
    onClickLeft () {
    },
    onClickRight () {
    }
  }
}
</script>

<style scoped>

</style>

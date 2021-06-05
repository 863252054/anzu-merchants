<template>
  <div id="myAddress">
    <!--导航栏-->
    <van-nav-bar title="我的地址"
                 left-arrow
                 @click-left="onClickLeft">

    </van-nav-bar>
    <!-- 没有数据的占位图 -->
    <div v-show="list.length<1">
      <van-empty description="您还没有添加地址哦" />
    </div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />

    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chosenAddressId: '1622794216140001',
      list: this.$store.state.merchantAddress
    }
  },
  methods: {
    onAdd () {
      this.$router.push('/home/myAddress/addAddress')
    },
    onEdit (item, index) {
      this.$router.push({ name: 'editAddress', params: { content: item } })
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
#myAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
}
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

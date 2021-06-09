<template>
  <div id="myAddress">
    <!--导航栏-->
    <van-nav-bar title="我的地址"
                 left-arrow
                 @click-left="onClickLeft">

    </van-nav-bar>
    <!-- 没有数据的占位图 -->
    <div v-show="this.$store.state.merchantAddress.length<1">
      <van-empty description="您还没有添加地址哦" />
    </div>
    <van-address-list
      v-model="chosenAddressId"
      @select="changeAddressId"
      default-tag-text="默认"
      :list="this.$store.state.merchantAddress"
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
      chosenAddressId: this.$store.state.chosenAddressId,
      list: this.$store.state.merchantAddress
    }
  },
  methods: {
    changeAddressId (item, index) {
      this.$store.state.chosenAddressId = item.id
    },
    onAdd () {
      this.$router.push('/home/myAddress/addAddress')
    },
    onEdit (item, index) {
      this.$router.push({ name: 'editAddress', params: { content: item } })
    },
    onClickLeft () {
      this.$router.back()
    },
    initAddress () {
      const _this = this
      this.$ajax.get('http://47.111.10.102:8085/merchant_address/findAllByMerchantId', {
        params: {
          merchant_id: _this.$store.state.merchant_id
        }
      }).then(function (res) {
        if (res.data.port === '500') {
          _this.$store.state.merchantAddress = []
        } else {
          const addressList = []
          const resList = res.data.data
          for (let i = 0; i < resList.length; i++) {
            const addressItem = {}
            addressItem.id = resList[i].id
            addressItem.province = resList[i].prov
            addressItem.city = resList[i].city
            addressItem.county = resList[i].area
            addressItem.addressDetail = resList[i].detail
            addressItem.name = resList[i].name
            addressItem.tel = resList[i].tel
            addressItem.areaCode = resList[i].addressCode
            addressItem.isDefault = resList[i].isDefault === 1
            addressItem.address = addressItem.province + addressItem.city + addressItem.county + addressItem.addressDetail
            addressList.push(addressItem)
          }
          _this.$store.state.merchantAddress = addressList
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    if (this.$store.state.merchant_id === '') {
      this.$router.push('home')
    }
    this.initAddress()
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

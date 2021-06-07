<template>
  <div id="addAddress">
    <van-nav-bar title="修改地址"
                 left-arrow
                 border
                 @click-left="onClickLeft"/>
    <van-address-edit
      :area-list="areaList"
      tel-maxlength="11"
      :addressInfo="addressInfo"
      show-delete
      @save="onModify"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from '../config/area'
export default {
  data () {
    return {
      areaList: areaList,
      addressInfo: {}
    }
  },
  mounted () {
    if (this.$store.state.merchant_id === '') {
      this.$router.push('home')
    }
    this.addressInfo = this.$route.params.content
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onModify (addressItem) {
      const _this = this
      this.$ajax.post('http://47.111.10.102:8085/merchant_address/modify', this.$qs.stringify({
        address_code: addressItem.areaCode,
        area: addressItem.county,
        city: addressItem.city,
        detail: addressItem.addressDetail,
        id: addressItem.id,
        merchant_id: _this.$store.state.merchant_id,
        name: addressItem.name,
        prov: addressItem.province,
        tel: addressItem.tel
      })).then(function (res) {
        _this.initAddress()
        _this.$toast.success('修改成功')
        _this.$router.back()
      }).catch(function (err) {
        console.log(err)
      })
    },
    onDelete (addressItem) {
      const _this = this
      this.$ajax.get('http://47.111.10.102:8085/merchant_address/deletebyid', {
        params: {
          id: addressItem.id
        }
      }).then(function (res) {
        _this.initAddress()
        _this.$toast.success('删除成功')
        _this.$router.back()
      }).catch(function (err) {
        console.log(err)
      })
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
  }
}
</script>

<style scoped lang="less">
#addAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
  .van-address-edit {
    .van-button {
      background-color: #45c763;
    }
  }
}
</style>

<template>
  <div id="addAddress">
    <van-nav-bar title="新增地址"
                 left-arrow
                 border
                 @click-left="onClickLeft"/>
    <van-address-edit
      :area-list="areaList"
      tel-maxlength="11"
      @save="onSave"
    />
  </div>
</template>

<script>
import areaList from '../config/area'
export default {
  data () {
    return {
      areaList: areaList
    }
  },
  methods: {
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
    },
    onSave (addressItem) {
      const _this = this
      this.$ajax.post('http://47.111.10.102:8085/merchant_address/add', _this.$qs.stringify({
        address_code: addressItem.areaCode,
        area: addressItem.county,
        city: addressItem.city,
        detail: addressItem.addressDetail,
        merchant_id: _this.$store.state.merchant_id,
        name: addressItem.name,
        prov: addressItem.province,
        tel: addressItem.tel
      })).then(function (res) {
        _this.initAddress()
        _this.$toast.success('添加成功')
        _this.$router.back()
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

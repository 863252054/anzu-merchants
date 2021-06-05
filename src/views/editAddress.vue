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
      show-postal
      show-set-default
      @save="onSave"
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
    this.addressInfo = this.$route.params.content
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onSave (content) {
      content.merchant_id = this.$store.state.merchant_id
      content.address = content.province + content.city + content.county + content.addressDetail
      this.$store.state.merchantAddress.push(content)
      this.$router.back()
    },
    onDelete (content) {
      this.$router.back()
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

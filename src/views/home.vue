<template>
  <div id="home">
    <van-nav-bar title="个人"
                 :fixed=true
                 :border=false
                 style="height:1.25rem" />
<!--    个人信息-->
    <van-cell-group style="margin-top:1.2rem">
      <van-cell style="background-color: #e34949;color:#FFF;"
                label-class="labelClass"
                center>
        <template slot="title">
          <div class="personMsg">
            <van-image
              width="2rem"
              height="2rem"
              fit="cover"
              style="margin-left: 1rem;"
              round
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="personInfo">
              <span style="font-size: medium">{{this.$store.state.login_name}}</span>
              <span>手机号:{{this.$store.state.login_number}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

<!--    分栏-->
    <van-cell-group style="margin-top: 0.5rem">
      <van-cell icon="paid" title="账户余额"  :value="balanceAfter" />
      <van-cell icon="balance-list-o" title="订单管理" is-link to="index" />
      <van-cell icon="location-o" title="收货地址" is-link @click="goToPage('myAddress')"/>
      <van-cell icon="setting-o" title="修改密码" is-link/>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.5rem">
      <van-cell icon="contact"  title="关于我们"  is-link />
      <van-cell icon="delete-o" title="清除缓存" is-link />
    </van-cell-group>
    <div style="margin-top: 3rem; text-align: center">
      <van-button color="red" round plain type="primary"  style=" width: 90%;" @click="goToPage('login')">退出登录</van-button>
    </div>

    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
export default {
  methods: {
    goToPage (name) {
      this.$router.push({ name })
    },
    initInfo () {
      const _this = this
      this.$ajax.get('http://47.111.10.102:8085/merchant/findByAccount', {
        params: {
          account: _this.$store.state.login_number
        }
      }).then(function (res) {
        if (res.data.port === '500') {
          _this.goToPage('login')
        } else {
          _this.$store.state.login_name = res.data.data.merchantName
          _this.$store.state.balance = res.data.data.balance
          _this.$store.state.merchant_id = res.data.data.id
        }
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
  },
  mounted () {
    this.initInfo()
  },
  computed: {
    balanceAfter () {
      return this.$store.state.balance + '.00'
    }
  }
}
</script>
<style scoped lang="less">
#home{
  width: 100%;
  background-color: #f7f8fa;
  padding-bottom: 1rem;
  .van-nav-bar {
    background-color: #e34949;
    ::v-deep .van-nav-bar__title {
      color: white;
    }
  }
  .personMsg {
    display: flex;
    align-items: center;
    .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 1rem;
    }
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
}
</style>

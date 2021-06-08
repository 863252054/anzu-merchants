<template>
  <div id="home">
    <van-nav-bar title="管理员"/>
<!--    个人信息-->
      <van-cell style="margin-top: 10px"
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
              <span style="font-size: large">{{this.$store.state.login_name}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    <van-cell-group style="margin-top: 1rem">
      <van-cell icon="contact"  title="关于我们"  is-link />
      <van-cell  icon="delete-o" title="清除缓存" is-link />
    </van-cell-group>
    <div style="margin-top: 7rem; text-align: center">
      <van-button color="red" round plain type="primary" style="width: 90%;" @click="goToPage('login')">退出登录</van-button>
    </div>

    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'home',
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
          _this.$store.state.merchant_id = res.data.data.id
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

  }
}
</script>
<style scoped lang="less">
#home{
  width: 100%;
  background-color: #f7f8fa;
  padding-bottom: 1rem;
  //.van-nav-bar {
  //  background-color: #e34949;
  //  ::v-deep .van-nav-bar__title {
  //    color: white;
  //  }
  //}
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

<template>
  <div>
  <div id="login" v-show="showLogin">
<!--    <van-nav-bar title="登录"/>-->
    <!-- 输入手机号，调起手机号键盘 -->
    <div style="text-align: center; margin-top: 0.6rem; margin-bottom: 0.5rem;" >
      <van-image
        fit="contain"
        round
        style="box-shadow: 2px 2px 5px #000"
        src="http://yuan619.xyz/xuyang/anzu-merchant/anzu-logo.png"
      />
    </div>

    <van-tabs type="card">
      <van-tab title="登录">
        <div style="display: flex; flex-direction: column;  align-items:center;justify-content:center; margin-top: 1rem">
          <van-field autofocus  v-model="login_number" type="number" label="手机号" maxlength="11" clearable style="margin-top: 1rem"/>
          <van-field v-model="login_password" style="margin-top: 0.8rem"  type="password" label="密码" />
        </div>
        <div style="margin-top: 2rem; text-align: center;display: flex; flex-direction: column; align-items:center;justify-content:center;">
          <van-checkbox v-model="agree_rule"  shape="square" icon-size="14px">登录即代表同意<span style="color: cornflowerblue">商家协议</span>,遵守协议中的内容</van-checkbox>
          <van-button round  color="linear-gradient(to right, #ff6034, #ee0a24)" style="width: 80%; margin-top: 5px" :disabled="!agree_rule" @click="login">
            登录
          </van-button>
        </div>
      </van-tab>
      <van-tab title="注册">
        <div style="display: flex; flex-direction: column;  align-items:center;justify-content:center; margin-top: 1rem">
          <van-field autofocus  v-model="login_name"  label="用户名" maxlength="11" clearable style="margin-top: 0.6rem"/>
          <van-field autofocus  v-model="login_number" type="number" label="手机号" maxlength="11" clearable style="margin-top: 0.6rem"/>
          <van-field v-model="login_password" style="margin-top: 0.6rem"  type="password" label="密码" />
        </div>
        <div style="margin-top: 1.5rem; text-align: center;display: flex; flex-direction: column; align-items:center;justify-content:center;">
          <van-button round  color="linear-gradient(to right, #ff6034, #ee0a24)" style="width: 80%; margin-top: 5px" :disabled="!agree_rule" @click="register">
           注册
          </van-button>
        </div>
      </van-tab>
    </van-tabs>

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
  data () {
    return {
      showLogin: true,
      login_number: '',
      login_password: '',
      login_name: '',
      agree_rule: true
    }
  },
  methods: {
    goToPage (name) {
      this.$router.push({ name })
    },
    send_password () {
      this.$toast.success('已发送')
    },
    register () {
      if (this.login_number.length !== 11 || this.login_name === '' || this.login_password === '') {
        this.$toast.fail('信息不能为空')
      } else {
        const _this = this
        this.$ajax.post('http://47.111.10.102:8085/merchant/add', this.$qs.stringify({
          account: _this.login_number,
          merchant_name: _this.login_name,
          password: _this.login_password
        })).then(function (res) {
          if (res.data.port === '400') {
            _this.$toast.fail('该用户已存在')
          } else {
            _this.$toast.success('注册成功，请前往登录')
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    login () {
      if (this.login_number.length !== 11 || this.login_password.length !== 6) {
        this.$toast.fail('账号或密码格式错误')
      } else {
        const _this = this
        this.$ajax.get('http://47.111.10.102:8085/merchant/login', {
          params: {
            account: _this.login_number,
            password: _this.login_password
          }
        }).then(function (res) {
          if (res.data.port === '500') {
            _this.$toast.fail('用户名或密码错误')
          } else {
            _this.$toast.success('登录成功')
            _this.$store.state.login_number = _this.login_number
            _this.$store.state.merchantAddress = []
            _this.goToPage('home')
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
#login{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f7f8fa;
  z-index: 101;
  .van-field{
    width: 85%;
    border-radius: 0rem;
    box-shadow: 2px 2px 5px gray;
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
</style>

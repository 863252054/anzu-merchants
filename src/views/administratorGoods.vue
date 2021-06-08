<template>
  <div id="goods">
    <van-nav-bar title="商品审核"
                 fixed>
    </van-nav-bar>
    <van-tabs type="card" style="margin-top:1.4rem; margin-bottom: 1.4rem">
      <van-tab title="待审核">
        <div v-show="this.$store.state.checkGoodsList.length === 0">
          <van-empty
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="空空如也"
        />
        </div>
        <administratorGoodsCard :goodsList="this.$store.state.checkGoodsList" :status=0></administratorGoodsCard>
      </van-tab>
      <van-tab title="已驳回">
        <div v-show="this.$store.state.failGoodsList.length === 0">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="空空如也"
          />
        </div>
        <administratorGoodsCard :goodsList="this.$store.state.failGoodsList" :status=2></administratorGoodsCard>
      </van-tab>
      <van-tab title="已过审">
        <div v-show="this.$store.state.upGoodsList.length === 0">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="空空如也"
          />
        </div>
        <administratorGoodsCard :goodsList="this.$store.state.upGoodsList" :status=1></administratorGoodsCard>
      </van-tab>
    </van-tabs>
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import administratorGoodsCard from '../components/administratorGoodsCard'
export default {
  name: 'goods',
  methods: {
    getAllGoodsList () {
      const _this = this
      this.$ajax.get('http://47.111.10.102:8085/goods/findAllForAdmin').then(function (res) {
        console.log(res)
        if (res.data.port === '500') {
          _this.$store.state.allList = []
        } else {
          _this.$store.state.allList = res.data.data
        }
        // 清空数组
        _this.$store.state.checkGoodsList = []
        _this.$store.state.upGoodsList = []
        _this.$store.state.failGoodsList = []
        for (let i = 0; i < _this.$store.state.allList.length; i++) {
          const item = _this.$store.state.allList[i]
          if (item.status === 0) _this.$store.state.checkGoodsList.push(item)
          else if (item.status === 2) _this.$store.state.failGoodsList.push(item)
          else _this.$store.state.upGoodsList.push(item)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    if (this.$store.state.merchant_id === '') {
      this.$router.push({ name: 'login' })
    } else {
      this.getAllGoodsList()
    }
  },
  components: {
    administratorGoodsCard: administratorGoodsCard
  }
}
</script>

<style scoped lang="less">
::v-deep .van-empty__image {
  width: 90px;
  height: 90px;
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

<template>
  <div id="merchantOrder">
    <van-nav-bar title="订单"
                 fixed>
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs type="card" style="margin-top:1.4rem; margin-bottom: 1.4rem">
      <van-tab title="待发货">
        <div v-show="this.$store.state.sendOrderList.length === 0">
          <van-empty
          class="custom-image"
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="空空如也"
        />
        </div>
        <merchantOrderCard :orderList="this.$store.state.sendOrderList" :status=0></merchantOrderCard>
      </van-tab>
      <van-tab title="待确认">
        <div v-show="this.$store.state.receiveOrderList.length === 0">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="空空如也"
          />
        </div>
        <merchantOrderCard :orderList="this.$store.state.receiveOrderList" :status=1></merchantOrderCard>
      </van-tab>
      <van-tab title="退款中">
        <div v-show="this.$store.state.returnOrderList.length === 0">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="空空如也"
          />
        </div>
        <merchantOrderCard :orderList="this.$store.state.returnOrderList" :status=2></merchantOrderCard>
      </van-tab>
      <van-tab title="已完成">
        <div v-show="this.$store.state.completedOrderList.length === 0">
          <van-empty
            class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="空空如也"
          />
        </div>
        <merchantOrderCard :orderList="this.$store.state.completedOrderList" :status=3></merchantOrderCard>
      </van-tab>
    </van-tabs>

    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import merchantOrderCard from '../components/merchantOrderCard'
export default {
  name: 'goods',
  methods: {
    getOrderList () {
      const _this = this
      this.$ajax.get('http://47.111.10.102:8085/goods_order/findAllByMerchantId', {
        params: {
          merchant_id: _this.$store.state.merchant_id
        }
      }).then(function (res) {
        if (res.data.port === '500') {
          _this.$store.state.allOrderList = []
        } else {
          _this.$store.state.allOrderList = res.data.data
        }
        // 清空数组
        _this.$store.state.sendOrderList = []
        _this.$store.state.receiveOrderList = []
        _this.$store.state.returnOrderList = []
        _this.$store.state.completedOrderList = []
        for (let i = 0; i < _this.$store.state.allOrderList.length; i++) {
          const item = _this.$store.state.allOrderList[i]
          if (item.orderStatus === 1) _this.$store.state.sendOrderList.push(item)
          else if (item.orderStatus === 2 || item.orderStatus === 3 || item.orderStatus === 5 || item.orderStatus === 6) _this.$store.state.receiveOrderList.push(item)
          else if (item.orderStatus === -2) _this.$store.state.returnOrderList.push(item)
          else _this.$store.state.completedOrderList.push(item)
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
      this.getOrderList()
    }
  },
  components: {
    merchantOrderCard: merchantOrderCard
  }
}
</script>

<style scoped lang="less">
#merchantOrder {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
}
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

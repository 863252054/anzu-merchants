<template>
    <div id="goodsCard">
      <van-card
        style="margin-top: 5px"
        v-for="item in orderList"
        :key="item.id"
        :price="item.goodsTotalPrice"
        :desc="'商品数量: '+item.goodsNum"
        :title="'商品编号: '+item.goodsId"
      >
        <template #thumb>
          <div style="display: flex;flex-direction: column;align-items:center;justify-content:center;font-size: large; margin-top:5px;width: 100%; height: 100%; border: dashed 1px saddlebrown">
            <div>订单编号:</div>
            <div>{{item.id}}</div>
          </div>
        </template>
        <template #tags>
          <div v-if="item.orderStatus === 2"><van-tag plain type="primary">已发货</van-tag></div>
          <van-tag plain type="primary" v-if="item.orderStatus === -4">退款单</van-tag>
          <van-tag plain type="primary" v-if="item.orderStatus === 3">返程中</van-tag>
          <van-tag plain type="primary" v-if="item.orderStatus === 5">使用中</van-tag>
          <van-tag plain type="primary" v-if="item.orderStatus === 5">已超时</van-tag>
          <van-tag plain type="primary" v-if="item.deposit === 0">超时未归还</van-tag>
        </template>
        <template #num>
          所剩押金:{{ item.deposit }}
        </template>
        <template #footer>
          <van-button v-if="status != 3" type="primary" size="small" @click="handleStatus(item)">{{statusConvertOpt2(item.orderStatus)}}</van-button>
          <van-button v-if="item.orderStatus === 1" type="info" size="small" @click="selectAddress()">地址</van-button>
        </template>
      </van-card>
      <transition name="router-slider"
                  mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>

export default {
  name: 'goodsCard',
  data () {
    return {
    }
  },
  props: {
    orderList: {
      type: Array,
      default: () => {
        return []
      }
    },
    status: {
      type: Number,
      required: true
    }
  },
  methods: {
    statusConvertOpt2 (value) {
      let statuesOpt2 = ''
      if (value === 1) statuesOpt2 = '发货'
      if (value === 2 || value === 3 || value === 5) statuesOpt2 = '完成交易'
      if (value === -2) statuesOpt2 = '同意退款'
      return statuesOpt2
    },
    selectAddress () {
      this.$toast({ message: '选中地址后返回', icon: 'aim' })
      this.$router.push({ name: 'myAddress' })
    },
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
    },
    handleStatus (item) {
      const _this = this
      let statusAfter = 0
      if (item.orderStatus === 1) {
        statusAfter = 2
      } else if (item.orderStatus === 2 || item.orderStatus === 3 || item.orderStatus === 5 || item.orderStatus === 5) {
        statusAfter = 4
      } else if (item.orderStatus === -2) {
        statusAfter = 4
      } else {
        statusAfter = 0
      }
      if (statusAfter === 5) {
        this.$ajax.post('http://47.111.10.102:8085/goods_order/modifyMerchantAddress', _this.$qs.stringify({
          id: item.id,
          merchant_address_id: _this.$store.state.chosenAddressId
        })).then(function (res) {
          _this.$toast.success('发货成功')
        }).catch(function (err) {
          console.log(err)
        })
      }
      this.$ajax.post('http://47.111.10.102:8085/goods_order/modifyOrderStatus', _this.$qs.stringify({
        id: item.id,
        order_status: statusAfter
      })).then(function (res) {
        _this.$toast.success('已确认')
        _this.getOrderList()
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
#goodsCard{
  margin-bottom: 1.5rem;
}

</style>

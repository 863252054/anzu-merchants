<template>
    <div id="goodsCard">
      <van-card
        style="margin-top: 5px"
        v-for="item in goodsList"
        :key="item.id"
        :num="item.stock"
        :desc="item.intro"
        :title="'商品名称:  '+item.goodsName"
        :thumb="item.picUrl"
      >
        <template #tags>
          <van-tag plain type="primary">{{categoryIdConvert(item.categoryId)}}</van-tag>
          <van-tag style="margin-left: 5px;" plain type="success">{{modeConvert(item.mode)}}</van-tag>
        </template>
        <template #num>
          库存:{{ item.stock }}
        </template>
        <template #price>
          <div style="display: flex; flex-direction: column; margin-left: 5px">
            <div style="font-size: medium">￥{{item.price}} / {{timeConvert(item.leaseTime)}}</div>
            <div>押金:￥{{ item.deposit }}</div>
          </div>
        </template>
        <template #footer>
          <van-button type="primary" size="small" @click="seeGoods(item)">查看</van-button>
          <van-button type="info" size="small" @click="changeStatus(item)">{{statusConvertOpt2(item.status)}}</van-button>
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
    goodsList: {
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
    timeConvert (value) {
      return (value / 86400) + '天'
    },
    categoryIdConvert (value) {
      let categoryName = ''
      if (value === 1) categoryName = '数码'
      else if (value === 2) categoryName = '钟表'
      else if (value === 3) categoryName = '家具'
      else if (value === 4) categoryName = '文娱'
      return categoryName
    },
    modeConvert (value) {
      let modeName = ''
      if (value === 1) modeName = '以租代售'
      else if (value === 2) modeName = '先租后买'
      else if (value === 3) modeName = '共享租赁'
      return modeName
    },
    statusConvertOpt2 (value) {
      let statuesOpt2 = ''
      if (value === 1) statuesOpt2 = '驳回'
      if (value === 0) statuesOpt2 = '通过'
      if (value === 2) statuesOpt2 = '通过'
      return statuesOpt2
    },
    seeGoods (item) {
      this.$router.push({ name: 'seeGoods', params: { content: item } })
    },
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
    },
    changeStatus (item) {
      const _this = this
      let statusAfter = 0
      if (this.status === 1) {
        statusAfter = 2
      } else if (this.status === 0) {
        statusAfter = 1
      } else if (this.status === 2) {
        statusAfter = 1
      }
      this.$ajax.post('http://47.111.10.102:8085/goods/modify', _this.$qs.stringify({
        category_id: item.categoryId,
        deposit: item.deposit,
        goods_name: item.goodsName,
        id: item.id,
        intro: item.intro,
        lease_time: item.leaseTime,
        merchant_id: item.merchantId,
        mode: item.mode,
        pic_url: item.picUrl,
        price: item.price,
        stock: item.stock,
        status: statusAfter
      })).then(function (res) {
        _this.$toast.success('修改成功')
        _this.getAllGoodsList()
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

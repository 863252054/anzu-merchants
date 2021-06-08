<template>
  <div id="addGoods">
    <van-nav-bar title="添加商品"
                 left-arrow
                 @click-left="onClickLeft"/>
    <van-form>
      <div style="margin-top: 5px">
        <van-field
          v-model="goods_name"
          readonly
          name="商品名"
          label="商品名"
          placeholder="商品名"
          :rules="[{ required: true, message: '请输入商品名' }]"
        />
        <van-field
          v-model="intro"
          readonly
          autosize
          label="商品描述"
          type="textarea"
          maxlength="200"
          placeholder="商品描述(200字以内)"
          show-word-limit
        />
        <van-field name="uploader" label="商品图片" readonly>
          <template #input>
              <van-image
                width="100"
                height="100"
                fit="content"
                :src="pic_url ? pic_url : 'https://img01.yzcdn.cn/vant/leaf.jpg'"
              />
          </template>
        </van-field>
      </div>
      <div style="margin-top: 12px">
        <van-field
          readonly
          name="categoryPicker"
          :value="categoryValue"
          label="商品分类"
          placeholder="请选择"
        />
        <van-field
          readonly
          name="modePicker"
          :value="modeValue"
          label="租赁模式"
          placeholder="请选择"
        />
      </div>
      <div style="margin-top: 12px">
        <van-field
          v-model="price"
          name="价格"
          label="价格"
          placeholder="请输入价格"
          readonly
          type="number"
          :rules="[{ required: true, message: '请填写价格' }]"
        />
        <van-field
          v-model="deposit"
          name="押金"
          label="押金"
          placeholder="请输入押金"
          type="number"
          :rules="[{ required: true, message: '请填写押金' }]"
        />
        <van-field
          v-model="lease_time"
          name="租赁时间"
          readonly
          label="租赁时间"
          placeholder="请输入租赁时间"
          type="digit"
          :rules="[{ required: true, message: '请填写租赁时间' }]"
        />
        <van-field
          v-model="stock"
          name="库存"
          readonly
          label="库存"
          placeholder="请输入库存"
          type="digit"
          :rules="[{ required: true, message: '请填写库存' }]"
        />
      </div>
    </van-form>
  </div>
</template>

<script>
// import { getUploadToken } from '../config/upToken'

export default {
  name: 'editGoods',
  data () {
    return {
      goods_name: '',
      intro: '',
      pic_url: '',
      categoryValue: '',
      categoryColumns: ['数码类', '钟表类', '家具类', '文娱类'],
      showCategoryPicker: false,
      category_id: 0,
      modeValue: '',
      modeColumns: ['以租代售', '先租后买', '共享租赁'],
      showModePicker: false,
      mode: 0,
      price: '',
      deposit: '',
      lease_time: '',
      stock: '',
      status: '',
      id: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  mounted () {
    if (this.$store.state.merchant_id === '') {
      this.$router.push('home')
    } else {
      this.goods_name = this.$route.params.content.goodsName
      this.intro = this.$route.params.content.intro
      this.pic_url = this.$route.params.content.picUrl
      this.category_id = this.$route.params.content.categoryId
      this.mode = this.$route.params.content.mode
      this.price = this.$route.params.content.price
      this.deposit = this.$route.params.content.deposit
      this.lease_time = this.$route.params.content.leaseTime / 86400
      this.stock = this.$route.params.content.stock
      this.categoryValue = this.categoryColumns[this.category_id - 1]
      this.modeValue = this.modeColumns[this.mode - 1]
      this.status = this.$route.params.content.status
      this.id = this.$route.params.content.id
    }
  }
}
</script>

<style scoped>
#addGoods {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f7f8fa;
  z-index: 200;
  overflow:scroll;
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

<template>
<div id="addGoods">
  <van-nav-bar title="添加商品"
               left-arrow
               @click-left="onClickLeft"/>
  <van-form @submit="onSubmit">
    <div style="margin-top: 5px">
      <van-field
        v-model="goods_name"
        name="商品名"
        label="商品名"
        placeholder="商品名"
        :rules="[{ required: true, message: '请输入商品名' }]"
      />
      <van-field
        v-model="intro"
        autosize
        label="商品描述"
        type="textarea"
        maxlength="200"
        placeholder="商品描述(200字以内)"
        show-word-limit
      />
      <van-field name="uploader" label="商品图片">
        <template #input>
          <van-uploader  :max-count="1" :after-read="afterRead">
            <van-image
              width="100"
              height="100"
              fit="content"
              :src="pic_url ? pic_url : 'https://img01.yzcdn.cn/vant/leaf.jpg'"
            />
          </van-uploader>
        </template>
      </van-field>
    </div>
    <div style="margin-top: 12px">
      <van-field
        readonly
        clickable
        name="categoryPicker"
        :value="categoryValue"
        label="商品分类"
        placeholder="请选择"
        @click="showCategoryPicker = true"
      />
      <van-popup v-model="showCategoryPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="categoryColumns"
          @confirm="categoryConfirm"
          @cancel="showCategoryPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="modePicker"
        :value="modeValue"
        label="租赁模式"
        placeholder="请选择"
        @click="showModePicker = true"
      />
      <van-popup v-model="showModePicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="modeColumns"
          @confirm="modeConfirm"
          @cancel="showModePicker = false"
        />
      </van-popup>
    </div>
    <div style="margin-top: 12px">
      <van-field
        v-model="price"
        name="价格"
        label="价格"
        placeholder="请输入价格"
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
        label="租赁时间"
        placeholder="请输入租赁时间"
        type="digit"
        :rules="[{ required: true, message: '请填写租赁时间' }]"
      />
      <van-field
        v-model="stock"
        name="库存"
        label="库存"
        placeholder="请输入库存"
        type="digit"
        :rules="[{ required: true, message: '请填写库存' }]"
      />

    </div>
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">提交商品</van-button>
    </div>
  </van-form>
</div>
</template>

<script>

export default {
  name: 'addGoods',
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
      stock: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    afterRead (file) {
      const _this = this
      const url = 'https://upload.qiniup.com/?token=' + this.$store.state.token// 获得七牛上传图片的地址和token
      const formData = new FormData()
      // 如果上传的数组
      if (file instanceof Array) {
        for (let i = 0; i < file.length; i++) {
          formData.append('file' + i, file[i].file)
        }
      } else {
        formData.append('file', file.file)// 必须是file.file，不然会报错
      }
      // 添加额外的参数
      formData.append('x:owner', _this.$store.state.login_name)
      // 添加请求头
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.$ajax.post(url, formData, config).then(res => {
        if (res.status === 200) {
          _this.$toast({ message: '上传成功!' })
          _this.pic_url = 'http://yuan619.xyz/' + res.data.hash
        }
      })
    },
    categoryConfirm (value, index) {
      this.category_id = index + 1
      this.categoryValue = value
      this.showCategoryPicker = false
    },
    modeConfirm (value, index) {
      this.mode = index + 1
      this.modeValue = value
      this.showModePicker = false
    },
    onSubmit (values) {
      const _this = this
      if (this.mode === 0 || this.category_id === 0 || this.intro === '') {
        this.$toast.fail('信息不完整')
      } else {
        this.$ajax.post('http://47.111.10.102:8085/goods/add', _this.$qs.stringify({
          category_id: _this.category_id,
          deposit: _this.deposit,
          goods_name: _this.goods_name,
          intro: _this.intro,
          lease_time: _this.lease_time * 3600 * 24,
          merchant_id: _this.$store.state.merchant_id,
          mode: _this.mode,
          pic_url: _this.pic_url,
          price: _this.price,
          stock: _this.stock,
          status: 0
        })).then(function (res) {
          _this.$toast.success('提交成功')
          _this.getGoodsList()
          _this.$router.back()
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    getGoodsList () {
      const _this = this
      this.$ajax.get('http://47.111.10.102:8085/goods/findAllByMerchantId', {
        params: {
          merchant_id: _this.$store.state.merchant_id
        }
      }).then(function (res) {
        if (res.data.port === '500') {
          _this.$store.state.allList = []
        } else {
          _this.$store.state.allList = res.data.data
        }
        // 清空数组
        _this.$store.state.downGoodsList = []
        _this.$store.state.checkGoodsList = []
        _this.$store.state.upGoodsList = []
        _this.$store.state.failGoodsList = []
        for (let i = 0; i < _this.$store.state.allList.length; i++) {
          const item = _this.$store.state.allList[i]
          if (item.status === -1) _this.$store.state.downGoodsList.push(item)
          else if (item.status === 0) _this.$store.state.checkGoodsList.push(item)
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
      this.$router.push('home')
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
}

</style>

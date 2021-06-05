import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    merchant_id: 4,
    login_name: '山水之间',
    login_number: '',
    balance: '',
    admin: '0',
    merchantAddress: [
      {
        address: '北京市北京市东城区aa',
        addressDetail: 'aa',
        areaCode: '110101',
        city: '北京市',
        country: '',
        county: '东城区',
        id: '1622794216140000',
        isDefault: false,
        name: 'xuyang',
        postalCode: '310000',
        province: '北京市',
        tel: '13018962765',
        merchant_id: '1'
      },
      {
        address: '北京市北京市东城区aa',
        addressDetail: 'aa',
        areaCode: '110101',
        city: '北京市',
        country: '',
        county: '东城区',
        id: '1622794216140001',
        isDefault: false,
        name: 'xuyang',
        postalCode: '310000',
        province: '北京市',
        tel: '13018962765',
        merchant_id: '2'
      }
    ]
  }
})

export default store

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
    merchantAddress: [],
    chosenAddressId: 0
  }
})

export default store

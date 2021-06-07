import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    merchant_id: '',
    login_name: '山水之间',
    login_number: '',
    balance: '',
    admin: '0',
    merchantAddress: [],
    chosenAddressId: '',
    token: 'P6Hy0f7PHEo0A13_ow3-0_OGvYdFibL8r4eEicIg:xejbK-eYyUtw2HLTNnGpxOx90T0=:eyJzY29wZSI6Inl1YW42MTkiLCJkZWFkbGluZSI6MTYyNTcyNDI1OX0='
  }
})

export default store

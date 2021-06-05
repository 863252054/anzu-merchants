import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import 'lib-flexible/flexible'
import axios from 'axios'
import qs from 'qs'
import { NavBar, Toast, Card, SubmitBar, Tabbar, TabbarItem, Col, Row, Icon, Cell, CellGroup, Image as VanImage, AddressList, AddressEdit, Empty, Button, PasswordInput, NumberKeyboard, Field, RadioGroup, Radio, Checkbox, CheckboxGroup, Tab, Tabs } from 'vant'

import '../src/assets/resetui.less'

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Field)
Vue.use(PasswordInput)
Vue.use(NumberKeyboard)
Vue.use(Button)
Vue.use(Empty)
Vue.use(AddressEdit)
Vue.use(AddressList)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Card)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(SubmitBar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false

new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')

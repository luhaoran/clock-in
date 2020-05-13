import Vue from 'vue'
import App from './App.vue'
import router from './router.config'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'


Vue.use(Vant);
Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://api.luhaoran.cn/"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

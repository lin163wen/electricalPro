// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import $ from 'jquery'
import App from './App'
import router from './router'
import 'lib-flexible'
import { Lazyload } from 'vant';
Vue.use(Lazyload);
Vue.config.productionTip = false
Vue.use(Vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

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
import Mui from 'vue-awesome-mui';
Vue.use(Mui);
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
var vConsole = new VConsole() // 初始化
Vue.config.productionTip = false
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(Lazyload);
Vue.config.productionTip = false
Vue.use(Vant)
import plusExtends from './utils/plusextends.js'
Vue.prototype.$plusExtends = plusExtends
import common from './utils/common.js'
Vue.prototype.common = common;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

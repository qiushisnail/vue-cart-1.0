import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// Vue.config.productionTip = false
Vue.prototype.$bus = new Vue(); // 开启一个新的vue实例，管理

new Vue({
  render: h => h(App),
}).$mount('#app')

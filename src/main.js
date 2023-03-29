import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import AeroTopUI from 'aerotop-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../static/theme/default/index.css'
// import G6 from '@antv/g6'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(AeroTopUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

// Ant Design
import 'ant-design-vue/dist/antd.css'
import antd from 'ant-design-vue'
Vue.use(antd)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

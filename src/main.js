import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
//自定义指令
import * as directives from '@/directive'

//过滤器
import * as filters from '@/filters'
//打印
import Print from 'vue-print-nb'
Vue.use(Print)
//mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
//国际化语音

import i18n from '@/i18n'

// 注册ElementUI
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

//注册自己封装的组件
import components from '@/components'
Vue.use(components)

//自定义指令图片加载失败
for (let key in directives) {
  Vue.directive(key, directives[key])
}
//时间过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App),
})

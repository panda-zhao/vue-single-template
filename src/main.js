import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import './utils/error-log' // 错误日志

// .use(Element, {
//   size: Cookies.get('size') || 'medium' // set element-ui default size
//   // locale: enLang // 如果使用中文，无需设置，请删除
// })

createApp(App).use(store).use(router).mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'ant-design-vue/dist/reset.css'
import './style.css'
import '@/assets/css/base.scss'

const app = createApp(App)

//全局注册图标

import * as Icons from '@ant-design/icons-vue'
for (const i in Icons) {
	app.component(i, Icons[i])
}
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(pinia)
app.use(Antd).mount('#app')

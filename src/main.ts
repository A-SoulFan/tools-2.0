import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.css'
import request from './request/request'

import Loading from '@/components/Loading/Loading'
import ShowErrorToast from '@/components/ShowErrorToast/ShowErrorToast'

const app = createApp(App)
app.use(router).use(Loading).use(ShowErrorToast).mount('#app')
app.config.globalProperties.$request = request

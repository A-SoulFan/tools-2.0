import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/css/reset.css"
import request from "./request/request"

import Loading from "@/components/Loading/Loading"
import Toast from "@/components/Toast/Toast"

const app = createApp(App)
app.use(router).use(Loading).use(Toast).mount("#app")
app.config.globalProperties.$request = request

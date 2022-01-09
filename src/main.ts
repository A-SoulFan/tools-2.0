import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./assets/css/reset.css"
import request from "./request/request"

import Toast from "@/components/Toast/Toast"

import VMdPreview from "@kangc/v-md-editor/lib/preview"
import "@kangc/v-md-editor/lib/style/preview.css"
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js"
import "@kangc/v-md-editor/lib/theme/style/github.css"

VMdPreview.use(githubTheme)

const app = createApp(App)
app.use(router).use(Toast).use(VMdPreview).mount("#app")
app.config.globalProperties.$request = request

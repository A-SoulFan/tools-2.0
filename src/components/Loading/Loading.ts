import type { App } from "vue"
import { createApp, reactive } from "vue"

import Loading from "@/components/Loading/Loading.vue"

const msg = reactive({
  loadingShow: false,
  title: ""
})
// let loadingShow = true;
const $loading = createApp(Loading, { msg }).mount(
  document.createElement("div")
)
const load = {
  // 控制显示loading的方法
  show(title = "拼命加载中...") {
    msg.loadingShow = true
    msg.title = title
    document.body.appendChild($loading.$el)
  },

  hide() {
    // 控制loading隐藏的方法
    msg.loadingShow = false
  }
}

export default {
  install(app: App): void {
    app.config.globalProperties.$loading = load
  },
  Loading: load
}

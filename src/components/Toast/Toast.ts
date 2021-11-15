import { createApp, reactive, App } from 'vue'

import Toast from '@/components/Toast/Toast.vue'

const msg = reactive({
  toastShow: false,
  title: '',
  errorToast: false,
})
// let loadingShow = true;
const $Toast = createApp(Toast, { msg }).mount(
  document.createElement('div'),
)
const toast = {
  // 控制显示loading的方法
  show(title: string) {
    msg.errorToast = false
    msg.toastShow = true
    msg.title = title
    setTimeout(() => {
      msg.toastShow = false
    }, 1.5 * 1000)
    document.body.appendChild($Toast.$el)
  },
  showError(title: string) {
    msg.errorToast = true
    msg.toastShow = true
    msg.title = title
    console.log(title)

    setTimeout(() => {
      msg.toastShow = false
    }, 2 * 1000)
    document.body.appendChild($Toast.$el)
  },
}

export default {
  install(app: App): void {
    app.config.globalProperties.$Toast = toast
  },
}

import { createApp, reactive, App } from 'vue'

import ShowErrorToast from '@/components/ShowErrorToast/ShowErrorToast.vue'

const msg = reactive({
  toastShow: false,
  title: '',
})
// let loadingShow = true;
const $ShowErrorToast = createApp(ShowErrorToast, { msg }).mount(
  document.createElement('div'),
)
const toast = {
  // 控制显示loading的方法
  show(title: string) {
    msg.toastShow = true
    msg.title = title
    setTimeout(() => {
      msg.toastShow = false
    }, 2 * 1000)
    document.body.appendChild($ShowErrorToast.$el)
  },
}

export default {
  install(app: App): void {
    app.config.globalProperties.$ShowErrorToast = toast
  },
}

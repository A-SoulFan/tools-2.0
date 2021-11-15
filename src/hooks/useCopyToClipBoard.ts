
import { createApp } from 'vue'
import App from '../App.vue'
import Toast from '@/components/Toast/Toast'
const app = createApp(App)
app.use(Toast)
// 辅助到剪切板
const copyToClipBoard = (text: string): void => {
  const copyElement = document.body.appendChild(
    document.createElement('textarea'),
  )
  copyElement.style.position = 'absolute'
  copyElement.style.left = '-9999px'
  copyElement.setAttribute('readonly', '')
  copyElement.value = text
  copyElement.select()
  document.execCommand('Copy')
  copyElement.parentElement?.removeChild(copyElement)
  app.config.globalProperties.$Toast.show('已复制到剪切板')
}

export default copyToClipBoard

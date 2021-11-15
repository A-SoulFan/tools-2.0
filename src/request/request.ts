import axios, { AxiosRequestConfig } from 'axios'
import { createApp } from 'vue'
import App from '../App.vue'
import Loading from '@/components/Loading/Loading'
import ShowErrorToast from '@/components/ShowErrorToast/ShowErrorToast'
const app = createApp(App)
app.use(Loading).use(ShowErrorToast)

const request: any = async(config: AxiosRequestConfig,
  loading = '拼命加载中...') => {
  const { url, data, params, method = 'get' } = config
  console.log(url, data, params, method, loading)
  console.log('url,data, params, method, loading')
  try {
    app.config.globalProperties.$loading.show(loading)
    const result: any = await axios({
      url,
      data,
      method,
      params,
    })
    if (result.status === 200) {
      if (result.data.code === 0) {
        app.config.globalProperties.$loading.hide()
        return result.data.data
      }
      else {
        app.config.globalProperties.$loading.hide()
        return Promise.reject(result.data.message)
      }
    }

    console.log(result, 'result')
    app.config.globalProperties.$loading.hide()
    return result.data.data
  }
  catch (error) {
    app.config.globalProperties.$loading.hide()
    app.config.globalProperties.$ShowErrorToast.show(error)
  }
}
export default request

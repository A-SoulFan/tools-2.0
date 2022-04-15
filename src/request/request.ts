import type { AxiosRequestConfig } from "axios"
import axios from "axios"
import Loading from "@/components/Loading/Loading"

const request = async (config: AxiosRequestConfig,
  loadingText = "拼命加载中...") => {
  const { url, data, params, method = "get",headers } = config
  console.log(url, data, params, method, loadingText)
  console.log("url,data, params, method, loading")
  try {
    Loading.Loading.show(loadingText)
    const result = await axios({
      url,
      data,
      method,
      params,
      headers
    })
    if (result.status === 200) {
      if (result.data.code === 0) {
        Loading.Loading.hide()
        //Fit QASearching response body(||result.data.Data)
        return result.data.data||result.data.Data
      } else {
        Loading.Loading.hide()
        //Fit QASearching response body(||result.data.status)
        return Promise.reject(result.data.message||result.data.status)
      }
    }

    console.log(result, "result")
    Loading.Loading.hide()
    return result.data.data
  } catch (error) {
    Loading.Loading.hide()
    throw error
  }
}
export default request

import axios, { AxiosRequestConfig } from "axios";
import Loading from "@/components/Loading/Loading";
import { createApp } from "vue";
import App from "../App.vue";
const app = createApp(App);
app.use(Loading);

const request: any = async (config: AxiosRequestConfig,
  loading = "拼命加载中...",) => {
  const { url, data, params, method = "get" } = config
  console.log(url, data, params, method, loading);
  console.log("url,data, params, method, loading");
  try {
    app.config.globalProperties.$loading.show(loading);
    const result: any = await axios({
      url: url,
      data,
      method,
      params,
    });

    if (result.status === 200) {
      if (result.data.code === 0) {
        app.config.globalProperties.$loading.hide();
        return result.data.data;
      } else {
        // TODO: 错误浮窗
        console.log(result.data.message);
      }
    }

    console.log(result, "result");
    app.config.globalProperties.$loading.hide();
    return result.data.data;
  } catch (error) {
    app.config.globalProperties.$loading.hide();

    console.log(error);
  }
  // debugger;
};

// const request = axios.create({
//   // 设置baseUr地址
//   // baseURL: '/api',
//   // 定义统一的请求头部
//   // headers: {
//   //     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//   // },
//   // 配置请求超时时间
//   timeout: 20000,
// });
// 增加响应拦截
// request.interceptors.response.use(
//   function (response) {
//     // console.log(response);

//     const { data, code, message } = response.data;

//     if (code == "0") {
//       return data;
//     } else {
//       return Promise.reject(message);
//     }
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
export default request;

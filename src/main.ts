import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/reset.css";
import request from "./request/request";

import Loading from "./hooks/Loading";

const app = createApp(App);
app.use(router).use(Loading).mount("#app");
app.config.globalProperties.$request = request;

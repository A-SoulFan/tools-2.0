import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/reset.css";
import request from "./request/request";

const app = createApp(App);
app.use(router).mount("#app");
app.config.globalProperties.$request = request;

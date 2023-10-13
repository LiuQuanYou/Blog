import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import "ant-design-vue/dist/reset.css";
import "./style.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router)
app.use(pinia)
app.use(Antd).mount("#app");

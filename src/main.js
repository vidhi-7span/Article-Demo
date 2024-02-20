import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VayuVue from "vayu-vue";
import { createVfm } from "vue-final-modal";

const vfm = createVfm();

const app = createApp(App);
app.use(vfm);
app.use(VayuVue);
app.provide("global", app.config.globalProperties);
app.mount("#app");

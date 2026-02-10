import { createApp } from 'vue';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';
import pinia from "./utils/pinia.ts";
import vuetify from "./utils/vuetify.ts";
import "./assets/style.css";

const app = createApp(App);

app.use(pinia).use(vuetify).mount('#app')

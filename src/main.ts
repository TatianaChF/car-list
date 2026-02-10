import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css';
import pinia from "./utils/pinia.ts";
import vuetify from "./utils/vuetify.ts";

const app = createApp(App);

app.use(pinia).use(vuetify).mount('#app')

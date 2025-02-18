import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App).use(ElementPlus)
app.mount('#app')

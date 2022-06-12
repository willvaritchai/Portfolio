import { createApp } from 'vue'
import App from './App.vue'
import router from'./router'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
createApp(App).use(router).use(AOS.init(
    {offset: 200, duration: 900}
)).mount('#app')

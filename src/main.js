import { createApp } from 'vue'
import { createPinia } from 'pinia'
import route from './pages'
import './style.css'
import App from './App.vue'

let app = createApp(App);
app.use(createPinia())
app.use(route)
app.mount('#app')

import cjn from '../util'
console.log(cjn(234))
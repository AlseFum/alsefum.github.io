import { createApp } from 'vue'
import { createPinia } from 'pinia'
import route from './pages'
import './style.css'
import App from './App.vue'

let app = createApp(App);
app.use(createPinia())
app.use(route)
app.mount('#app')

import { cjn } from './util'
console.log(cjn({ let1:{"&let":89,as:"ass"},ref2:{"&ref":"89",value:{b:67}}}, { useString: true }))
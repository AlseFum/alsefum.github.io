import { createApp } from 'vue'
import { createPinia } from 'pinia'
import route from './pages'
import './style.css'
import './some.css'
import App from './App.vue'
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}
let app = createApp(App);
app.use(createPinia())
app.use(route)
app.mount('#app')
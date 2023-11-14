import { createApp } from 'vue'
import { createPinia } from 'pinia'
import route from './pages'
import './style.css'
import App from './App.vue'

let app = createApp(App);
app.use(createPinia())
app.use(route)
app.mount('#app')

import { cjson } from './util'
0&&console.log(cjson.parse({
    dear: 342, beam:
    {
        "&group": [
            ["&type", "fn"]
        ],
        sub: [{
            body: "return 'shit'"
        }, {
            params: ["a"],
            body: "return piss"
        }]
    },"exec%fn":["return shit"]
}))

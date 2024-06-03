import { createRouter, createWebHashHistory } from "vue-router";
import home from './home.vue'
import dice from './dice.vue'
//import edifier from './edifier/main.vue'
export default createRouter({
    routes: [
        { path: "/", component: home, name: "Home" },
        { path: "/dice", component: dice, name: "Dice" },
      //  { path: "/edifier", component: edifier, name: "Edifier" }
    ],
    history: createWebHashHistory()
})
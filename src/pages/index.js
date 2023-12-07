import { createRouter, createWebHashHistory } from "vue-router";
import idle from '../idle/idle.vue'
import dice from './dice.vue'
export default createRouter({
    routes: [
        {path: "/dice", component: dice, name: "Dice"},
        {path: "/idle", component: idle, name: "Idle"}],
    history: createWebHashHistory()
})
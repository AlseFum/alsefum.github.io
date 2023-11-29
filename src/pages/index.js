import { createRouter, createWebHashHistory } from "vue-router";
import emulator from '../emulation/emulator.vue'
import idle from '../idle/idle.vue'
import dice from './dice.vue'
export default createRouter({
    routes: [
        { path: "/emulator", component: emulator, name: "Emulator" },
        {path: "/dice", component: dice, name: "Dice"},
        {path: "/idle", component: idle, name: "Idle"}],
    history: createWebHashHistory()
})
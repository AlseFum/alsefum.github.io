import { createRouter, createWebHashHistory } from "vue-router";

import dice from './dice.vue'
import idleSim from '../idle/idlesim.vue'
 import emulator from '../emulation/emulator.vue'
import n from '../idle/n.vue'
export default createRouter({
    routes: [
        { path: "/dice", component: dice, name: "Dice" },
        {path:"/n",component:n,name:"N"},
         { path: "/emulator", component: emulator, name: "Emulator" },
        { path: "/idlesim", component: idleSim, name: "IdleSim" }
    ],
    history: createWebHashHistory()
})
import { createRouter, createWebHashHistory } from "vue-router";

import dice from './dice.vue'
//import idleSim from '../idle/idleSim.vue'
// import emulator from '../emulation/emulator.vue'
export default createRouter({
    routes: [
        { path: "/dice", component: dice, name: "Dice" },
        // { path: "/emulator", component: emulator, name: "Emulator" },
    //    { path: "/idlesim", component: idleSim, name: "IdleSim" }
    ],
    history: createWebHashHistory()
})
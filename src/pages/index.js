import { createRouter,createWebHashHistory } from "vue-router";
import idle from './idle.vue'
import emulator     from './emulator.vue'
import dice from './dice.vue'
import display from './display.vue'
export default createRouter({
    routes:[
        {path:"/idle",component:idle,name:"Idle"},
        {path:"/emulator",component:emulator,name:"Emulator"},
    {
        path:"/dice",component:dice,name:"Dice"
    },{
        path:"/display",component:display,name:"Display"
    }],
    history:createWebHashHistory()
})
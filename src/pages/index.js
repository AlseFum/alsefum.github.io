import { createRouter,createWebHashHistory } from "vue-router";
import idle from './idle.vue'
import emulator     from './emulator.vue'
export default createRouter({
    routes:[
        {path:"/idle",component:idle,name:"Idle"},
        {path:"/emulator",component:emulator,name:"Emulator"}],
    history:createWebHashHistory()
})
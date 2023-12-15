<script setup>
//@ts-ignore
import iswv from './isWorldView.vue'
import { World } from './statics'
import { knightsim,worldTemplates } from './exp';
//@ts-ignore
import isStore from './isStore.js'
//@ts-ignore
import {ref,onMounted,onUnmounted} from 'vue'
const newworldselection=ref(worldTemplates?.[0]);
const store = isStore();
store.setWorld("exp",knightsim.new())
store.setWorld("lips", knightsim.new())
function tsw(n,v){
   
    if(n ===''||n===undefined){alert("空");return;}
    if(store.getWorld(n)){alert("已经存在");return;}
    store.setWorld(n,v);
}
function destructWorld(world){
    let sd = store.worlds;
    for (const key in sd) {
        if (sd[key] === world) {
            delete sd[key];
            break;
        }
    }
}
import gs from '../storage'
onMounted(()=>gs().title="IdleSim")
onUnmounted(()=>gs().title="")
</script>
<template>

    <div>
        <select v-model="newworldselection">
            <option v-for="wt in worldTemplates" :value="wt">{{ wt.title }}</option>
        </select>
        <input type="text" v-model="newworldname"><button @click="tsw(newworldname,newworldselection.new())">NEW</button></div>
    <div class="container">
        <iswv v-for="world in store.worlds" :world="world" @destruct="destructWorld(world)">{{ world }}</iswv>
    <br>
    <br>

    </div>s
</template>
<style scoped>
.container {
    height: 90vh;
    margin: 10px;
    overflow: auto;
    padding-bottom: 40px;
    text-align:left;
    padding-left:20px;
}
</style>
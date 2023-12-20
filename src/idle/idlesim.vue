<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import iswv from './isWorldView.vue'
import edit from './edit.vue'

import isStore from './isStore.js'
const store = isStore();


import { knightsim, worldTemplates } from './exp';
const newworldselection = ref(worldTemplates?.[0]);
store.setWorld("exp", knightsim.new({name:"exp"}))
store.setWorld("lips", knightsim.new({name:"lips"}))
function tsw(n, v) {
    if (store.getWorld(n)) { alert("已经存在"); return; }
    store.setWorld(n, v);
}
function destructWorld(world) {
    let sd = store.worlds;
    for (const key in sd) {
        if (sd[key] === world) {
            delete sd[key];
            break;
        }
    }
}
import gs from '../storage'
onMounted(() => gs().title = "IdleSim")
onUnmounted(() => gs().title = "")
</script>
<template>
    <div class="wrapper" @click="store.entityOnEdit=null">
    <div style="flex-grow:3;">
        <select v-model="newworldselection" style="height:18px;">
            <option v-for="wt in worldTemplates" :value="wt">{{ wt.title }}</option>
        </select>
        <input type="text" v-model="newworldname" style="height:18px;"><button @click="tsw(newworldname, newworldselection.new({name:newworldname}))" >NEW</button>

        <div class="container">
            <iswv v-for="world in store.worlds" :world="world" @destruct="destructWorld(world)">{{ world }}</iswv>
            <br><br>
        </div>
    </div>
    <div style="flex-grow:0;min-width: 3px;max-width: 40%;">
        <edit/>
        </div>
</div>
</template>
<style scoped>
.wrapper{
    display:flex;
    flex-direction: row;
}
.container {
    height: 90vh;
    margin: 10px;
    overflow: auto;
    margin-bottom: 40px;
    text-align: left;
    padding-left: 20px;
}
.container::-webkit-scrollbar {
    width: 0.5em;
}

/* div::-webkit-scrollbar-track {
  
} */

.container::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 0.5em;
}
</style>
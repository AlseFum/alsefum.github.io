<script setup>

// import iswv from './isWorldView.vue'
// import { World } from './statics'
// import { knightsim, worldTemplates } from './exp';
// import isStore from './isStore.js'
// import { ref, onMounted, onUnmounted } from 'vue'
// const newworldselection = ref(worldTemplates?.[0]);
// const store = isStore();
// store.setWorld("exp", knightsim.new())
// store.setWorld("lips", knightsim.new())
// function tsw(n, v) {
//     //  if(n ===''||n===undefined){alert("空");return;}
//     if (store.getWorld(n)) { alert("已经存在"); return; }
//     store.setWorld(n, v);
// }
// function destructWorld(world) {
//     let sd = store.worlds;
//     for (const key in sd) {
//         if (sd[key] === world) {
//             delete sd[key];
//             break;
//         }
//     }
// }
// import gs from '../storage'
// onMounted(() => gs().title = "IdleSim")
// onUnmounted(() => gs().title = "")
// const sidefold=ref(false)
</script>
<template>
    <!-- <div class="wrapper">
    <div style="flex-grow:3;">
        <select v-model="newworldselection">
            <option v-for="wt in worldTemplates" :value="wt">{{ wt.title }}</option>
        </select>
        <input type="text" v-model="newworldname"><button @click="tsw(newworldname, newworldselection.new({name:newworldname}))">NEW</button>

        <div class="container">
            <iswv v-for="world in store.worlds" :world="world" @destruct="destructWorld(world)">{{ world }}</iswv>
            <br>
            <br>
        </div>
    </div>
    <div style="flex-grow:0;min-width: 3px;" :style="{flexGrow:sidefold?1:0}">
        <button @click="sidefold=!sidefold">detail</button>
        </div>
</div> -->
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
    padding-bottom: 40px;
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
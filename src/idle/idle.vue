<script setup>
import { Idle, Block, BlockFn, BlockPd, Material } from './index.js'
import { ref, computed, onMounted, shallowReactive } from 'vue'
let ii = shallowReactive(new Idle());
onMounted(() => {
    setInterval(() => ii.tick(), 1000);
})
function find(n, s) {
    for (let i of n) {
        if (i.label === s) return i;
    }
    return false;
}
function craft(str) {

    let recipe = find(ii.materialList, str).recipe;
    console.log(recipe);
    for (let i of recipe) {
        if (ii.materialAmount - i[1] < 0) return false;
    }

    ii.materialAmount.set(str, ii.materialAmount.get(str) + 1)
    for (let i of recipe) {
        ii.materialAmount.set(i[0], ii.materialAmount.get(i[0]) - i[1])
    }
}
</script>
<template>
    <h1>{{ ii.basicPoint }}</h1>
    
    
    <button @click="ii.click()">click</button>
    <input type="text" v-model="newtype">
    <button @click="ii.newBlockPd(newtype)">new</button>
    blocks:<br />
    <div class="blockArea">
        <div v-for="sb in ii.blocks" class="block">
            <div v-if="sb.type == Block.produce">
                <span style="font-size: 16pt;font-weight:500;">{{ sb.label ?? sb.materialType }}</span><br />
                <span style="font-size: 12pt;font-weight:500;">{{ sb.tickAmount }}/tick</span>
                <!-- <span v-for="i in sb.tags">{{ i }}</span> -->
                
            </div>
            <div v-if="sb.type==Block.functional">
            nihao</div>
        </div>

    </div>
    <div class="despot">库存：<div v-for="ima in ii.materialAmount">{{ ima[0] }}:{{ ima[1] }}</div>
    </div>

    <div v-for="iml in ii.materialList">{{ iml.label }}&lt;-<span v-for="r in iml.recipe">{{ r[0] }},{{ r[1]
    }}</span><button @click="craft(iml.label)">craft</button></div>
</template>
<style scoped>
.blockArea {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
    padding:30px 30px;
}

.block {
    border: 1px var(--accent) solid;
    padding: 10px;
    max-width: 200px;
}

.despot {
    border: 1px var(--accent) solid;
    max-width: 400px;
    margin: 0 auto;
}</style>
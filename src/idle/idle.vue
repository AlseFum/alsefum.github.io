<script setup>
import {Idle,Block,BlockFn,BlockPd,Material} from './index.js'
import {ref,computed,onMounted, shallowReactive} from 'vue'
let ii =shallowReactive( new Idle());
onMounted(()=>setInterval(()=>ii.value.tick(),1000))
function find(n,s){
    console.log(n)
    for(let i of n){
        if(i.label === s)return i;
    }
    return false;
}
function craft(str){
    
    let recipe=find(ii.value.materialList,str).recipe;
    console.log(recipe);
    for(let i of recipe){
        if(ii.materialAmount-i[1]<0)return false;
    }
    
    ii.value.materialAmount.set(str,ii.value.materialAmount.get(str)+1)
    for(let i of recipe){
        ii.value.materialAmount.set(i[0],ii.value.materialAmount.get(i[0])-i[1])
    }
}
</script>
<template>
{{ ii.basicPoint }}<br/><button @click="ii.click()">click</button><button @click="ii.newBlockPd">new</button>
<div v-for="sb in ii.blocks">{{ sb }}asef</div>
<div v-for="ima in ii.materialAmount">{{ ima }}</div>
<div v-for="iml in ii.materialList">{{ iml.label }}&lt;-<span v-for="r in iml.recipe">{{ r[0] }},{{ r[1] }}</span><button @click="craft(iml.label)">craft</button></div>
</template>
<style scoped>

</style>
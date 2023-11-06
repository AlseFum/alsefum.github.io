<script setup>
import { ref } from 'vue'
import diceSingleTag from '../components/diceSingle.vue'
let diceGroup=[
    {count:2,max:6}
]
let output=ref(0);
function roll(){
    let n=0;
    diceGroup.forEach(d=>{
        for(let ii=0;ii<d.count;ii++){
            n+=Math.floor(Math.random()*d.max)+1;
        }
    })
    output.value=n;
}
</script>
<template>
    <ul>
        <li v-for="ds in diceGroup" ><diceSingleTag  :single="ds" >{{ ds.count }}d{{ ds.max }}</diceSingleTag></li>

    </ul>
<div class="screen" @click="roll">{{output}}</div>
</template>
<style scoped>
.screen{
    min-width:300px;
    min-height: 300px;
    margin:0 auto;
    background-color: var(--primary);
}
ul{
    list-style-type: none;
}
</style>
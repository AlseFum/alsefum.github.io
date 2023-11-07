<script setup>
import { ref } from 'vue'
import diceSingleTag from '../components/diceSingle.vue'
let diceGroup = ref([
    { count: 2, max: 6 }
])
let output = ref(0);
let settingMax = ref(4);
function roll() {
    let n = 0;
    diceGroup.value.forEach(d => {
        for (let ii = 0; ii < d.count; ii++) {
            n += Math.floor(Math.random() * d.max) + 1;
        }
    })
    output.value = n;
    results.value.unshift(n);
    if(results.value.length>8)results.value.pop();
}
let results=ref([])

function newdice() {
    console.log(settingMax); if (settingMax.value > 0)
        diceGroup.value.push({ count: 1, max: settingMax })
}
</script>
<template>
    <section >
       <div class="dices">
            <diceSingleTag   v-for="ds in diceGroup" :single="ds"/>
        </div>
            <input type="number" v-model="settingMax" min="0" /><button @click="newdice()">NEW</button>
        
    </section>
    <div class="screen" @click="roll">
        <span style="font-size: 48pt;text-shadow: 0px 3px 3px rgba(255,255,255,0.5);">{{ output }}</span>
    </div>
    <section class="ul"><div v-for="r,i in results" >{{ r }}</div></section>
</template>
<style scoped>
.screen {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    background-color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
section .dices{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width:80%;
    margin:0 auto;
}
section.ul {
    list-style-type: none;
    max-width: 200px;
    margin:0 auto;
    margin-top:20px;
    transition:translate(-50%,-50%);
}
section.dices{
    display:flex;
    justify-items: center;
    gap: 3px 3px;
}</style>
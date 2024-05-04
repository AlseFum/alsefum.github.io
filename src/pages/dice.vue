<script setup>
import useStore from '../storage'
import { ref } from 'vue'
let store=useStore();
let diceGroup = ref([
    { count: 2, max: 6 }
])
store.diceGroup=diceGroup;



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
    if (results.value.length > 8) results.value.pop();
}
let results = ref([])

function newdice() {
    if (settingMax.value > 0) {
        for (let ii of diceGroup.value) {
            if (ii.max == settingMax.value) {
                
                ii.count += 1;
                
                return;
            }
        }
        diceGroup.value.push({ count: 1, max: settingMax.value })
    }
}
</script>
<template>
    <section>
        <div class="dices">
           <div v-for="d in diceGroup" >
            <button @click="d.count+=1;">+</button>
            <button @click="if(d.count>1)d.count-=1;else diceGroup.splice(diceGroup.indexOf(d),1)">-</button>
            {{ d.count }}d {{ d.max }}</div>
        </div>
        <input type="number" v-model="settingMax" min="0" /><button @click="newdice()">NEW</button>

    </section>
    <div class="screen" @click="roll">
        <span style="user-select: none;font-size: 48pt;text-shadow: 0px 3px 3px rgba(255,255,255,0.5);">{{ output }}</span>
    </div>
    <section class="ul">
        <div v-for="r, i in results" :style="{ fontSize: 28 - i * 2 + 'px' }">{{ r }}</div>
    </section>
</template>
<style scoped>
.screen {
    --size:300px;
    width: var(--size);
    height: var(--size);
    margin: 0 auto;
    background-color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

    clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 100% 90%, 90% 100%, 10% 100%, 0% 90%,0 10%);
}

section .dices {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 3px 3px;
    max-width: 80%;
    margin: 0 auto;
    padding:10px;
    
}

section.ul {
    list-style-type: none;
    max-width: 200px;
    margin: 0 auto;
    margin-top: 20px;
    transition: translate(-50%, -50%);
}</style>
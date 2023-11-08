<script setup>
import useStore from '../storage'
let store=useStore();
let diceGroup = ref([
    { count: 2, max: 6 }
])
store.diceGroup=diceGroup;
import { ref } from 'vue'


let output = ref(0);
let settingMax = ref(4);
let refresher=ref(0)
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
    console.log(settingMax.value, diceGroup.value);
    if (settingMax.value > 0) {
        for (let ii of diceGroup.value) {
            if (ii.max == settingMax.value) {
                
                ii.count += 1;
                console.log("old plus",ii)
                return;
            }
        }
        diceGroup.value.push({ count: 1, max: settingMax.value })
    }
    refresher.value+=1;
    diceGroup.value.sort((a, b) => a.max - b.max);
}
</script>
<template>
    <section>
        <div class="dices">
            <!-- <diceSingleTag v-for="ds in diceGroup" :single="ds" :refresher="refresher" /> -->
        </div>
        <input type="number" v-model="settingMax" min="0" /><button @click="newdice()">NEW</button>

    </section>
    <div class="screen" @click="roll">
        <span style="font-size: 48pt;text-shadow: 0px 3px 3px rgba(255,255,255,0.5);">{{ output }}</span>
    </div>
    <section class="ul">
        <div v-for="r, i in results" :style="{ fontSize: 28 - i * 2 + 'px' }">{{ r }}</div>
    </section>
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

section .dices {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-width: 80%;
    margin: 0 auto;
}

section.ul {
    list-style-type: none;
    max-width: 200px;
    margin: 0 auto;
    margin-top: 20px;
    transition: translate(-50%, -50%);
}

section.dices {
    display: flex;
    justify-items: center;
    gap: 3px 3px;
}</style>
<script setup>
import { ref } from 'vue'
import diceSingleTag from '../components/diceSingle.vue'
let diceGroup = ref([
    { count: 2, max: 6 }
])
let output = ref(0);
let settingMax = ref(0);
function roll() {
    let n = 0;
    diceGroup.value.forEach(d => {
        for (let ii = 0; ii < d.count; ii++) {
            n += Math.floor(Math.random() * d.max) + 1;
        }
    })
    output.value = n;
    results.value.push(n);
}
let results=ref([])

function newdice() {
    console.log(settingMax); if (settingMax.value > 0)
        diceGroup.value.push({ count: 1, max: settingMax })
}
</script>
<template>
    <ul>
        <li v-for="ds in diceGroup">
            <diceSingleTag :single="ds">{{ ds.count }}d{{ ds.max }}</diceSingleTag>
        </li>
        <li>
            <input type="number" v-model="settingMax" min="0" /><button @click="newdice()"></button>
        </li>
    </ul>
    <div class="screen" @click="roll">
        <span style="font-size: 36pt;text-shadow: 0px 3px 3px rgba(255,255,255,0.5);">{{ output }}</span>
    </div>
    <ul><li v-for="r in results">{{ r }}</li></ul>
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

ul {
    list-style-type: none;
}</style>
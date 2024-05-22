<script setup>
import { ref, onMounted, computed } from "vue";
import { attempt, Game } from "./lib";
import {daten } from "./rule1.js";
const game = ref(new Game(daten))
import useStore from '../../storage/index'
const store = useStore()
const curLoc = computed(() => {
    let n = game.value.map_record.get(game.value.curKey);
    store.title = n.label ?? n.id;
    return n;
})

const auto = ref(false)
const progress = ref(0)
import { throttle } from "./lib";
onMounted(() => {
    setInterval(() => {
        if (auto.value) progress.value++
        if (progress.value > 100) {
            progress.value = 0;
            game.value.goto(
                curLoc.value.options.random(),
                { lastLoc: curLoc.value, game: game.value })
        }
    }, 10)
})
import sbtn from '../../components/textbutton.vue'


const sbc=throttle(()=>{auto.value=!auto.value},200)
</script>
<template>

    <div class="edifier-container">

        <section>
            <p v-for="i in attempt(curLoc.options)"
            @click="() => game.goto(i.value??i, { lastLoc: curLoc })">
                ->{{ i.label ?? i }}
            </p>
            <p><sbtn @click="sbc">{{ progress }}% 自动</sbtn></p>
        </section>


        <section>
            <p style="display:inline">
                <li v-for="w in attempt(curLoc.watch)">
                    {{ curLoc[w.prop ?? w] }} {{ w.symbol ?? "" }}
                </li>
            </p>
            {{curLoc.label}}<br/>
            
            {{ attempt(curLoc.description) }}

            {{ game.map_record.size }}
        </section>
    </div>
</template>
<style scoped>
.edifier-container {
    display: flex;
    justify-content: stretch;
}

.edifier-container p {
    text-align: left;
    padding-left: 30px;
}

.edifier-container p li {
    list-style-type: none;
}

.edifier-container section {
    margin: 20px;
    padding:10px;
    min-width: 180px;
    border: 1px white solid;
}
</style>
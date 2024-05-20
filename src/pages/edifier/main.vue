<script setup>
import { ref, onMounted, computed } from "vue";
import { attempt, Game } from "./lib";
const game = ref(new Game())
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
            game.value.goto(curLoc.value.options.random(), curLoc.value, game)

        }
    }, 10)
})
</script>
<template>
    {{ curLoc.name }}<br />
    <div class="edifier-container">
{{ game.map_record.size }}
        <section>
            <p v-for="i in attempt(curLoc.options)" @click="() => game.goto(i, curLoc, this)">
                ->{{ i.label??i }}
            </p>
            <p>{{ progress }}%<button @click="auto = !auto" style="float:right">自动:{{ auto }}</button></p>
        </section>


        <section>
            <p style="display:inline">
                <li v-for="w in attempt(curLoc.watch)">{{ curLoc[w] }}</li>
            </p>

            plot:{{ throttle(2000,()=>attempt({ $$: "rand", max: 10 }) )()}}<br />
            {{ attempt(curLoc.description) }}
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

section {
    margin: 20px;
    min-width:180px;border:1px white solid;
}
</style>
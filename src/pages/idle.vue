<script setup>
import { onMounted, ref } from 'vue'
import { cjson } from '../util'
let content = ref("")
let point = ref(0)
let iron = ref(0)
let externalPath = ref("")
function draw() {

    if (externalPath.value.startsWith("http")) {
        fetch(externalPath.value).then(i => i.json()).then(data => {
            console.log(data)
            content.value = cjson.parse(data)
        })
    } else {
        content.value = cjson.parse({
            ["&random"]: true, items: ["OK"]
        }) + "ddd"
    }
}
onMounted(() => {
    console.log()
})
</script>
<template>
    <span @click="point++">
        idleHere{{ point }}</span>{{ iron }}
    <button @click="iron += 1; point -= 5;"></button><br />

    <input type="text" v-model.value="externalPath" />

    {{ content }}
    <button @click="draw">draw</button>

    或许要做个deck
    或许有更精细的
</template>
<style scoped></style>
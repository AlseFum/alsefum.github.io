<script setup>
import {ref} from 'vue';
const generation=ref("ipsum")
let p=defineProps(
    ["generator"]
)
const defaultGenerator=ref(function(){
    return Math.random()
})
function atclick(){
    generation.value=(p?.generator.value??defaultGenerator.value)()
}
</script>
<template>
<div class="ipsumblock" @click="atclick">
    {{ generation }}
</div>
</template>
<style scoped>
.ipsumblock{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
</style>
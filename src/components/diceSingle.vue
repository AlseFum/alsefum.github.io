<script setup>
let props = defineProps(['single'])
import { ref } from 'vue'
let count = ref(props.single.count);
let max = ref(props.single.max);
function plus() {
    count.value++;
    props.single.count += 1;
}
function sub() {
    count.value--;
    props.single.count -= 1;
}
</script>
<template>
    <div class="single" v-if="count > 0"><button @click="plus">+</button><button @click="sub">-</button>
        {{ count }}d{{ max }} 
    </div>
</template>
<style scoped>
.single {
    display: inline-block;
    background-color: var(--accent);
}
</style>
<script setup>
import {ref} from 'vue'
let point=ref(BigInt(0))
</script>
<template><span @click="point++">
idleHere{{ point }}</span>
</template>
<style scoped>

</style>
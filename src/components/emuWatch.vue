<script setup>
let props=defineProps([
    "pkey","value"
])
</script>
<template>
{{ props.pkey }}:{{ props.value }}<br/>
</template>
<style scoped>

</style>
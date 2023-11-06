<script setup>

</script>
<template>
<button v-for=" i in curEmuInst?.currentScene?.inputs" @click="i.exec(curEmuInst.context,curEmuInst)">{{ i.label }}</button>
</template>
<style scoped>

</style>
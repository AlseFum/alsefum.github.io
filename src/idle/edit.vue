<script setup>
import {computed} from 'vue'
import isStore from './isStore';
const store=isStore();
const cure=computed(()=>store.entityOnEdit);
</script>
<template>

<div v-for="(va,ind) in cure">{{ind }}:{{ va }} <input type="text" v-model="cure[ind]"></div>

</template>
<style scoped>

</style>
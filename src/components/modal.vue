<script setup>
import {ref,onMounted}from 'vue'
let props = defineProps(["active"])
let isActive=ref(props.active) ;
function trigger(){
    isActive.value=!isActive.value;
}
onMounted(()=>console.log(isActive.value))
defineExpose({trigger})
</script>
<template>
    <div v-if="isActive" class="shadow" @click="() => { isActive = false; }">
        <div v-if="isActive" class="modal" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.shadow {
    z-index: 2;
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    width:100vw;
    height:100vh;
}

.modal {
    z-index: 3;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
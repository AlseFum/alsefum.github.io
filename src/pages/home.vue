<script setup>
import randomt from '../components/rt.vue'
//@ts-ignore
import selecte from '../components/select.vue'
</script>
<template>
    <randomt></randomt>

</template>
<style scoped>
.exp {
    width: 300px;
    height: 180px;
    position: absolute;
    background-color: blueviolet;
    -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */
}
</style>
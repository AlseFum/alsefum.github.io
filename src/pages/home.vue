<script setup>
import { ref,onMounted } from 'vue'
import ipsum from '../components/ipsum.vue';
const result = ref("")
function ips() {return "ammmm"}
</script>
<template>
    <ipsum :generator="ips" />
    <div style="margin:0 auto;width:200px;
    height:50px;display: flex;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    justify-content: center;align-items: center;">
        <div style="height:100%;width:40%;display: flex;justify-content: center;align-items: center;"> {{ result }}
        </div>
        <button style="background-color: transparent;color:white;height:100%;width:60%"
            @click="result = ['阴', '阳'][Math.floor(Math.random() * 2)]">抛硬币</button>
    </div>
</template>
<style scoped></style>
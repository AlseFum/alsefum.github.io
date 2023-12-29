<script setup>
import { onMounted, ref } from 'vue'
const content = ref("nihao")
function generateRandomString(length) {
        var randomString = '';

        for (var i = 0; i < length; i++) {
            var randomCharCode = Math.floor(Math.random() * (5872 -0x16A0)) + 0x16A0;
            randomString += String.fromCharCode(randomCharCode);
        }
        return randomString;
    }

    function makeEqualLength(originalString, targetLength) {
        var randomString = generateRandomString(targetLength);

        while (randomString.length < targetLength) {
            randomString = generateRandomString(targetLength);
        }

        return randomString;
    }
onMounted(() => {

    setInterval(()=>{    content.value=makeEqualLength("", 10)
    },1000)
    // 示例用法
    
})
</script>
<template>
    {{ content }}
</template>
<style scoped></style>
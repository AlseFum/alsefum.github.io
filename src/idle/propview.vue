<script setup>
//先写进来，样式不行用deep
const props = defineProps(["prop", "obj","stable"])
import { ref } from 'vue'
const obj = ref(props.obj)
const prop = ref(props.prop)
const mode = ref(0)//0是默认显示，1是普通template，2是条件template，3是render
if (prop.value.render) {
    mode.value = 3
}
function useTemplate(t, o) {

}
function useContiTemplate(t, o) {

}
</script>
<template>
    <span v-if="mode === 0">【{{ props.prop }}:{{ obj[props.prop] ?? prop?.default ?? "_" }}】</span>
    <span v-if="mode === 1">{{ useTemplate(prop.template, obj) }}</span>
    <span v-if="mode === 3" v-html="prop.render(obj)"></span>
</template>
<style scoped>
span
{
    display: inline-block;backdrop-filter: brightness(20%);gap:5px;background-color: grey;
}</style>
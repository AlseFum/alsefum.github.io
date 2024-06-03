<script setup>
import {ref,onMounted} from "vue";
import expand from './expand.js'

const props=defineProps(['sub'])
const content=props.sub??{
    label:"aef"
}
const children=ref(expand(content) ?? content);
const expanded=ref(false)
console.log(children)
function regene(){
    children.value=expand(content) ?? content;
    expanded.value=false;
    Promise.resolve().then(()=>expanded.value=true);
}
</script>
<template>
<div>
    {{ content?.label??"nihao" }} <button @click="expanded=!expanded">
    {{ expanded?"关闭":"展开" }}
    </button><button @click="regene">regenerate</button>
    <div v-if="expanded">
        <nesty v-for="i in children" :sub="i"></nesty>
    </div>
</div>
</template>
<style scoped>
div{
    outline:1px white solid;
    min-width:200px;
    padding:20px;
    text-align:left;
}
</style>
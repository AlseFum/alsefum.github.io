<script setup>
import { onMounted, ref } from "vue";
import expand from './expand.js'
import dirty from "./dirty.js";
const props = defineProps(['sub','root','scope'])
const content = ref();
onMounted(() => {
    if (props.sub) content.value = props.sub
    else if (props.sub ==undefined) content.value =dirty;
    else { content.value = null }
})

const children = ref()
const groups = ref()

const expanded = ref(false)
const revealed = ref(false)
function trigger() {
    if (!revealed.value) {
        revealed.value = true;
        gene()
    } else {
        expanded.value = !expanded.value
    }
}
function gene() {
    const [_children, _groups] = expand(content.value);
    children.value = _children
    groups.value = _groups
    expanded.value = false;
    Promise.resolve().then(() => expanded.value = true);
}


</script>
<template>
    <div v-if="props.sub!==undefined||props.root==true">
        {{ content?.label ?? "No_label" }}:{{ props.sub==undefined }}|{{ props.sub!==undefined||props.prime==true }}
        <button @click="trigger" >{{ expanded ? "关闭" : "展开" }}</button>
        <button @click="gene">regenerate</button>
        <div v-if="expanded&&content!=null">
            <nesty v-for="i in children" :sub="i"></nesty>
            <div v-for="g in groups" style="border-left:8px green solid ;">
                <nesty v-for="i in g"></nesty>
            </div>
        </div>
    </div>
</template>
<style scoped>
div {
    outline: 1px white solid;
    min-width: 200px;
    padding: 5px;
    text-align: left;
    overflow: inherit;
}
</style>
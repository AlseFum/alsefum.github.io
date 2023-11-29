<script setup>
import { ref, onMounted, computed } from 'vue'
let value = ref("");
let index = ref(0);
let props = defineProps(
    ["values", "render"]
)
let e = defineEmits(["update"])
let toDisp = computed(i => {
    if (props.render) return props.render(value.value); else {
        return value.value;
    }
})
function next() {
    index.value++;
    if (index.value >= props.values.length) index.value = 0;
    value.value = props.values[index.value];
    e("update", value.value);
}
defineExpose(value)
onMounted(next)
</script>
<template>
    <div v-if="value != ''" class="switch" @click="next">{{ toDisp }}</div>
</template>
<style scoped>
.switch {
    font-family: inherit;
    border: none;
    outline: 1px dotted rgb(37, 37, 37);
    outline-offset: -4px;
    background: hsl(0deg 0% 75%);
    box-shadow: inset -1px -1px #292929, inset 1px 1px #fff, inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
    font-size: 14px;
    letter-spacing: 1px;
    padding: 5px 30px;
}
</style>
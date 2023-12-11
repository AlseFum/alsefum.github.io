<script setup>
import { ref,computed,onMounted,watch } from 'vue';
import attempt from '../../util/attempt.js'
let props=defineProps(["currentScene","curEmuInst"])
const currentScene=computed(()=>props.currentScene)
const curEmuInst=computed(()=>props.curEmuInst)
let stageHTML=ref("")
onMounted(()=>{stageHTML.value=currentScene.value.render(currentScene.value,curEmuInst.value,"a"+34)})

watch(currentScene, (nv) => {
  if (nv?.type === 'plot') {
    plotinit();
  }
})

function plotinit() {
  plotprocess.value.num = 0;
  plotprocess.value.plots = [];
  plotprocess.value.plots.push(currentScene.value.render(curEmuInst.value.context,curEmuInst.value));
}
function plotnext() {
  plotprocess.value.plots.push(currentScene.value.render(curEmuInst.value.context,curEmuInst.value,plotprocess.value))
  let lastplot=plotprocess.value.plots[plotprocess.value.plots.length - 1];
  console.log(lastplot)
  if (lastplot?.goto) {
    curEmuInst.value.goto(lastplot?.goto)
  }
}
function plotback() {
  let res = currentScene.value.render(Symbol.for("back"))
  if (res === true) {
    plotprocess.value.num--;
    plotprocess.value.plots.pop();
  }
}
const plotprocess = ref({ num: 0, plots: [] })//plot模式下的变量

</script>
<template>
    plot here
    <!-- <p v-for="i in plotprocess.plots">
      <span v-if="(typeof i === 'string')">{{ i }}</span>
      <span v-else-if="(typeof i) === 'object'"></span>
    </p>
    <button @click="plotnext">NEXT</button>
    <button @click="plotback">back </button> -->
</template>
<style scoped>

</style>
<script setup>
import { ref, computed ,onBeforeMount } from 'vue'
import { Emulator, Context } from '../emulation'
const props = defineProps({
  emulation: { type: Object }
})
const curEmuDef = computed(() => props.emulation ?? {
  env: {print(n) {
      stageHTML.value = n;
    }},
  scenes: (function () {
    let n = new Map();
     n.set("n", {
      title:"n",
      render() { return "asef" },
      inputs: [{ label: "yes", exec() { stageHTML.value += "yes" } }, {
        label: "no",
        exec() { stageHTML.value += "no" }
      },{
        label: "go m",
        exec(c,e) { e.goto('m') }
      }]
    });
    n.set("m",{
      render(){return "damn"},
      inputs: [{ label: "go n", exec(c,e) {e.goto("n")  }}]})
    return n
  })()
})
let stageHTML = ref("")
let command = ref("")
let curEmuInst;
onBeforeMount(()=>{
  curEmuInst = new Emulator(curEmuDef.value);
})
</script>
<template>
  <div>
    <p>
    <h2>{{ curEmuInst.title?.(curEmuInst.context,curEmuInst) }}</h2>
    </p>
    <pre v-html="stageHTML"></pre>
  </div>
  <div style="display: flex;place-items: center;max-width:60%;margin:0 auto">
    <button v-for=" i in curEmuInst?.currentScene?.inputs" @click="i.exec(curEmuInst.context,curEmuInst)">{{ i.label }}</button>
  </div>
  <div><input v-model="command" @keydown.enter="curEmuInst.command(command)" /></div>
  <div>{{ curEmuInst.env.logArea }}</div>
</template>
<style scoped>
div pre {
  min-width: 80rem;
  max-width: 100rem;
  min-height: 10rem;
  border: shadow 1%;
  text-wrap: wrap;
}
button {
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  background: hsl(0deg 0% 75%);
  box-shadow: inset -1px -1px #292929, inset 1px 1px #fff, inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 5px 30px;
}

button:active {
  box-shadow: inset -1px -1px #fff, inset 1px 1px #292929, inset -2px -2px #ffffff, inset 2px 2px rgb(158, 158, 158);
}
</style>
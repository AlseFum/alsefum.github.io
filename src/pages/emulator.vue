<script setup>
import { ref, computed, onBeforeMount,onMounted } from 'vue'
import { Emulator, Context } from '../emulation'
import defaultEmuDef from '../emulation/default.js'
import useState from '../storage'
let store=useState();
const props = defineProps({
  emulation: { type: Object }
})

const curEmuDef = computed(() => props.emulation ?? Object.assign(defaultEmuDef, {
  env: {
    print(n) {
      stageHTML.value = n;
    }
  }
},))

let stageHTML = ref("")
let command = ref("")
let curEmuInst;
onBeforeMount(() => {
  curEmuInst = new Emulator(curEmuDef.value);
})
onMounted(()=>{
  useState().side=["try",()=>{console.log(stageHTML.value)}]
  console.log(store.side)
})
</script>
<template>
  <div>
    <p>
    <h2>{{ curEmuInst.title?.(curEmuInst.context, curEmuInst) ?? curEmuInst.title }}</h2>
    </p>
    <pre v-html="stageHTML"></pre>
  </div>
  <div>
    <details v-for="w in curEmuInst.watch">{{ w }}</details>
  </div>
  <div class="inputlist">
    <button v-for=" i in curEmuInst?.currentScene?.inputs" @click="i.exec(curEmuInst.context, curEmuInst)">{{ i.label
    }}</button>
  </div>
  <div>
    <input v-model="command" @keydown.enter="curEmuInst.command(command)" />
  </div>
  <div>{{ curEmuInst.env.logArea }}</div>
</template>
<style scoped>
div pre {
  min-width: 80rem;
  max-width: 100rem;
  min-height: 10rem;
  border: shadow 1%;
  text-wrap: wrap;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
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

inputlist {
  display: flex;
  place-items: center;
  max-width: 60%;
  margin: 0 auto
}</style>
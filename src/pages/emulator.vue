<script setup>
import { ref, watch, onBeforeMount, onMounted, onUnmounted,computed } from 'vue'
import modal from '../components/modal.vue'
import { Emulator, Context } from '../emulation'
import { useRoute } from 'vue-router'
let route = useRoute();
import useState from '../storage'
let store = useState();

const props = defineProps({
  emulation: { type: Object }
})

import presets from '../emulation/series.js'

let curEmuInst = ref(null);
let env = { print(n) { stageHTML.value = n; }, rerender }
let currentScene=computed(()=>curEmuInst.value.currentScene)
function rerender() {
  env.print(curEmuInst.value.currentScene.render(curEmuInst.value.context, curEmuInst.value));
}


let stageHTML = ref("")
let command = ref("")

let modalMenu = ref();
let modalDebug = ref();
let debugTextarea = ref();

let sel = ref({});
let byManual = ref(false);
let menuEmuManual = ref(localStorage.getItem("storedEmu"));
watch(menuEmuManual, (newValue) => {
  localStorage.setItem('storedEmu', newValue);
});

let showBorder = ref(true)
function runDebug(str) {
  let { curEmuInst } = this;
  let { env, context, scenes, currentScene } = curEmuInst;
  console.log(str);
  return eval(str)
}
function loadEmuRaw(n) {
  curEmuInst.value = new Emulator(n, env);
  console.log(curEmuInst.value.scenes)

}

onBeforeMount(() => {
  //curEmuInst = new Emulator(curEmuDef.value,env);

})
onMounted(() => {
  if (route.query.preset) {
    loadEmuRaw(presets.filter(i => i.id == route.query.preset)[0]);
    modalMenu.value.trigger();
  }

  store.side = [
    ["try", () => { modalMenu.value.trigger() }],
    ["debug", () => { modalDebug.value.trigger() }],
    ['clear', () => { curEmuInst.value = null; }]
  ]

})
onUnmounted(() => {
  store.side = []
})
defineExpose([])
</script>
<template>
  <div v-if="!curEmuInst">还没导入呢</div>
  <div v-else :style="showBorder ? 'border:1px white solid' : ''">
    <div :style="showBorder ? 'border:1px white solid' : ''">
      <!-- <p><h2>{{ curEmuInst.title?.(curEmuInst.context, curEmuInst) ?? curEmuInst.title ??"TITLE"}}</h2></p> -->
      <pre v-html="stageHTML"></pre>
    </div>

    <div class="inputlist" :style="showBorder ? 'border:1px white solid' : ''">
      <button v-for=" i in curEmuInst?.currentScene?.inputs"
        @click="() => { i.exec(curEmuInst.context, curEmuInst); env.rerender(); }">{{ i.label
        }}</button>
    </div>
    <div v-if="currentScene">
      <div v-for="csw in currentScene.watch">de {{csw}} {{ curEmuInst.context[csw?.prop??csw] }}</div>
      <!-- <input v-model="command" @keydown.enter="curEmuInst.command(command)" /> -->
    </div>

  </div>


  <modal active="false" ref="modalMenu" style="display:flex">
    这里应该是整emulation的<br />
    <button @click="byManual = !byManual">{{ byManual ? "手动输入" : "预设" }}</button>
    <section v-if="!byManual">
      <button @click="loadEmuRaw(presets.filter(i => i.id == sel.value)[0])">载入</button>
      <select ref="sel">
        <option v-for="p in presets" :value="p.id">{{ p.id }}</option>
      </select>
    </section>
    <section v-else><button @click="loadEmuRaw(menuEmuManual)">shishi</button>
      <textarea v-model.value="menuEmuManual"></textarea>
      <button @click="menuEmuManual = ''">清除</button>
    </section>


  </modal>
  <modal ref="modalDebug">
    <button @click="showBorder = !showBorder">trigger border</button>
    <textarea id="scripts" cols="30" rows="10" ref="debugTextarea"></textarea>
    <button @click="runDebug(debugTextarea.value)">run</button>
  </modal>
</template>
<style scoped>
div pre {
  max-width: 100rem;
  min-height: 10rem;
  border: shadow 1%;
  text-wrap: wrap;
  margin: 0 auto;
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
}
</style>
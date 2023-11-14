<script setup>
import { ref, watch, onBeforeMount, onMounted, onUnmounted,computed } from 'vue'
import modal from '../components/modal.vue'
import emuInput from '../components/emuInput.vue'
import { Emulator, Context } from '../emulation'
import { useRoute } from 'vue-router'
let route = useRoute();
import useState from '../storage'
let store = useState();

const props = defineProps({emulation: { type: Object }})

import presets from '../emulation/series.js'

let curEmuInst = ref(null);
let currentScene=computed(()=>curEmuInst.value.currentScene)
function rerender() {
  env.print(curEmuInst.value.currentScene.render(curEmuInst.value.context, curEmuInst.value));
}
let env = { print(n) { stageHTML.value = n; }, rerender }
function loadEmuRaw(n) {  curEmuInst.value = new Emulator(n, env);
if(curEmuInst.value.title)store.title=curEmuInst.value.title;
console.log(curEmuInst.value.title,store.title);}



let stageHTML = ref("")

let modalMenu = ref();
let modalDebug = ref();
let debugTextarea = ref();

let sel = ref({});
let byManual = ref(false);

let menuEmuManual = ref(localStorage.getItem("storedEmu"));
watch(menuEmuManual, (newValue) => {
  localStorage.setItem('storedEmu', newValue);
});

let showBorder = ref(false)
function runDebug(str) {
  if(curEmuInst&&curEmuInst.value){let { env, context, scenes, currentScene } = curEmuInst};
  let loadExternal=function(str){
    fetch(str)
      .then(response => response.json())
      .then(json => {console.log("loading",json);loadEmuRaw(json)})
  }
  console.log(str);
  return eval(str)
}


onMounted(() => {
  if (route.query.preset) {
    loadEmuRaw(presets.filter(i => i.id == route.query.preset)[0]);
  }
})
onMounted(()=>{store.side = [
    ["try", () => { modalMenu.value.trigger() }],
    ["debug", () => { modalDebug.value.trigger() }],
    ['clear', () => { curEmuInst.value = null; }],
  ]})
onUnmounted(() => {
  store.side = []
})

</script>
<template>
  <div v-if="!curEmuInst">还没导入呢</div>
  <div v-else :style="showBorder ? 'border:1px white solid' : ''">
    <section :style="showBorder ? 'border:1px white solid' : ''">
      <p><h2>{{currentScene?.title(curEmuInst.context,curEmuInst)}}</h2></p>
      <pre v-html="stageHTML"></pre>
    </section>

    <section class="inputlist" :style="showBorder ? 'border:1px white solid' : ''">
      <emuInput v-for=" i in curEmuInst?.currentScene?.inputs" :input="i" :context="curEmuInst.context" :emu="curEmuInst"></emuInput>
    </section>

    <section v-if="currentScene">
      <!-- emuwatch -->
      <div v-for="csw in currentScene.watch">{{csw}}: {{ curEmuInst.context[csw?.prop??csw] }}</div>
      <!-- <input v-model="command" @keydown.enter="curEmuInst.command(command)" /> -->
    </section>

  </div>


  <modal  ref="modalMenu"  style="display:flex">
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
  <modal ref="modalDebug" style="display:flex;flex-direction:column">
    <button @click="showBorder = !showBorder">trigger border</button><br/><hr/>
    <textarea id="scripts" cols="30" rows="10" ref="debugTextarea"></textarea>
    <button @click="runDebug(debugTextarea.value)">run</button>
  </modal>
</template>
<style scoped>
pre {
  max-width: 100rem;
  min-height: 10rem;
  border: shadow 1%;
  text-wrap: wrap;
  margin: 0 auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}



inputlist {
  display: flex;
  place-items: center;
  max-width: 60%;
  margin: 0 auto
}
</style>
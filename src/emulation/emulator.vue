<script setup>
import { ref, watch, onMounted, onUnmounted, computed, inject } from 'vue'
import modal from '../components/modal.vue'
import switchVue from '../components/switch.vue';
import emuInput from '../components/emuInput.vue'
import emuWatch from '../components/emuWatch.vue';
import { Emulator, Context } from '../emulation'
import { useRoute } from 'vue-router'
let route = useRoute();
import useState from '../storage'
let store = useState();

const props = defineProps({ emulation: { type: Object } })

import presets from '../emulation/presets/index.js'

let curEmuInst = ref(null);
let currentScene = computed(() => curEmuInst.value.currentScene)
function rerender() {
  env.print(curEmuInst.value.currentScene.render(curEmuInst.value.context, curEmuInst.value));
}
let env = { print(n) { stageHTML.value = n; }, rerender }
function loadEmuRaw(n) {
  curEmuInst.value = new Emulator(n, env);
  if (curEmuInst.value.title) store.title = curEmuInst.value.title;
  currentScene.value = curEmuInst.value.currentScene;
  console.log(currentScene.value)
}



let stageHTML = ref("")
let modalMenu = ref();
let modalDebug = ref();
let debugTextarea = ref();

let sel = ref("");
let contentFrom = ref();

function syncLocal(str) {
  let ret = ref(localStorage.getItem(str));
  watch(ret, (newValue) => {
    localStorage.setItem(str, newValue);
  })
  return ret;
}
let menuEmuManual = syncLocal("storedEmu")

let showBorder = ref(false)
function runDebug(str) {
  if (curEmuInst && curEmuInst.value) { let { env, context, scenes, currentScene } = curEmuInst };
  let loadExternal = function (str) {
    fetch(str)
      .then(response => response.json())
      .then(json => { console.log("loading", json); loadEmuRaw(json) })
  }
  console.log(str);
  return eval(str)
}
import table from '../util/table'
const attempt = (i, c, e) => { if (typeof i === "string") return i; else return i(c, e) }
inject("attempt", attempt)
onMounted(() => {
  if (route.query.preset) {

    loadEmuRaw(presets.filter(i => i.id == route.query.preset)[0]);

  }

})
side: {
  onMounted(() => {
    store.side = [
      ["try", () => { modalMenu.value.trigger() }],
      ["debug", () => { modalDebug.value.trigger() }],
      ['clear', () => { curEmuInst.value = null; }],
    ]
  })
  onUnmounted(() => {
    store.side = []
  })
}

</script>
<template>
  <div v-if="!curEmuInst">还没导入呢</div>
  <div v-else-if="curEmuInst.currentScene.type === 'scene'" :style="showBorder ? 'border:1px white solid' : ''">

    
      <section :style="showBorder ? 'border:1px white solid' : ''">
        <p>
        <h2>{{ attempt(currentScene?.title, curEmuInst.context, curEmuInst) }}</h2>
        </p>
        <pre v-html="stageHTML"></pre>
      </section>

      <section class="inputlist" :style="showBorder ? 'border:1px white solid' : ''">
        <emuInput v-for=" i in curEmuInst?.currentScene?.inputs" :input="i" :context="curEmuInst.context"
          :emu="curEmuInst">
        </emuInput>
      </section>

      <section v-if="currentScene">
        <emuWatch v-for="csw in currentScene.watch" :pkey="csw?.prop ?? csw"
          :value="curEmuInst.context[csw?.prop ?? csw]">
        </emuWatch>
      </section>

    
  </div>
  <div v-else-if="curEmuInst.currentScene.type === 'plot'">
  <p v-for="i in 4">plots</p>
  <p>branch</p>
  <p>choice</p>
  </div>



  <modal ref="modalMenu" style="display:flex">
    <br />
    <switchVue :values='["手动输入", "预设"]' @update="e => { contentFrom = e }"></switchVue>
    <section v-if="contentFrom == '预设'">
      <button @click="loadEmuRaw(presets.filter(i => i.id == sel.value)[0])">载入</button>
      <select ref="sel">
        <option v-for="p in presets" :value="p.id">{{ p.id }}</option>
      </select>
    </section>
    <section v-if="contentFrom == '手动输入'"><button @click="loadEmuRaw(menuEmuManual)">来！shishi</button>
      <textarea v-model.value="menuEmuManual"></textarea>
      <button @click="menuEmuManual = ''">清除</button>
    </section>
  </modal>
  <modal ref="modalDebug" style="display:flex;flex-direction:column">
    <button @click="showBorder = !showBorder">trigger border</button><br />
    <button @click="console.log(curEmuInst)"></button>
    <hr />
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
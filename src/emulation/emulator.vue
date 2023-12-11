<script setup>
import { ref, watch, onMounted, onUnmounted, computed, } from 'vue'
//@ts-ignore
import modal from '../components/modal.vue'
import switchVue from '../components/switch.vue';

//@ts-ignore
import svdefault from './sv/default.vue'
import svplot from './sv/plot.vue'
const sv = {
  default:svdefault,plot:svplot
}
import { Emulator } from '../emulation'
import { useRoute } from 'vue-router'
let route = useRoute();
import useState from '../storage'
let store = useState();

import presets from '../emulation/presets/index.js'

let curEmuInst = ref(null);
let currentScene = computed(() => curEmuInst?.value?.currentScene)

let env = { print(n) { sceneViewInst.value?.print?.(n) }}
function loadEmuRaw(n) {
  curEmuInst.value = new Emulator(n, env);
  if (curEmuInst.title) store.title = curEmuInst.title;
}

let modalMenu = ref();//DOM
let contentFrom = ref();//manual or preset
const menuContent = ref("");


function syncLocal(str) {
  let ret = ref(localStorage.getItem(str));
  watch(ret, (newValue) => {
    localStorage.setItem(str, newValue);
  })
  return ret;
}
let menuEmuManual = syncLocal("storedEmu")//if manual,sync the emulation to localStorage



function runDebug(str) {
  if (curEmuInst?.value) {
    let { env, context, scenes, currentScene } = curEmuInst.value
  };
  let loadExternal = function (str) {
    fetch(str)
      .then(response => response.json())
      .then(json => { console.log("loading", json); loadEmuRaw(json) })
  }
  console.log("[Debug]" + str);
  return eval(str)
}
const sceneViewInst = ref();
const sceneView = computed(() => currentScene.value?.type ?? "default")
onMounted(() => {
  if (route.query.preset) {
    loadEmuRaw(presets.filter(i => i.id == route.query.preset)[0]);
  }
})
onMounted(()=>{
  console.log(sceneViewInst.value)
  sceneViewInst.value.message("from main:nihao!");
})

side: {
  onMounted(() => {
    store.side = [
      ["menu", () => { modalMenu.value.trigger(true) }],
      ["debug", () => { modalMenu.value.trigger(true) }],
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
  <component :is="sv[sceneView]" ref="sceneViewInst" :currentScene="currentScene" :curEmuInst="curEmuInst" @message="i => console.log('received at main:',i)">
  </component>



  <modal ref="modalMenu" style="display:flex;" innerStyle="display:block;width:600px;height:400px;">
    <div style="float:left;height:100%;width:20%;display:flex;flex-direction: column;">
      <button v-for="i in ['menu', 'debug', 'clear']" @click="() => { menuContent = i; console.log(menuContent) }">
        {{ i }}</button>
    </div>
    <div style="float:right;height:100%;width:80%">
      <div v-if="menuContent == 'menu'">
        <switchVue :values='["手动输入", "预设"]' @update="e => { contentFrom = e }"></switchVue>
        <section v-if="contentFrom == '预设'">
          <button @click="loadEmuRaw(presets.filter(i => i.id == selectedPreset)[0])">载入{{ sef }}</button>
          <select v-model="selectedPreset">
            <option v-for="p in presets" :value="p.id">{{ p.id }}</option>
          </select>

        </section>
        <section v-if="contentFrom == '手动输入'">
          <button @click="loadEmuRaw(menuEmuManual)">载入</button>
          <button @click="menuEmuManual = ''">清除</button>
          <br>
          <textarea v-model.value="menuEmuManual"></textarea>
        </section>
      </div>
      <div v-if="menuContent == 'debug'">
      <h6>控制台</h6><button @click="runDebug(debugText)">run</button><br>
      <textarea id="scripts" cols="30" rows="10" v-model.value="debugText"></textarea>
    </div> 
    </div>
    
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
<script setup>
import { ref, watch, onMounted, onUnmounted, computed, } from 'vue'
import modal from '../components/modal.vue'
import switchVue from '../components/switch.vue';

import svdefault from './sv/default.vue'
import { Emulator } from '../emulation'
import { useRoute } from 'vue-router'
let route = useRoute();
import useState from '../storage'
let store = useState();

import presets from '../emulation/presets/index.js'

let curEmuInst = ref(null);
let currentScene = computed(() => curEmuInst?.value?.currentScene)
watch(currentScene, (nv) => {
  if (nv?.type === 'plot') {
    plotinit();
  }
})
function rerender() {
  env.print(curEmuInst.value.currentScene.render(curEmuInst.value.context, curEmuInst.value));
}
let env = { print(n) { stageHTML.value = n; }, rerender }
function loadEmuRaw(n) {
  curEmuInst.value = new Emulator(n, env);

  if (curEmuInst.title) store.title = curEmuInst.title;

}



let stageHTML = ref("")//displayHTML
let modalMenu = ref();//DOM
let contentFrom = ref();//manual or preset
let modalContent = ref("menu");//STRING ENUM
let selectedPreset = ref({})//preset selection
onMounted(() => { selectedPreset.value = presets[0] })
let debugTextarea = ref();
watch(modalContent, (newValue) => {
  if (newValue != null) {
    modalContent.value = newValue;
    modalMenu.value.trigger(true);
  } else {
    modalMenu.value.trigger(false);
    modalContent.value = newValue;
  }
})
function syncLocal(str) {
  let ret = ref(localStorage.getItem(str));
  watch(ret, (newValue) => {
    localStorage.setItem(str, newValue);
  })
  return ret;
}
let menuEmuManual = syncLocal("storedEmu")//if manual,sync the emulation to localStorage

const plotprocess = ref({ num: 0, plots: [] })//plot模式下的变量
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
const sceneViewInst=ref();
const sceneView=computed(()=>currentScene.value.type??"default")
onMounted(() => {
  console.log(sceneView)
  if (route.query.preset) {
    loadEmuRaw(presets.filter(i => i.id == route.query.preset)[0]);
  }
})


side: {
  onMounted(() => {
    store.side = [
      ["menu", () => { modalContent.value = "menu"; modalMenu.value.trigger(true) }],
      ["debug", () => { modalContent.value = "debug"; modalMenu.value.trigger(true) }],
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
  <component :is="null" ref="sceneView" :currentScene="currentScene" :curEmuInst="curEmuInst" @message="i=>console.log(i)"></component>
  <div v-if="curEmuInst?.currentScene?.type === 'scene'">
    
    <svdefault :current-scene="currentScene" :cur-emu-inst="curEmuInst"></svdefault>

  </div>
  <div v-else-if="curEmuInst?.currentScene?.type === 'plot'">

    <p v-for="i in plotprocess.plots">
      <span v-if="(typeof i === 'string')">{{ i }}</span>
      <span v-else-if="(typeof i) === 'object'"></span>
    </p>
    <!-- <p>branch</p>
    <p>choice</p> -->
    <button @click="plotnext">NEXT</button>
    <button @click="plotback">back </button>
  </div>



  <modal ref="modalMenu" style="display:flex">
    <div v-if="modalContent == 'menu'">
      <switchVue :values='["手动输入", "预设"]' @update="e => { contentFrom = e }"></switchVue>
      <section v-if="contentFrom == '预设'">
        <button @click="loadEmuRaw(presets.filter(i => i.id == selectedPreset)[0])">载入</button>
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
    <div v-if="modalContent == 'debug'">
      <h6>控制台</h6><button @click="runDebug(debugTextarea.value)">run</button><br>
      <textarea id="scripts" cols="30" rows="10" ref="debugTextarea"></textarea>
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
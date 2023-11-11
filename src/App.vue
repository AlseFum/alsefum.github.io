<script setup>
import { ref,onMounted } from 'vue'
import useStore from './storage'
let store = useStore();

let folding = ref(true);
function fold() {
  folding.value = !folding.value;
  return folding.value;
}
globalThis.fold=fold;

fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
</script>
<template>
  <div class="header">
    <button @click="fold" style="width:30px;height:30px;margin:10px;"></button>
    {{ store.title }}
  </div>
  <div style="top:80px;left:30px">
    <router-view></router-view>
  </div>
  <div class="mask" @click="fold"
    :style="{ backgroundColor: folding ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.8)', zIndex: folding ? -1 : 1 }">
    <aside class="sidebar" @click.stop>
      <p>阿弥诺斯</p>
      <section>something goes here
      比如 save->打开save窗口，load->打开load窗口 <br/>
      <div v-if="(store.side instanceof Array)">
      <button v-for="op in store.side" @click="op[1]">{{ op[0] }}</button>
      </div>
      </section>
    <router-link :to="{ name:'Emulator'}" >emulator</router-link><br/>
    <router-link :to="{ name:'Dice'}" >dice</router-link><br/>
  </aside>
  </div>
</template>

<style scoped>
.header {
  /* position: absolute; */
  width: 100%;
  height: 8%;
  min-height: 2rem;
  left: 0px;
  top: 0px;
  background-color: var(--primary);

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 1;
}

.mask .sidebar {
  position: absolute;
  width: 20%;
  min-width: 200px;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 1px;
  background-color: var(--accent);
  backdrop-filter:invert(0.2);
  filter:grayscale(0.9)
}
</style>

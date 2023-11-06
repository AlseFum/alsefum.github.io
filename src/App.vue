<script setup>
import { ref } from 'vue'
import useStore from './storage'
let store = useStore();

let folding = ref(true);
function fold() {
  folding.value = !folding.value;
  return folding.value;
}
globalThis.fold=fold;
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
    <aside class="sidebar">
      <p>阿弥诺斯</p>
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
  min-width: 300px;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 1px;
  background-color: var(--accent);
  backdrop-filter:invert(0.2);
  filter:grayscale(0.9)
}
</style>

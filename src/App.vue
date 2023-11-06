<script setup>
import { ref } from 'vue'
import useStore from './storage'
let store = useStore();

let folding = ref(true);
function a() {
  folding.value = !folding.value;
  return folding.value;
}
globalThis.a = a
</script>
<template>
  <div class="header">
    <button @click="a" style="width:30px;height:30px;margin:10px;"></button>
    {{ store.title }}
  </div>
  <div style="top:80px;left:30px">
    here the router
    <router-view></router-view>
  </div>
  <div class="mask" @click="a"
    :style="{ backgroundColor: folding ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.8)', zIndex: folding ? -1 : 1 }">
    <aside class="sidebar" @click.stop="console.log('hello')">阿弥诺斯
    
    <router-link :to="{ name:'Emulator'}" @click.stop="console.log('toemulator')">emulator</router-link></aside>
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
  filter:grayscale(0.9)
}</style>

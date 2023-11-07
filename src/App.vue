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
import modal from './components/modal.vue'

let m=ref(null);
onMounted(()=>{
  setTimeout(()=>{console.log(m.value.isActive);m.value.isActive=false},1000)
})
</script>
<template>
  <div class="header">
    <button @click="fold" style="width:30px;height:30px;margin:10px;"></button>
    {{ store.title }}
  </div>
  <div style="top:80px;left:30px">
    <router-view></router-view>
  </div>
<modal :active="true" ref="m"><div style="width:300px;height:200px;"></div></modal>
  <div class="mask" @click="fold"
    :style="{ backgroundColor: folding ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.8)', zIndex: folding ? -1 : 1 }">
    <aside class="sidebar" @click.stop>
      <p>阿弥诺斯</p>
      <section>something goes here
      比如 save->打开save窗口，load->打开load窗口 
      <button @click="store?.side?.[1]">{{ store?.side }}</button> 
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

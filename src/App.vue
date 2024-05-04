<script setup>
import { ref, onMounted } from 'vue'
import useStore from './storage'
let store = useStore();
let folding = ref(false);
function fold() {
  folding.value = !folding.value; return folding.value;
}
const custyle = ref("")

</script>
<template>
  <Transition name="slide-fade">
    <div class="mask" @click="fold" v-if="folding" :class="[custyle]">
      <aside class="sidebar" @click.stop>
        <section>
          <div v-if="(store.side instanceof Array)" @click="fold">
            <button class="sidebtn" v-for="op in store.side" @click="op[1]">{{ op[0] }}</button>
          </div>
          <br />
        </section>
        <section>
          <router-link :to="{ name: 'Dice' }">dice</router-link><br />
        </section>
      </aside>
    </div>
  </Transition>
  <header class="header" :class="[custyle]">
    <button @click="fold" style="width:30px;height:30px;margin:10px;">三</button>
    {{ store.title }}
  </header>

  <section :class="[custyle]">
    <router-view></router-view>
  </section>
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
  justify-content: stretch;
  align-items: center;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 5;

  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
}

.mask .sidebar {
  position: absolute;
  width: 20%;
  min-width: 200px;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 1px;
  background-color: var(--primary);
  backdrop-filter: invert(0.2);
}

.sidebtn {
  display: block;
  height: 1.8rem;
  width: 60px;
  margin: 0 auto;

  border-radius: 6px;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.slide-fade-enter-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>

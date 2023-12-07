<script setup>
import { ref,computed,onMounted } from 'vue';
import attempt from '../../util/attempt.js'
let props=defineProps(["currentScene","curEmuInst"])
const currentScene=computed(()=>props.currentScene)
const curEmuInst=computed(()=>props.curEmuInst)
let stageHTML=ref("")
onMounted(()=>{stageHTML.value=currentScene.value.render(currentScene.value,curEmuInst.value,"a"+34)})
</script>
<template>
    <section>
      <p>
      <h2>{{ attempt(currentScene?.title, curEmuInst.context, curEmuInst) }}</h2>
      </p>
      <pre>{{ currentScene.render(currentScene,curEmuInst,"a") }}</pre>
      <pre v-html="stageHTML"></pre>
    </section>

    <section class="inputlist">
        {{ attempt(currentScene?.inputs, curEmuInst.context, curEmuInst) }}
      <!-- <emuInput v-for=" i in attempt(currentScene?.inputs, curEmuInst.context, curEmuInst)" :input="i"
        :context="curEmuInst.context" :emu="curEmuInst">
        a</emuInput> -->
    </section>

    <!-- <section v-if="0 && currentScene">
      watch比较特殊？
      <emuWatch v-for="csw in currentScene.watch" :pkey="csw?.prop ?? csw" :value="curEmuInst.context[csw?.prop ?? csw]">
      </emuWatch>
    </section> -->


</template>
<style scoped>

</style>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import isStore from './isStore.js'
const store = isStore();
const props = defineProps(["world", "wid"])
const curWorld = computed(() => props.world ?? store.getWorld(props.wid))
const curEntities = computed(() => curWorld.value?.entities ?? [])
//@ts-ignore
import isev from './isEntityView.vue'

const timer = ref(0);
function startTimer() { timer.value = setInterval(() => curWorld.value.tick(), 1000) }
function stopTimer() {
    clearInterval(timer.value);
    timer.value = 0;
}


onMounted(startTimer)
onUnmounted(stopTimer)
let fold = ref(false)

import { JohnDoe, entityTemplates } from './exp';
const newentityselection = ref(entityTemplates[0])
function newEntity() {
    let n = newentityselection.value.name;
    for (let i of entityTemplates) {
        if (i.name === n) {
            curWorld.value.receive(i.new());
        }
    }

}
function destructEntity(entity, world) {
    world.entities.splice(world.entities.indexOf(entity), 1);
    let se = store.entities;
    for (const key in se) {
        if (se[key] === entity) {
            delete se[key];
            break;
        }
    }
}
const emits = defineEmits(["destruct"])
</script>
<template>
    <section class="worldarea">

        <h2>{{ curWorld?.name ?? curWorld?.title ?? "" }}</h2>
        <pre>{{ curWorld.description }}</pre>

        <button style="float:right" @click="() => curWorld.tick()">single step</button>
        <button style="float:right" @click="() => timer ? stopTimer() : startTimer()"> {{ timer ? "stop" : "start"
        }}</button>
        <button style="float:right" @click="fold = !fold"> fold</button>
        <br />
        <div v-show="!fold">
            <select v-model="newentityselection">
                <option v-for="et in entityTemplates" :value="et">{{ et.name }}</option>
            </select>
            <input type="text" v-model="newentityname">

            <button @click="newEntity">add Entity</button>

            <button @click="emits('destruct')">🗑️</button>
            <section class="entityarea">entityhash informations and tools here
                <isev v-for="entity in curEntities" :entity="entity" :world="curWorld"
                    @destruct="() => destructEntity(entity, world)"></isev>
            </section>
        </div>

    </section>
</template>
<style >
.worldarea {
    display: block;
    padding-left: 20px;
    border-radius: 20px;
    margin: 20px;
    backdrop-filter: brightness(150%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

@media screen and (max-width: 414px) {}

.entityarea {
    display: flex;
    max-width: 90%;
    flex-direction: column;
    border-radius: 10px;
    gap: 15px;
    margin: 20px;
    margin-left: 3px;
    padding-left: 40px;
}
</style>
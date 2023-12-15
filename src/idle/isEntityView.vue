<script setup>
let props = defineProps([
    "entity", "eid", "world"
])
import { ref, onMounted, onUnmounted, computed, onUpdated } from 'vue'
import isStore from './isStore.js'
//@ts-ignore
import propview from './propview.vue';
const store = isStore();
const curEntity = computed(() => props.entity ?? store.getEntity(props.eid))
function cetick(){curEntity.value.tick(props.world, WEnv.value)}
const timer = ref(0);
const WEnv = ref({
    log(str) {
        lines.value.push(str);
    }
})
const emits=defineEmits("destruct")
const lines = ref([])
const linesInst = ref();
onUpdated(() => {
    linesInst.value.scrollTop = linesInst.value.scrollHeight;
})
const showDetail=ref(false)
function startTimer() { timer.value = setInterval(cetick, 1000) }
function stopTimer() { clearInterval(timer.value); timer.value = 0; }
onMounted(startTimer)
onUnmounted(stopTimer)
</script>
<template>
    <article class="singleentity">
        <div class="leftarea">
            <span style="font-size:8pt;">#{{ curEntity.hash }}</span>&nbsp;
            <span style="font-size: 24pt;font-weight: 700;">{{ curEntity.name }}</span><br>
            <div>
                    <propview  v-for="i in props.world.stable" :prop="i" :obj="curEntity" :stable="true"></propview>
            </div>
            <div>
                    <propview  v-for="i in props.world.flexible" :prop="i" :obj="curEntity"></propview>
            </div>
            <button v-for="i in 3" @click="lines.push(i)">actions</button>
            <button @click="showDetail=!showDetail">展开</button>
        </div>
        <div ref="linesInst" class="centerarea" >
            <span v-for="line in lines">{{ line }}<br /></span>
        </div>
        <div class="rightarea">
            <button @click="cetick">⏩</button>
            <button @click="timer?stopTimer():startTimer()"> {{timer?'⏸️':"▶️" }} </button>
            <button  @click="lines=[]">🗑️</button>
            <button @click="emits('destruct')">🗑️</button>
        </div>
    </article>
    <article v-if="showDetail">
        detailed<br/>
    </article>
</template>
<style scoped>
.singleentity {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    justify-items: stretch;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    backdrop-filter: brightness(160%);
    text-align: left;
    margin: 10px;
    padding-left: 20px;
}
.leftarea{
    width:30%;
    overflow-x: hidden;
}

.centerarea{
    flex-grow: 2;
    word-wrap: break-word;
    max-height: 10rem;
    overflow-y: scroll;
}
.rightarea {
    width:30px;
    display: flex;
    flex-direction: column;
    justify-self: end;
}
.rightgroup button{
    width:30px;
    height:30px;
    align-items: center;
    font-size: 24px;
    text-align: center;
}

div::-webkit-scrollbar {
    width: 0.5em;
}

/* div::-webkit-scrollbar-track {
  
} */

div::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 0.5em;
}
</style>

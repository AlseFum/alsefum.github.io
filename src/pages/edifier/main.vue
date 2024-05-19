<script setup>
import { ref, onMounted, computed } from "vue";
import { Location, attempt, Content } from "./lib";
const content = new Content()
const map_record = new Map()
const curKey = ref("start")
map_record.set("start", new Location())
const curLoc = computed(() =>
    map_record.get(curKey.value)
)
function gonew(n) {

    if(!":" in n){
        curKey.value=n
    }
    else{
        let res = content.rules[n]()
    map_record.set(res.name, res)
    curKey.value = res.name
    console.log("gonew ", res, n)
    }

}
</script>
<template>
    {{ curLoc.name }}<br/>
    <div class="edifier-container">

        <section style="min-width:180px;border:1px white solid;text-align: left;padding-left: 30px;">
            <p v-for="i in attempt(curLoc.options)" @click="() =>
                gonew(i)">
                :{{ i }}</p>


        </section>


        <section>plot:<br />
            {{ attempt(curLoc.description) }}
        </section>
    </div>
</template>
<style scoped>
.edifier-container {
    display: flex;
    justify-content: stretch;
}

section {
    margin: 20px;
}
</style>
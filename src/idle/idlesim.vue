<script setup>

</script>
<template>
    <section class="worldarea">
        <h2>hamlet</h2>
        world information
        variables
        function
        save load
        another world
        <div><button v-for="i in ['save', 'load']">{{ i }}</button></div>
    </section>
    <section class="entityarea">entityhash informations and tools here
        <article class="singleentity">
            <div style="width:30%">#hash here <span style="font-size: 24pt;font-weight: 700;">heroname</span><br>
                aflow of tags
                <div>
                    <div v-for="i in 15"
                        style="display: inline-block;backdrop-filter: brightness(20%);gap:5px;background-color: grey;">nihao
                    </div>
                </div>
                <button v-for="i in 10">btn</button>
            </div>
            <div style="width:50%;word-wrap: break-word;">
                <span>lines</span>
            </div>
        </article>
        <article class="singleentity" v-for="i in 3">
            entity:name,status
            <button v-for="i in 5">option {{ i }}</button>
            <br>
            logs
        </article>
    </section>
</template>
<style >

.worldarea {
    display: block;
    position: relative;
    width: 80%;
    border-radius: 20px;
    margin: 20px;
    height: 200px;
    backdrop-filter: brightness(150%);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
@media screen and (max-width: 414px) {

}
.entityarea {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    gap: 15px;
    margin: 20px;
    margin-left: 3px;
}

.singleentity {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    backdrop-filter: brightness(160%);
}</style>
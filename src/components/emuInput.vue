<script setup>
let props=defineProps(["input","context","emu"])
</script>
<template>
<button  :disabled="0&&props.input.disabled(props.context,props.emu)" @click="() => { props.input.exec(props.context,props.emu);props.emu. env.rerender(); }"
>{{ typeof props.input.label ==="function"?props.input.label(props.context,props.emu):props.input.label
        }}</button>

</template>
<style scoped>
button {
  font-family: inherit;
  border: none;
  outline: 1px dotted rgb(37, 37, 37);
  outline-offset: -4px;
  background: hsl(0deg 0% 75%);
  box-shadow: inset -1px -1px #292929, inset 1px 1px #fff, inset -2px -2px rgb(158, 158, 158), inset 2px 2px #ffffff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding: 5px 30px;
}

button:active {
  box-shadow: inset -1px -1px #fff, inset 1px 1px #292929, inset -2px -2px #ffffff, inset 2px 2px rgb(158, 158, 158);
}
</style>
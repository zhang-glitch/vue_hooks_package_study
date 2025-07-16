<script setup lang="ts">
import { ref } from 'vue'
import myEventTarget from "../custom-event";

defineProps<{ msg: string }>()

const count = ref(0)

console.log("重新渲染---hello")

// 派发事件在定义事件之后
// const handleDisp = () => {
//   const customEvent = new CustomEvent("foo", { detail: "详细数据" });
//   myEventTarget.dispatchEvent(customEvent);
// }


// const fn = (event: Event) => {
//   console.log("event======", event)
// }
// myEventTarget.addEventListener("foo", fn)

const handleDisp = () => {
    const customEvent = new CustomEvent("foo", { detail: "详细数据", cancelable: true });
    myEventTarget.dispatchEvent(customEvent);
  }

// myEventTarget.removeEventListener("foo", fn)
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="handleDisp">派发事件</button>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

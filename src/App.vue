<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import editor from "./components/editor.vue";
</script>

<template>
  <editor></editor>
</template>

<style>
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
#app {
  background: black;
  color: white;
  font-family: monospace;
  min-height: 100vh;
  padding: 2rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

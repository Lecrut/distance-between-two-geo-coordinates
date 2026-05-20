<script setup lang="ts">
import AppBar from '@/components/AppBar.vue'
</script>

<template>
  <div class="app">
    <AppBar />

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

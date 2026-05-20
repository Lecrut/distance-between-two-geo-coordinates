<script setup lang="ts">
const routes = [
  { name: 'Home', path: '/' },
  { name: 'Calculator', path: '/calculator' },
]
</script>

<template>
  <header class="app-bar">
    <h3>Distance Calculator</h3>

    <div class="spacer"></div>

    <router-link v-for="item in routes" class="button" :key="item" :to="item.path">{{
      item.name
    }}</router-link>
  </header>
</template>

<style scoped>
.app-bar {
  display: flex;
  align-items: center;
  background: green;
  color: white;
  padding: 10px 20px;
}

.spacer {
  flex: 1;
}

.app-bar a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.button {
  padding: 5px 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
}
</style>

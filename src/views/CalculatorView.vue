<script setup lang="ts">
import { ref } from 'vue'
import InputField from '../components/InputField.vue'

const lat1 = ref<number | null>(null)
const lon1 = ref<number | null>(null)
const lat2 = ref<number | null>(null)
const lon2 = ref<number | null>(null)

function count() {}
</script>

<template>
  <div class="calculator">
    <h1>Distance Calculator</h1>

    <InputField label="Point A" v-model:lat="lat1" v-model:lon="lon1" />
    <InputField label="Point B" v-model:lat="lat2" v-model:lon="lon2" />

    <a class="button" @click="count">Calculate</a>
  </div>
</template>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.button {
  padding: 10px 20px;
  background: green;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.button:hover {
  background: greenyellow;
  color: black;
  transition: ease-in 0.3s;
}
</style>

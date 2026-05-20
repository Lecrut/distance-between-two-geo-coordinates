<script setup lang="ts">
import { ref } from 'vue'
import InputField from '../components/InputField.vue'
import { useCalculateStore } from '../stores/calculate'
import { storeToRefs } from 'pinia'

const lat1 = ref<number | null>(null)
const lon1 = ref<number | null>(null)
const lat2 = ref<number | null>(null)
const lon2 = ref<number | null>(null)

const calculateStore = useCalculateStore()
const { loading, error } = storeToRefs(calculateStore)

async function count() {
  if (lat1.value === null || lon1.value === null || lat2.value === null || lon2.value === null) {
    console.log('Please fill in all fields before calculating.')
    return
  }

  try {
    const result = await calculateStore.fetchDistance({
      lat1: lat1.value,
      lon1: lon1.value,
      lat2: lat2.value,
      lon2: lon2.value,
    })

    console.log('Distance result:', result)
  } catch (error) {
    console.error('Calculation failed:', error)
  }
}
</script>

<template>
  <div class="calculator">
    <h1>Distance Calculator</h1>

    <InputField label="Point A" v-model:lat="lat1" v-model:lon="lon1" />
    <InputField label="Point B" v-model:lat="lat2" v-model:lon="lon2" />

    <button class="button" @click="count">
      {{ loading ? 'Calculating...' : 'Calculate' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
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

.error {
  margin-top: 16px;
  color: #b00020;
}
</style>

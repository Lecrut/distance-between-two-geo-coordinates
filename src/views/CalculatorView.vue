<script setup lang="ts">
import { computed, ref } from 'vue'
import InputField from '../components/InputField.vue'
import ResultPopup from '../components/ResultPopup.vue'
import { useCalculateStore } from '../stores/calculate'
import { storeToRefs } from 'pinia'

const lat1 = ref<number | null>(null)
const lon1 = ref<number | null>(null)
const lat2 = ref<number | null>(null)
const lon2 = ref<number | null>(null)

const calculateStore = useCalculateStore()
const { loading, error, result } = storeToRefs(calculateStore)

const hasValidCoordinates = computed(() => {
  const latitudeValues = [lat1.value, lat2.value]
  const longitudeValues = [lon1.value, lon2.value]

  const latitudeValid = latitudeValues.every(
    (value) => value !== null && value >= -90 && value <= 90,
  )
  const longitudeValid = longitudeValues.every(
    (value) => value !== null && value >= -180 && value <= 180,
  )

  return latitudeValid && longitudeValid
})

async function count() {
  if (lat1.value === null || lon1.value === null || lat2.value === null || lon2.value === null) {
    console.log('Please fill in all fields before calculating.')
    return
  }

  if (!hasValidCoordinates.value) {
    console.log('Latitude must be between -90 and 90 and longitude must be between -180 and 180.')
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

function closeResultPopup() {
  lat1.value = null
  lon1.value = null
  lat2.value = null
  lon2.value = null
  calculateStore.resetStore()
}
</script>

<template>
  <div class="calculator">
    <h1>Distance Calculator</h1>

    <p>Enter the coordinates of the points to calculate the distance.</p>

    <InputField label="Point A" v-model:lat="lat1" v-model:lon="lon1" />
    <InputField label="Point B" v-model:lat="lat2" v-model:lon="lon2" />

    <button type="button" class="button" :disabled="loading || !hasValidCoordinates" @click="count">
      {{ loading ? 'Calculating...' : 'Calculate' }}
    </button>

    <ResultPopup :loading="loading" :result="result" :error="error" @close="closeResultPopup" />
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

.button:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>

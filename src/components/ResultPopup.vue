<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CalculateResult } from '../models/CalculateResult'

const props = defineProps<{
  loading: boolean
  result: CalculateResult | null
  error: string | null
}>()

const emit = defineEmits<{
  close: () => void
}>()

const isOpen = ref(false)

watch(
  () => [props.loading, props.result, props.error],
  ([loading, result, error]) => {
    if (loading) {
      isOpen.value = false
      return
    }

    isOpen.value = Boolean(result || error)
  },
  { immediate: true },
)

const title = computed(() => (props.error ? 'Error' : 'Result'))

function closePopup() {
  emit('close')
  isOpen.value = false
}
</script>

<template>
  <div v-if="isOpen" class="overlay" @click.self="closePopup">
    <div class="popup">
      <h2>{{ title }}</h2>

      <p v-if="error" class="message error">{{ error }}</p>

      <div v-else-if="result" class="message result">
        <p>Distance between two points is:</p>
        <p><strong>Kilometers:</strong> {{ result.distance_kilometers.toFixed(3) }}</p>
        <p><strong>Meters:</strong> {{ result.distance_meters.toFixed(0) }}</p>
      </div>

      <button type="button" class="button" @click="closePopup">Close</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
}

.popup {
  min-width: 280px;
  max-width: 90vw;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.popup h2 {
  margin: 0;
}

.message {
  margin: 0;
}

.error {
  color: red;
}

.result p {
  margin: 6px 0;
}

.button {
  padding: 8px 16px;
  border: 0;
  border-radius: 5px;
  background: green;
  color: white;
}
</style>

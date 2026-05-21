<script setup lang="ts">
import { computed } from 'vue'

defineProps<{ label: string }>()

const lat = defineModel<number | null>('lat')
const lon = defineModel<number | null>('lon')

const isLatValid = computed(() => lat.value === null || (lat.value >= -90 && lat.value <= 90))
const isLonValid = computed(() => lon.value === null || (lon.value >= -180 && lon.value <= 180))

const latError = computed(() =>
  isLatValid.value || lat.value === null ? '' : 'Latitude must be between -90 and 90.',
)

const lonError = computed(() =>
  isLonValid.value || lon.value === null ? '' : 'Longitude must be between -180 and 180.',
)
</script>

<template>
  <fieldset class="point-box">
    <legend>{{ label }}</legend>

    <div class="inputs-row">
      <div class="input-wrapper">
        <label>Latitude</label>
        <input
          type="number"
          v-model="lat"
          min="-90"
          max="90"
          step="any"
          placeholder="ex. 52.2297"
          :class="{ invalid: lat !== null && !isLatValid }"
        />
        <p class="error" :class="{ visible: Boolean(latError) }">{{ latError || ' ' }}</p>
      </div>

      <div class="input-wrapper">
        <label>Longitude</label>
        <input
          type="number"
          v-model="lon"
          min="-180"
          max="180"
          step="any"
          placeholder="ex. 21.0122"
          :class="{ invalid: lon !== null && !isLonValid }"
        />
        <p class="error" :class="{ visible: Boolean(lonError) }">{{ lonError || ' ' }}</p>
      </div>
    </div>
  </fieldset>
</template>

<style scoped>
.point-box {
  border: 1px solid grey;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
}

legend {
  font-weight: bold;
  color: green;
  padding: 0 5px;
}

.inputs-row {
  display: flex;
  gap: 15px;
}

@media (max-width: 400px) {
  .inputs-row {
    flex-direction: column;
  }
}

.input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.85em;
  margin-bottom: 4px;
  color: grey;
}

input {
  padding: 8px;
  border: 1px solid grey;
  border-radius: 4px;
  font-size: 1rem;
}

.invalid {
  border-color: #b00020;
}

.error {
  margin: 4px 0 0;
  min-height: 1.2em;
  color: #b00020;
  font-size: 0.8rem;
  visibility: hidden;
}

.error.visible {
  visibility: visible;
}
</style>

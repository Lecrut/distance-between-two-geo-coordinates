<script setup lang="ts">
defineProps<{ label: string }>()

const lat = defineModel<number | null>('lat')
const lon = defineModel<number | null>('lon')
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
        />
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
        />
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
</style>

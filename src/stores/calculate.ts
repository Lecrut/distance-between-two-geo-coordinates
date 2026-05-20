import { ref } from 'vue'
import { defineStore } from 'pinia'

type CalculatePayload = {
  lat1: number
  lon1: number
  lat2: number
  lon2: number
}

type CalculateResult = {
  distance_kilometers: number
  distance_meters: number
}

export const useCalculateStore = defineStore('calculate', () => {
  const loading = ref(false)
  const result = ref<CalculateResult | null>(null)
  const error = ref<string | null>(null)
  const serverLink = 'http://localhost:8080/'

  async function fetchDistance(payload: CalculatePayload) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(serverLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const contentType = response.headers.get('content-type') || ''

      let data: (CalculateResult & { error?: string }) | null = null

      if (contentType.includes('application/json')) {
        data = (await response.json()) as CalculateResult & { error?: string }
      } else {
        const text = await response.text()
        throw new Error(
          `Non-JSON response from server: ${response.status} ${response.statusText}\n${text.slice(0, 512)}`,
        )
      }

      if (!response.ok) {
        throw new Error(data?.error ?? 'Failed to calculate distance')
      }

      result.value = {
        distance_kilometers: data.distance_kilometers,
        distance_meters: data.distance_meters,
      }

      return result.value
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : 'Unknown error'

      error.value = message
      result.value = null
      throw fetchError
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    result,
    error,
    fetchDistance,
  }
})

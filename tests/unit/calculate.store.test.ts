import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCalculateStore } from '../../src/stores/calculate'

function createJsonResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Bad Request',
    headers: {
      get: (name: string) => (name.toLowerCase() === 'content-type' ? 'application/json' : null),
    },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as Response
}

describe('useCalculateStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', vi.fn())
  })

  it('stores the returned distance on success', async () => {
    const store = useCalculateStore()
    const fetchMock = vi.mocked(fetch)

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({ distance_kilometers: 12.345, distance_meters: 12345 }),
    )

    const result = await store.fetchDistance({
      lat1: 1,
      lon1: 2,
      lat2: 3,
      lon2: 4,
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/server.php',
      expect.objectContaining({
        method: 'POST',
      }),
    )
    expect(result).toEqual({ distance_kilometers: 12.345, distance_meters: 12345 })
    expect(store.result).toEqual({ distance_kilometers: 12.345, distance_meters: 12345 })
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('stores the server error message on failure', async () => {
    const store = useCalculateStore()
    const fetchMock = vi.mocked(fetch)

    fetchMock.mockResolvedValueOnce(createJsonResponse({ error: 'Invalid input' }, 400))

    await expect(
      store.fetchDistance({
        lat1: 1,
        lon1: 2,
        lat2: 3,
        lon2: 4,
      }),
    ).rejects.toThrow('Invalid input')

    expect(store.result).toBeNull()
    expect(store.error).toBe('Invalid input')
    expect(store.loading).toBe(false)
  })

  it('resetStore clears all state', () => {
    const store = useCalculateStore()

    store.loading = true
    store.result = { distance_kilometers: 1, distance_meters: 1000 }
    store.error = 'Something went wrong'

    store.resetStore()

    expect(store.loading).toBe(false)
    expect(store.result).toBeNull()
    expect(store.error).toBeNull()
  })
})

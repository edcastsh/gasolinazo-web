import { create } from 'zustand'

export type FuelType = 'regular' | 'premium' | 'diesel'

export type RadiusValue = 2500 | 5000 | 10000 | 15000

const STORAGE_KEY = 'gasolinazo-filters'

interface StoredFilters {
  fuelType: FuelType
  radius: RadiusValue
}

function loadStored(): StoredFilters | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.fuelType && parsed.radius) return parsed
    return null
  } catch {
    return null
  }
}

function saveStored(fuelType: FuelType, radius: RadiusValue) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fuelType, radius }))
  } catch { /* ignore */ }
}

function clearStored() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch { /* ignore */ }
}

const stored = loadStored()

interface FiltersState {
  fuelType: FuelType | null
  radius: RadiusValue
  coords: { lat: number; lng: number } | null
  hasHydrated: boolean
  setFuelType: (fuelType: FuelType) => void
  setRadius: (radius: RadiusValue) => void
  setCoords: (coords: { lat: number; lng: number }) => void
  reset: () => void
}

export const useFilters = create<FiltersState>((set) => ({
  fuelType: stored?.fuelType ?? null,
  radius: stored?.radius ?? 5000,
  coords: null,
  hasHydrated: !!stored,
  setFuelType: (fuelType) => {
    set({ fuelType })
    const { radius } = useFilters.getState()
    saveStored(fuelType, radius)
  },
  setRadius: (radius) => {
    set({ radius })
    const { fuelType } = useFilters.getState()
    if (fuelType) saveStored(fuelType, radius)
  },
  setCoords: (coords) => set({ coords }),
  reset: () => {
    clearStored()
    set({
      fuelType: null,
      radius: 5000,
      coords: null,
      hasHydrated: false,
    })
  },
}))

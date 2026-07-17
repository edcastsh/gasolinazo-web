import { create } from 'zustand'

export type FuelType = 'regular' | 'premium' | 'diesel'

export type RadiusValue = 2500 | 5000 | 10000 | 15000 | 20000

interface FiltersState {
  fuelType: FuelType | null
  radius: RadiusValue
  coords: { lat: number; lng: number } | null
  setFuelType: (fuelType: FuelType) => void
  setRadius: (radius: RadiusValue) => void
  setCoords: (coords: { lat: number; lng: number }) => void
  reset: () => void
}

const initialState = {
  fuelType: null as FuelType | null,
  radius: 5000 as RadiusValue,
  coords: null as { lat: number; lng: number } | null,
}

export const useFilters = create<FiltersState>((set) => ({
  ...initialState,
  setFuelType: (fuelType) => set({ fuelType }),
  setRadius: (radius) => set({ radius }),
  setCoords: (coords) => set({ coords }),
  reset: () => set(initialState),
}))

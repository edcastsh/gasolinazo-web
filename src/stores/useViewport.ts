import { create } from 'zustand'

export interface ViewportBounds {
  north: number
  south: number
  east: number
  west: number
}

interface ViewportState {
  bounds: ViewportBounds | null
  setBounds: (bounds: ViewportBounds) => void
}

export const useViewport = create<ViewportState>((set) => ({
  bounds: null,
  setBounds: (bounds) => set({ bounds }),
}))

export function isWithinBounds(
  bounds: ViewportBounds | null,
  lat: number,
  lng: number,
): boolean {
  if (!bounds) return true
  return (
    lat <= bounds.north &&
    lat >= bounds.south &&
    lng <= bounds.east &&
    lng >= bounds.west
  )
}

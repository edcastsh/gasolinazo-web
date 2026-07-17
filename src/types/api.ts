export interface Gasolinera {
  placeId: string
  name: string
  permitCre: string
  coordinates: { lat: number; lng: number }
  prices: {
    regular?: number
    premium?: number
    diesel?: number
  }
  extractedAt: string
  source: string
}

export interface HistoryEntry {
  prices: { regular?: number; premium?: number; diesel?: number }
  extractedAt: string
}

export interface PreciosParams {
  fuelType?: 'regular' | 'premium' | 'diesel'
  from?: string
  to?: string
  lng?: number
  lat?: number
  radius?: number
}

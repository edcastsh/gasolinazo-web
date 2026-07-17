import { apiFetch } from './client'
import type { Gasolinera, HistoryEntry, PreciosParams } from '../types/api'

export const fetchGasolineras = () =>
  apiFetch<Gasolinera[]>('/gasolineras')

export const fetchGasolinera = (placeId: string) =>
  apiFetch<Gasolinera[]>(`/gasolineras/${placeId}`)

export const fetchHistory = (placeId: string) =>
  apiFetch<HistoryEntry[]>(`/gasolineras/${placeId}/historial`)

export const fetchPrecios = (params: PreciosParams) => {
  const query = new URLSearchParams()
  if (params.fuelType) query.set('tipo', params.fuelType)
  if (params.from) query.set('desde', params.from)
  if (params.to) query.set('hasta', params.to)
  if (params.lng != null) query.set('lng', String(params.lng))
  if (params.lat != null) query.set('lat', String(params.lat))
  if (params.radius != null) query.set('radius', String(params.radius))
  return apiFetch<Gasolinera[]>(`/precios?${query}`)
}

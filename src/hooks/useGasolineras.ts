import { useQuery } from '@tanstack/react-query'
import { fetchGasolineras, fetchGasolinera, fetchHistory } from '../api/endpoints'

export function useGasolineras() {
  return useQuery({
    queryKey: ['gasolineras'],
    queryFn: fetchGasolineras,
  })
}

export function useGasolinera(placeId: string) {
  return useQuery({
    queryKey: ['gasolinera', placeId],
    queryFn: () => fetchGasolinera(placeId),
    enabled: !!placeId,
  })
}

export function useHistory(placeId: string) {
  return useQuery({
    queryKey: ['history', placeId],
    queryFn: () => fetchHistory(placeId),
    enabled: !!placeId,
  })
}

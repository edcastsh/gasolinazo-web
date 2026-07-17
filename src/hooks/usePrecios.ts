import { useQuery } from '@tanstack/react-query'
import { fetchPrecios } from '../api/endpoints'
import { useFilters } from '../stores/useFilters'

export function usePrecios() {
  const { fuelType, radius, coords } = useFilters()

  const enabled = !!fuelType && !!coords

  return useQuery({
    queryKey: ['precios', fuelType, radius, coords],
    queryFn: () =>
      fetchPrecios({
        fuelType: fuelType ?? undefined,
        lng: coords?.lng,
        lat: coords?.lat,
        radius: radius,
      }),
    enabled,
    refetchOnWindowFocus: false,
  })
}

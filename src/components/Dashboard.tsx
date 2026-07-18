import { useEffect, useState } from 'react'
import { useFilters } from '../stores/useFilters'
import { usePrecios } from '../hooks/usePrecios'
import { useGeolocation } from '../hooks/useGeolocation'
import { StationMap } from './StationMap'
import { StationList } from './StationList'
import { Header } from './Header'
import { FilterModal } from './FilterModal'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const { fuelType, coords, radius, setCoords } = useFilters()
  const { data: stations, isLoading, refetch, isFetching } = usePrecios()
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Refresh stored location silently in the background
  const { coords: liveCoords, requestLocation } = useGeolocation()
  useEffect(() => {
    requestLocation()
  }, [requestLocation])
  useEffect(() => {
    if (liveCoords) setCoords(liveCoords)
  }, [liveCoords, setCoords])

  if (!fuelType || !coords) return null

  return (
    <div className={styles.container}>
      <Header onOpenFilters={() => setFiltersOpen(true)} />
      <StationMap
        userCoords={coords}
        stations={stations ?? []}
        fuelType={fuelType}
        radius={radius}
      />
      <StationList
        stations={stations ?? []}
        fuelType={fuelType}
        userCoords={coords}
        loading={isLoading || isFetching}
        onRefresh={() => refetch()}
      />
      <FilterModal key={filtersOpen ? 'open' : 'closed'} open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </div>
  )
}

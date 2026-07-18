import { useState } from 'react'
import { useFilters } from '../stores/useFilters'
import { usePrecios } from '../hooks/usePrecios'
import { StationMap } from './StationMap'
import { StationList } from './StationList'
import { Header } from './Header'
import { FilterModal } from './FilterModal'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const { fuelType, coords, radius } = useFilters()
  const { data: stations, isLoading, refetch, isFetching } = usePrecios()
  const [filtersOpen, setFiltersOpen] = useState(false)

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

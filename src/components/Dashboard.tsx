import { useFilters } from '../stores/useFilters'
import { usePrecios } from '../hooks/usePrecios'
import { StationMap } from './StationMap'
import { StationList } from './StationList'
import { Header } from './Header'
import styles from './Dashboard.module.css'

interface Props {
  onReset: () => void
}

export function Dashboard({ onReset }: Props) {
  const { fuelType, coords } = useFilters()
  const { data: stations, isLoading, refetch, isFetching } = usePrecios()

  if (!fuelType || !coords) return null

  return (
    <div className={styles.container}>
      <Header onReset={onReset} />
      <StationMap
        userCoords={coords}
        stations={stations ?? []}
        fuelType={fuelType}
      />
      <StationList
        stations={stations ?? []}
        fuelType={fuelType}
        userCoords={coords}
        loading={isLoading || isFetching}
        onRefresh={() => refetch()}
      />
    </div>
  )
}

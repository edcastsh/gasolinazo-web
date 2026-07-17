import type { FuelType } from '../stores/useFilters'
import styles from './StationCard.module.css'

interface Station {
  placeId: string
  name: string
  coordinates: { lat: number; lng: number }
  prices: { regular?: number; premium?: number; diesel?: number }
  distance?: number
}

interface Props {
  station: Station
  fuelType: FuelType
  rank: number
  isCheapest?: boolean
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`
  return `${(meters / 1000).toFixed(1)} km`
}

export function StationCard({ station, fuelType, rank, isCheapest }: Props) {
  const price = station.prices[fuelType]

  return (
    <div className={`${styles.card} ${isCheapest ? styles.cheapest : ''}`}>
      <div className={styles.rank}>
        <span className={styles.rankNumber}>{rank}</span>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.name}>{station.name}</span>
          {isCheapest && <span className={styles.badge}>Más barata</span>}
        </div>
        {station.distance != null && (
          <span className={styles.distance}>{formatDistance(station.distance)}</span>
        )}
      </div>
      <div className={styles.priceBlock}>
        <span className={styles.price}>
          {price != null ? `$${price.toFixed(2)}` : '—'}
        </span>
        <span className={styles.priceLabel}>por litro</span>
      </div>
    </div>
  )
}

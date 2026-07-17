import type { FuelType } from '../stores/useFilters'
import { Navigation } from 'lucide-react'
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

function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function openDirections(station: Station) {
  const { lat, lng } = station.coordinates
  const label = encodeURIComponent(station.name)
  const url = isIOS()
    ? `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d&q=${label}`
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving&destination_place_id=${station.placeId}`
  window.open(url, '_blank')
}

export function StationCard({ station, fuelType, rank, isCheapest }: Props) {
  const price = station.prices[fuelType]

  return (
    <button
      className={`${styles.card} ${isCheapest ? styles.cheapest : ''}`}
      onClick={() => openDirections(station)}
      type="button"
    >
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
      <div className={styles.navBlock}>
        {price != null && (
          <span className={styles.price}>${price.toFixed(2)}</span>
        )}
        <Navigation className={styles.navIcon} size={16} strokeWidth={2} />
      </div>
    </button>
  )
}

import { useRef, useState, useCallback, useEffect, useMemo } from 'react'
import { Search, Droplets, RefreshCw } from 'lucide-react'
import type { Gasolinera } from '../types/api'
import type { FuelType } from '../stores/useFilters'
import { StationCard } from './StationCard'
import { VirtualList } from './VirtualList'
import styles from './StationList.module.css'

interface Props {
  stations: Gasolinera[]
  fuelType: FuelType
  userCoords: { lat: number; lng: number }
  loading: boolean
  onRefresh: () => void
}

function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

type SheetState = 'peek' | 'half' | 'full'

const PEEK_HEIGHT = 140
const HALF_RATIO = 0.5
const FULL_RATIO = 0.85
const CARD_HEIGHT = 80

export function StationList({ stations, fuelType, userCoords, loading, onRefresh }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [sheetState, setSheetState] = useState<SheetState>('peek')
  const touchStart = useRef({ y: 0, startTime: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const sorted = useMemo(() => {
    return stations
      .map((s) => ({
        ...s,
        distance: haversineDistance(
          userCoords.lat, userCoords.lng,
          s.coordinates.lat, s.coordinates.lng,
        ),
      }))
      .sort((a, b) => {
        const pa = a.prices[fuelType] ?? Infinity
        const pb = b.prices[fuelType] ?? Infinity
        if (pa !== pb) return pa - pb
        return (a.distance ?? Infinity) - (b.distance ?? Infinity)
      })
  }, [stations, fuelType, userCoords])

  const cheapest = sorted[0]?.prices[fuelType]

  const getTargetHeight = (state: SheetState) => {
    if (state === 'full') return `${FULL_RATIO * 100}vh`
    if (state === 'half') return `${HALF_RATIO * 100}vh`
    return `${PEEK_HEIGHT}px`
  }

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { y: e.touches[0].clientY, startTime: Date.now() }
    setIsDragging(true)
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(false)
      const deltaY = touchStart.current.y - e.changedTouches[0].clientY
      const deltaTime = Date.now() - touchStart.current.startTime
      const velocity = Math.abs(deltaY) / deltaTime

      if (velocity > 0.5 || Math.abs(deltaY) > 60) {
        if (deltaY > 0) {
          if (sheetState === 'peek') setSheetState('half')
          else setSheetState('full')
        } else {
          if (sheetState === 'full') setSheetState('half')
          else setSheetState('peek')
        }
      }
    },
    [sheetState],
  )

  const handleDragHandle = useCallback(() => {
    if (sheetState === 'peek') setSheetState('half')
    else if (sheetState === 'half') setSheetState('full')
    else setSheetState('peek')
  }, [sheetState])

  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.style.height = getTargetHeight(sheetState)
    }
  }, [sheetState])

  return (
    <div
      ref={sheetRef}
      className={`${styles.sheet} ${isDragging ? styles.dragging : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.handle} onClick={handleDragHandle}>
        <div className={styles.handleBar} />
      </div>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>
            {sorted.length} gasolinera{sorted.length !== 1 ? 's' : ''}
          </h2>
          {cheapest != null && (
            <span className={styles.cheapestBadge}>
              Desde ${cheapest.toFixed(2)}
            </span>
          )}
        </div>
        <button
          className={styles.refreshBtn}
          onClick={onRefresh}
          disabled={loading}
          type="button"
        >
          {loading ? (
            <span className={styles.refreshSpinner} />
          ) : (
            <RefreshCw size={16} strokeWidth={2} />
          )}
        </button>
      </div>

      {loading && sorted.length === 0 ? (
        <div className={styles.empty}>
          <Search className={styles.emptyIcon} size={32} strokeWidth={1.5} />
          <p>Buscando gasolineras...</p>
        </div>
      ) : sorted.length === 0 ? (
        <div className={styles.empty}>
          <Droplets className={styles.emptyIcon} size={32} strokeWidth={1.5} />
          <p>No se encontraron gasolineras en esta área</p>
        </div>
      ) : (
        <div className={styles.list}>
          <VirtualList
            items={sorted}
            itemHeight={CARD_HEIGHT}
            renderItem={(s, i) => (
              <StationCard
                key={s.placeId}
                station={s}
                fuelType={fuelType}
                rank={i + 1}
                isCheapest={s.prices[fuelType] === cheapest && i === 0}
              />
            )}
          />
        </div>
      )}
    </div>
  )
}

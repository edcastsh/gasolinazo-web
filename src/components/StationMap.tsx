import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Gasolinera } from '../types/api'
import type { FuelType } from '../stores/useFilters'
import { useViewport, isWithinBounds } from '../stores/useViewport'
import styles from './StationMap.module.css'

const priceIconCache = new Map<number, L.DivIcon>()

function createPriceIcon(price: number) {
  const cached = priceIconCache.get(price)
  if (cached) return cached
  const icon = L.divIcon({
    className: '',
    html: `<div class="custom-marker">$${price.toFixed(2)}</div>`,
    iconSize: [60, 28],
    iconAnchor: [30, 14],
  })
  priceIconCache.set(price, icon)
  return icon
}

function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker user-marker"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })
}

function FitToRadius({
  center,
  radius,
}: {
  center: [number, number]
  radius: number
}) {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(L.latLng(center[0], center[1]).toBounds(radius * 2))
  }, [map, center, radius])

  return null
}

function ViewportMarkers({
  stations,
  fuelType,
}: {
  stations: Gasolinera[]
  fuelType: FuelType
}) {
  const map = useMap()
  const bounds = useViewport((s) => s.bounds)
  const setBounds = useViewport((s) => s.setBounds)

  useEffect(() => {
    const update = () => {
      const b = map.getBounds()
      setBounds({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      })
    }
    update()
    map.on('moveend', update)
    map.on('zoomend', update)
    return () => {
      map.off('moveend', update)
      map.off('zoomend', update)
    }
  }, [map, setBounds])

  const visible = useMemo(() => {
    return stations.filter((s) => {
      const price = s.prices[fuelType]
      if (price == null) return false
      return isWithinBounds(bounds, s.coordinates.lat, s.coordinates.lng)
    })
  }, [stations, fuelType, bounds])

  return (
    <>
      {visible.map((s) => {
        const price = s.prices[fuelType]!
        return (
          <Marker
            key={s.placeId}
            position={[s.coordinates.lat, s.coordinates.lng]}
            icon={createPriceIcon(price)}
          >
            <Popup>
              <div>
                <strong>{s.name}</strong>
                <br />
                {fuelType}: ${price.toFixed(2)}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

interface Props {
  userCoords: { lat: number; lng: number }
  stations: Gasolinera[]
  fuelType: FuelType
  radius: number
}

export function StationMap({ userCoords, stations, fuelType, radius }: Props) {
  const center: [number, number] = useMemo(
    () => [userCoords.lat, userCoords.lng],
    [userCoords.lat, userCoords.lng],
  )

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={13}
        className={styles.map}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <FitToRadius center={center} radius={radius} />

        <Marker position={center} icon={createUserIcon()}>
          <Popup>Tu ubicación</Popup>
        </Marker>

        <ViewportMarkers stations={stations} fuelType={fuelType} />
      </MapContainer>
    </div>
  )
}

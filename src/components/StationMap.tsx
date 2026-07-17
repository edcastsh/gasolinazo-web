import { useEffect, useRef, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Gasolinera } from '../types/api'
import type { FuelType } from '../stores/useFilters'
import styles from './StationMap.module.css'

function createPriceIcon(price: number) {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker">$${price.toFixed(2)}</div>`,
    iconSize: [60, 28],
    iconAnchor: [30, 14],
  })
}

function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker user-marker"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap()
  const hasCentered = useRef(false)

  useEffect(() => {
    if (!hasCentered.current) {
      map.setView(center, 13)
      hasCentered.current = true
    }
  }, [center, map])

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
  const [bounds, setBounds] = useState(() => map.getBounds())

  useEffect(() => {
    const update = () => setBounds(map.getBounds())
    map.on('moveend', update)
    map.on('zoomend', update)
    return () => {
      map.off('moveend', update)
      map.off('zoomend', update)
    }
  }, [map])

  const visible = useMemo(() => {
    return stations.filter((s) => {
      const price = s.prices[fuelType]
      if (price == null) return false
      return bounds.contains([s.coordinates.lat, s.coordinates.lng])
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
}

export function StationMap({ userCoords, stations, fuelType }: Props) {
  const center: [number, number] = [userCoords.lat, userCoords.lng]

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
        <RecenterMap center={center} />

        <Marker position={center} icon={createUserIcon()}>
          <Popup>Tu ubicación</Popup>
        </Marker>

        <ViewportMarkers stations={stations} fuelType={fuelType} />
      </MapContainer>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Fuel } from 'lucide-react'
import { useFilters, type FuelType, type RadiusValue } from '../stores/useFilters'
import { useGeolocation } from '../hooks/useGeolocation'
import { FuelTypeSelector } from './FuelTypeSelector'
import { RadiusSelector } from './RadiusSelector'
import styles from './SelectionScreen.module.css'

export function SelectionScreen() {
  const { fuelType, radius, setFuelType, setRadius, setCoords } = useFilters()
  const { coords, loading, error, requestLocation } = useGeolocation()
  const [radiusConfirmed, setRadiusConfirmed] = useState(false)

  useEffect(() => {
    if (coords) {
      setCoords(coords)
    }
  }, [coords, setCoords])

  const handleFuelSelect = (type: FuelType) => {
    setFuelType(type)
  }

  const handleRadiusSelect = (r: RadiusValue) => {
    setRadius(r)
    setRadiusConfirmed(true)
    requestLocation()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <Fuel className={styles.logo} size={48} strokeWidth={1.5} />
          <h1 className={styles.title}>Gasolinazo</h1>
          <p className={styles.subtitle}>
            Encuentra la gasolinera más barata cerca de ti
          </p>
        </div>

        {!fuelType && (
          <div className={styles.step} key="fuel">
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>¿Qué tipo de gasolina buscas?</h2>
              <FuelTypeSelector selected={fuelType} onSelect={handleFuelSelect} />
            </div>
          </div>
        )}

        {fuelType && !radiusConfirmed && (
          <div className={styles.step} key="radius">
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>¿A qué distancia?</h2>
              <RadiusSelector selected={radius} onSelect={handleRadiusSelect} />
            </div>
          </div>
        )}

        {radiusConfirmed && (loading || error) && (
          <div className={styles.locationStep}>
            {loading && (
              <div className={styles.locationStatus}>
                <span className={styles.spinner} />
                <p>Obteniendo tu ubicación...</p>
              </div>
            )}
            {error && (
              <div className={styles.locationStatus}>
                <p className={styles.error}>{error}</p>
                <button
                  className={styles.retryBtn}
                  onClick={() => requestLocation()}
                  type="button"
                >
                  Reintentar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

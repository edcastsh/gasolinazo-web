import { Fuel, Check } from 'lucide-react'
import { useFilters, type FuelType, type RadiusValue } from '../stores/useFilters'
import { useGeolocation } from '../hooks/useGeolocation'
import { FuelTypeSelector } from './FuelTypeSelector'
import { RadiusSelector } from './RadiusSelector'
import styles from './SelectionScreen.module.css'

interface Props {
  onReady: () => void
}

export function SelectionScreen({ onReady }: Props) {
  const { fuelType, radius, setFuelType, setRadius, setCoords } = useFilters()
  const { coords, loading, error, requestLocation } = useGeolocation()

  const handleFuelSelect = (type: FuelType) => {
    setFuelType(type)
  }

  const handleRadiusSelect = (r: RadiusValue) => {
    setRadius(r)
  }

  const handleContinue = () => {
    if (coords) {
      setCoords(coords)
      onReady()
    } else {
      requestLocation()
    }
  }

  const canContinue = fuelType !== null

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

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Tipo de gasolina</h2>
          <FuelTypeSelector selected={fuelType} onSelect={handleFuelSelect} />
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Radio de búsqueda</h2>
          <RadiusSelector selected={radius} onSelect={handleRadiusSelect} />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.button}
          onClick={handleContinue}
          disabled={!canContinue || loading}
          type="button"
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : coords ? (
            'Buscar gasolineras'
          ) : (
            'Usar mi ubicación'
          )}
        </button>

        {coords && !error && (
          <p className={styles.locationOk}>
            Ubicación obtenida <Check size={14} className={styles.checkIcon} />
          </p>
        )}
      </div>
    </div>
  )
}

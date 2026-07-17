import { useState } from 'react'
import { X } from 'lucide-react'
import { useFilters, type FuelType, type RadiusValue } from '../stores/useFilters'
import { FuelTypeSelector } from './FuelTypeSelector'
import { RadiusSelector } from './RadiusSelector'
import styles from './FilterModal.module.css'

interface Props {
  open: boolean
  onClose: () => void
}

export function FilterModal({ open, onClose }: Props) {
  const { fuelType, radius, setFuelType, setRadius } = useFilters()
  const [draftFuel, setDraftFuel] = useState<FuelType | null>(fuelType)
  const [draftRadius, setDraftRadius] = useState<RadiusValue>(radius)

  const handleUpdate = () => {
    if (draftFuel) setFuelType(draftFuel)
    setRadius(draftRadius)
    onClose()
  }

  if (!open) return null

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle}>
          <div className={styles.handleBar} />
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>Filtros</h2>
          <button className={styles.closeBtn} onClick={onClose} type="button">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Tipo de gasolina</h3>
            <FuelTypeSelector selected={draftFuel} onSelect={setDraftFuel} />
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Radio de búsqueda</h3>
            <RadiusSelector selected={draftRadius} onSelect={setDraftRadius} />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.updateBtn} onClick={handleUpdate} type="button">
            Actualizar filtros
          </button>
        </div>
      </div>
    </div>
  )
}

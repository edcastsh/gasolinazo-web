import { Fuel, Settings } from 'lucide-react'
import { useFilters, type FuelType, type RadiusValue } from '../stores/useFilters'
import styles from './Header.module.css'

interface Props {
  onOpenFilters: () => void
}

const FUEL_LABELS: Record<FuelType, string> = {
  regular: 'Regular',
  premium: 'Premium',
  diesel: 'Diésel',
}

function formatRadius(r: RadiusValue): string {
  return r >= 1000 ? `${r / 1000} km` : `${r} m`
}

export function Header({ onOpenFilters }: Props) {
  const { fuelType, radius } = useFilters()

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Fuel className={styles.logo} size={22} strokeWidth={2} />
        <span className={styles.title}>Gasolinazo</span>
      </div>
      <div className={styles.right}>
        {fuelType && (
          <span className={styles.pill}>
            {FUEL_LABELS[fuelType]} · {formatRadius(radius)}
          </span>
        )}
        <button className={styles.iconBtn} onClick={onOpenFilters} type="button" title="Cambiar filtros">
          <Settings size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

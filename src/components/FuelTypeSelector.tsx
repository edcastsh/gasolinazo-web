import { Fuel, Diamond, Truck } from 'lucide-react'
import type { FuelType } from '../stores/useFilters'
import styles from './FuelTypeSelector.module.css'

const FUEL_OPTIONS: { type: FuelType; label: string; Icon: typeof Fuel; desc: string }[] = [
  { type: 'regular', label: 'Regular', Icon: Fuel, desc: 'La más común' },
  { type: 'premium', label: 'Premium', Icon: Diamond, desc: 'Mayor octanaje' },
  { type: 'diesel', label: 'Diésel', Icon: Truck, desc: 'Para diésel' },
]

interface Props {
  selected: FuelType | null
  onSelect: (type: FuelType) => void
}

export function FuelTypeSelector({ selected, onSelect }: Props) {
  return (
    <div className={styles.grid}>
      {FUEL_OPTIONS.map((opt) => (
        <button
          key={opt.type}
          className={`${styles.card} ${selected === opt.type ? styles.active : ''}`}
          onClick={() => onSelect(opt.type)}
          type="button"
        >
          <opt.Icon className={styles.icon} size={28} strokeWidth={1.5} />
          <span className={styles.label}>{opt.label}</span>
          <span className={styles.desc}>{opt.desc}</span>
        </button>
      ))}
    </div>
  )
}

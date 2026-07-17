import type { RadiusValue } from '../stores/useFilters'
import styles from './RadiusSelector.module.css'

const RADIUS_OPTIONS: { value: RadiusValue; label: string }[] = [
  { value: 2500, label: '2.5 km' },
  { value: 5000, label: '5 km' },
  { value: 10000, label: '10 km' },
  { value: 15000, label: '15 km' },
  { value: 20000, label: '20 km' },
]

interface Props {
  selected: RadiusValue
  onSelect: (radius: RadiusValue) => void
}

export function RadiusSelector({ selected, onSelect }: Props) {
  return (
    <div className={styles.chips}>
      {RADIUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`${styles.chip} ${selected === opt.value ? styles.active : ''}`}
          onClick={() => onSelect(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

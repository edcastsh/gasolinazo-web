import { useState } from 'react'
import { SelectionScreen } from './components/SelectionScreen'
import { Dashboard } from './components/Dashboard'
import { useFilters } from './stores/useFilters'

function App() {
  const [view, setView] = useState<'select' | 'dashboard'>('select')
  const { fuelType, coords } = useFilters()

  const handleReady = () => setView('dashboard')
  const handleReset = () => {
    useFilters.getState().reset()
    setView('select')
  }

  if (view === 'dashboard' && fuelType && coords) {
    return <Dashboard onReset={handleReset} />
  }

  return <SelectionScreen onReady={handleReady} />
}

export default App

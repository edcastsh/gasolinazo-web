import { SelectionScreen } from './components/SelectionScreen'
import { Dashboard } from './components/Dashboard'
import { useFilters } from './stores/useFilters'

function App() {
  const { fuelType, coords } = useFilters()

  if (fuelType && coords) {
    return <Dashboard />
  }

  return <SelectionScreen />
}

export default App

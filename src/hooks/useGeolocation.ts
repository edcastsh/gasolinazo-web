import { useState, useCallback } from 'react'

interface GeolocationState {
  coords: { lat: number; lng: number } | null
  loading: boolean
  error: string | null
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    loading: false,
    error: null,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocation is not supported by this browser.' }))
      return
    }

    setState((s) => ({ ...s, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          loading: false,
          error: null,
        })
      },
      (err) => {
        let message = 'Unable to retrieve your location.'
        if (err.code === err.PERMISSION_DENIED) message = 'Location permission denied. Please enable it in your browser settings.'
        if (err.code === err.POSITION_UNAVAILABLE) message = 'Location information is unavailable.'
        if (err.code === err.TIMEOUT) message = 'Location request timed out.'
        setState({ coords: null, loading: false, error: message })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    )
  }, [])

  return { ...state, requestLocation }
}

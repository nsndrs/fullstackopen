import { useState, useEffect } from 'react'

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const useCountries = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(API_URL)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setCountries(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching countries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return { countries, loading, error }
} 
import { useState, useEffect, useMemo } from 'react'
import { useDebounce } from './useDebounce'

export const useCountrySearch = (countries, searchTerm) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  const filteredCountries = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return []
    }
    
    return countries.filter(country =>
      country.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
  }, [countries, debouncedSearchTerm])

  return filteredCountries
} 
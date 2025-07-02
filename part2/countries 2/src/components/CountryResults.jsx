import { useState } from 'react'
import SearchInput from './SearchInput'
import CountryCard from './CountryCard'
import CountryList from './CountryList'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import styles from '../App.module.css'

const MAX_COUNTRIES_TO_SHOW = 10

const CountryResults = ({ 
  countries, 
  loading, 
  error, 
  searchTerm,
  onSearchChange,
  onSelectCountry 
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSelectCountry = (countryName) => {
    // Find the selected country and show it in the right panel
    const country = countries.find(c => c.name.common === countryName)
    if (country) {
      setSelectedCountry(country)
    }
  }

  const renderLeftPanel = () => {
    return (
      <div className={styles.leftPanel}>
        <SearchInput 
          value={searchTerm} 
          onChange={onSearchChange} 
          hasContent={false} // No need for conditional styling anymore
        />
        
        <div className={styles.countryListContainer}>
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage error={error} />}
          
          {!loading && !error && countries.length > MAX_COUNTRIES_TO_SHOW && (
            <div className={styles.message}>
              Too many matches, specify another filter
            </div>
          )}
          
          {!loading && !error && countries.length > 0 && countries.length <= MAX_COUNTRIES_TO_SHOW && (
            <CountryList 
              countries={countries} 
              onSelectCountry={handleSelectCountry} 
            />
          )}
        </div>
      </div>
    )
  }

  const renderRightPanel = () => {
    return (
      <div className={styles.rightPanel}>
        {selectedCountry ? (
          <CountryCard country={selectedCountry} />
        ) : (
          <div className={styles.emptyState}>
            Select a country to view details
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles.card}>
      {renderLeftPanel()}
      {renderRightPanel()}
    </div>
  )
}

export default CountryResults 
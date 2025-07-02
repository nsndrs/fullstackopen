import { useState } from 'react'
import { useCountries, useCountrySearch } from './hooks'
import { CountryResults } from './components'
import styles from './App.module.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const { countries, loading, error } = useCountries()
  const filteredCountries = useCountrySearch(countries, searchTerm)

  return (
    <div className={styles.container}>
      <CountryResults 
        countries={filteredCountries}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelectCountry={setSearchTerm}
      />
    </div>
  )
}

export default App

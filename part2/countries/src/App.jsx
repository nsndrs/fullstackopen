import { useState, useEffect } from 'react'
import axios from 'axios'
import CountrySearch from './components/CountrySearch'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCountries(filtered)
      
      // Automatically select a country when there's only one match
      if (filtered.length === 1) {
        setSelectedCountry(filtered[0])
      } else {
        setSelectedCountry(null)
      }
    } else {
      setFilteredCountries([])
      setSelectedCountry(null)
    }
  }, [searchQuery, countries])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const handleBackToList = () => {
    setSelectedCountry(null)
  }

  const renderCountryInfo = () => {
    if (searchQuery === '') {
      return <p>Type a country name to search</p>
    }
    
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    
    // Show selected country details regardless of how many matches we have
    if (selectedCountry) {
      return <CountryDetails 
        country={selectedCountry} 
        onBack={filteredCountries.length > 1 ? handleBackToList : null}
      />
    }
    
    if (filteredCountries.length > 1) {
      return (
        <CountryList 
          countries={filteredCountries} 
          onShowCountry={handleShowCountry} 
        />
      )
    }
    
    return <p>No matches found</p>
  }

  return (
    <div>
      <CountrySearch 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
      />
      {renderCountryInfo()}
    </div>
  )
}

export default App

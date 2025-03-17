const CountryList = ({ countries, onShowCountry }) => {
  return (
    <div className="country-list">
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShowCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList 
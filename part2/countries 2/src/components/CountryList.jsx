import styles from '../App.module.css'

const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common} className={styles.countryListItem}>
          <span className={styles.countryName}>{country.name.common}</span>
          <button 
            className={styles.showButton}
            onClick={() => onSelectCountry(country.name.common)}
          >
            show
          </button>
        </div>
      ))}
    </div>
  )
}

export default CountryList 
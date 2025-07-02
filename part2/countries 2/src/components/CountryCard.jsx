import styles from '../App.module.css'

const CountryCard = ({ country }) => {
  return (
    <>
      <h2 className={styles.countryTitle}>
        {country.name.common}
      </h2>
      
      <div className={styles.countryInfo}>
        <p className={styles.countryDetail}>
          <span className={styles.detailLabel}>Capital:</span> {country.capital?.[0]}
        </p>
        <p className={styles.countryDetail}>
          <span className={styles.detailLabel}>Area:</span> {country.area?.toLocaleString()} km²
        </p>
      </div>

      <div className={styles.languagesSection}>
        <h3 className={styles.languagesTitle}>
          Languages:
        </h3>
        <div>
          {Object.values(country.languages || {}).map((language) => (
            <span key={language} className={styles.languageTag}>
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.flagContainer}>
        <img 
          src={country.flags.png} 
          alt={`Flag of ${country.name.common}`}
          className={styles.flag}
        />
      </div>
    </>
  )
}

export default CountryCard 
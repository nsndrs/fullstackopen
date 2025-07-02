import styles from '../App.module.css'

const SearchInput = ({ value, onChange, hasContent = false }) => {
  const sectionClass = hasContent ? styles.searchSectionWithContent : styles.searchSection
  
  return (
    <div className={sectionClass}>
      <input
        id="country-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
        placeholder="Start typing to search countries..."
      />
    </div>
  )
}

export default SearchInput 
const CountrySearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div>
      <label>
        find countries <input 
          value={searchQuery} 
          onChange={onSearchChange} 
        />
      </label>
    </div>
  )
}

export default CountrySearch 
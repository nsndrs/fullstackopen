import { useState, useEffect } from 'react'
import personService from './services/personService'
import Notification from './components/Notification'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person => 
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        showNotification('Error fetching phonebook data', 'error')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (newName.trim() === '') {
      return
    }
    
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returnedPerson.name}`)
          })
          .catch(error => {
            console.error('Error updating person:', error)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
          })
      }
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`)
      })
      .catch(error => {
        console.error('Error adding person:', error)
        showNotification('Error adding person to phonebook', 'error')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${name}`)
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Information of ${name} has already been removed from server`, 'error')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App

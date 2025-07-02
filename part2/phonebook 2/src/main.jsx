import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import axios from 'axios'

// Fetch persons data from the JSON server
const promise = axios.get('http://localhost:3001/persons')
console.log('Promise object:', promise)

// Handle the promise to see the actual data
promise.then(response => {
  console.log('Success! Persons data:', response.data)
}).catch(error => {
  console.log('Error fetching persons:', error.message)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

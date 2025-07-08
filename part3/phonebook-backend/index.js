const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Define custom Morgan token for request body
morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

// Morgan middleware with custom format including request body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Initial data (same as your db.json)
let persons = [
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

// Helper function to generate ID
const generateId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

// Routes

// GET all persons
app.get('/persons', (request, response) => {
  response.json(persons)
})

// GET individual person
app.get('/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// POST new person
app.post('/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  
  // Check if person already exists
  const existingPerson = persons.find(person => person.name === body.name)
  if (existingPerson) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  
  persons = persons.concat(person)
  response.json(person)
})

// PUT update person
app.put('/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  
  const personIndex = persons.findIndex(person => person.id === id)
  
  if (personIndex === -1) {
    return response.status(404).json({
      error: 'person not found'
    })
  }
  
  const updatedPerson = {
    id: id,
    name: body.name,
    number: body.number
  }
  
  persons[personIndex] = updatedPerson
  response.json(updatedPerson)
})

// DELETE person
app.delete('/persons/:id', (request, response) => {
  const id = request.params.id
  const initialLength = persons.length
  
  persons = persons.filter(person => person.id !== id)
  
  if (persons.length === initialLength) {
    return response.status(404).json({
      error: 'person not found'
    })
  }
  
  response.status(204).end()
})

// Info endpoint (bonus)
app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
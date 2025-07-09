const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// Middleware
app.use(cors())
app.use(express.static('dist'))
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

// Data is now stored in MongoDB database

// Routes

// GET all persons
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => {
      console.log('Error fetching persons:', error)
      response.status(500).json({ error: 'Failed to fetch persons' })
    })
})

// GET individual person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log('Error fetching person:', error)
      response.status(400).json({ error: 'malformatted id' })
    })
})

// POST new person
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      console.log('Error saving person:', error)
      response.status(500).json({ error: 'Failed to save person' })
    })
})

// PUT update person
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  
  const person = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => {
      console.log('Error updating person:', error)
      response.status(400).json({ error: 'malformatted id' })
    })
})

// DELETE person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  
  Person.findByIdAndDelete(id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => {
      console.log('Error deleting person:', error)
      response.status(400).json({ error: 'malformatted id' })
    })
})

// Info endpoint (bonus)
app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `)
    })
    .catch(error => {
      console.log('Error counting persons:', error)
      response.status(500).json({ error: 'Failed to get info' })
    })
})

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (request, response) => {
  response.sendFile('index.html', { root: 'dist' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
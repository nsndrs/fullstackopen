const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const { connectDB } = require('./utils/db')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const { validatePersonData } = require('./utils/validators')
const Person = require('./models/person')

const app = express()

// Connect to database
connectDB()

// Middleware
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

// Data is now stored in MongoDB database

// Routes

// GET all persons
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

// GET individual person
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST new person
app.post('/api/persons', (request, response, next) => {
  const validation = validatePersonData(request.body)

  if (validation.error) {
    return response.status(400).json({ error: validation.error })
  }

  const person = new Person(validation.data)

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// PUT update person
app.put('/api/persons/:id', (request, response, next) => {
  const validation = validatePersonData(request.body)

  if (validation.error) {
    return response.status(400).json({ error: validation.error })
  }

  Person.findByIdAndUpdate(request.params.id, validation.data, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

// DELETE person
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

// Health check endpoint for Render
app.get('/health', (request, response) => {
  response.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Info endpoint (bonus)
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `)
    })
    .catch(error => next(error))
})

// Handle unknown API endpoints
app.use('/api/*', unknownEndpoint)

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (request, response) => {
  response.sendFile('index.html', { root: 'dist' })
})

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
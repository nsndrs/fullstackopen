const morgan = require('morgan')

// Define custom Morgan token for request body
morgan.token('body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return ''
})

// Request logger middleware
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

// Middleware for unknown API endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Error handler middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  console.error('Error name:', error.name)
  console.error('Error message:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongooseError') {
    return response.status(500).json({ error: 'Database connection error' })
  } else if (error.name === 'MongoNetworkError') {
    return response.status(503).json({ error: 'Database temporarily unavailable' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  } else if (error.code === 11000) {
    // MongoDB duplicate key error
    return response.status(400).json({ error: 'expected field to be unique' })
  }

  // Default error response
  response.status(500).json({ error: 'something went wrong' })
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
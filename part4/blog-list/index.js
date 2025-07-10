const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const { connectDB } = require('./utils/db')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const { validateBlogData } = require('./utils/validators')
const Blog = require('./models/blog')

const app = express()

// Connect to database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

// Routes

// GET all blogs
app.get('/api/blogs', (request, response, next) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

// GET individual blog
app.get('/api/blogs/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findById(id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST new blog
app.post('/api/blogs', (request, response, next) => {
  const validation = validateBlogData(request.body)

  if (validation.error) {
    return response.status(400).json({ error: validation.error })
  }

  const blog = new Blog(validation.data)

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

// PUT update blog
app.put('/api/blogs/:id', (request, response, next) => {
  const validation = validateBlogData(request.body)

  if (validation.error) {
    return response.status(400).json({ error: validation.error })
  }

  Blog.findByIdAndUpdate(request.params.id, validation.data, { new: true, runValidators: true })
    .then(updatedBlog => {
      if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).json({ error: 'blog not found' })
      }
    })
    .catch(error => next(error))
})

// DELETE blog
app.delete('/api/blogs/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findByIdAndDelete(id)
    .then(deletedBlog => {
      if (deletedBlog) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'blog not found' })
      }
    })
    .catch(error => next(error))
})

// Health check endpoint
app.get('/health', (request, response) => {
  response.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Info endpoint
app.get('/info', (request, response, next) => {
  Blog.countDocuments({})
    .then(count => {
      const date = new Date()
      response.send(`
        <p>Blog list has ${count} blogs</p>
        <p>${date}</p>
      `)
    })
    .catch(error => next(error))
})

// Handle unknown API endpoints
app.use('/api/*', unknownEndpoint)

// Default route
app.get('/', (request, response) => {
  response.json({ message: 'Blog List API - Full Stack Open Part 4' })
})

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Blog List server running on port ${config.PORT}`)
})
const express = require('express')
const cors = require('cors')
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

// Only use request logger in non-test environment
if (process.env.NODE_ENV !== 'test') {
  app.use(requestLogger)
}

// Routes
app.get('/api/blogs', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

app.post('/api/blogs', async (request, response, next) => {
  try {
    const validation = validateBlogData(request.body)

    if (validation.error) {
      return response.status(400).json({ error: validation.error })
    }

    const blog = new Blog(validation.data)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/blogs/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    
    if (!deletedBlog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.put('/api/blogs/:id', async (request, response, next) => {
  try {
    const body = request.body
    
    // For updates, we're more lenient - we don't require all fields
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { 
      new: true, 
      runValidators: true 
    })
    
    if (!updatedBlog) {
      return response.status(404).json({ error: 'blog not found' })
    }
    
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

// Health check endpoint
app.get('/health', (request, response) => {
  response.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Handle unknown API endpoints
app.use('/api/*', unknownEndpoint)
app.use(errorHandler)

module.exports = app
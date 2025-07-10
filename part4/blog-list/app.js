const express = require('express')
const config = require('./utils/config')
const { connectDB } = require('./utils/db')
const Blog = require('./models/blog')

const app = express()

// Connect to database
connectDB()

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
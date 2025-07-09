const mongoose = require('mongoose')
const config = require('./config')

const connectDB = () => {
  if (!config.MONGODB_URI) {
    console.log('MongoDB URI not provided. Set MONGODB_URI environment variable.')
    process.exit(1)
  }

  console.log('Connecting to MongoDB...')

  mongoose.set('strictQuery', false)

  return mongoose.connect(config.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message)
      process.exit(1)
    })
}

module.exports = { connectDB }
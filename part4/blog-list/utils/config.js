require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI

// Validate required environment variables
if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required')
  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }
}

module.exports = {
  PORT,
  MONGODB_URI
}
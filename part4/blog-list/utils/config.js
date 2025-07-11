require('dotenv').config()

const PORT = process.env.PORT || 3003

// Use different database for testing
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI || process.env.MONGODB_URI
  : process.env.MONGODB_URI

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
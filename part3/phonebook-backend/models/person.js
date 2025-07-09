const mongoose = require('mongoose')

// Get the password from environment variable, fallback to process.argv for now
const password = process.env.MONGODB_PASSWORD || process.argv[2]

if (!password) {
  console.log('MongoDB password not provided. Set MONGODB_PASSWORD environment variable.')
  process.exit(1)
}

const url = `mongodb+srv://nicholassanders11:${password}@part3.dyhczg2.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Part3`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Transform the JSON representation of the object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema) 
const mongoose = require('mongoose')

// Get the password from environment variable, fallback to process.argv for development
const password = process.env.MONGODB_PASSWORD || process.argv[2]

if (!password) {
  console.log('MongoDB password not provided. Set MONGODB_PASSWORD environment variable.')
  console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('MONGO')))
  process.exit(1)
}

console.log('Connecting to MongoDB with password:', password ? 'password found' : 'no password')

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
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function(v) {
        // Phone number validation: must be formatted like 09-1234556 or 040-22334455
        // First part: 2-3 digits, second part: any number of digits
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Phone number must be formatted like 09-1234556 or 040-22334455`
    }
  }
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
const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.URL

mongoose
  .connect(url)
  .then(() => console.log('\x1b[32mconnected to MongoDB\x1b[37m'))
  .catch(() => console.log('\x1b[31mfailed to connect\x1b[37m'))


const personSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{3,10}/.test(v)
      },
      message: props => `${props.value} is not a valid number`
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
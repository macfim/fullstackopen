const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()

const app = express()

morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person
    .findOne({name: body.name})
    .then(result => {
      
      if (!result) {
        const newPerson = new Person({
          name: body.name,
          number: body.number
        })
      
        newPerson
          .save()
          .then(result => {
            response.json(result)
          })
          .catch(error => next(error))
      }
      else response.json({error: 'name already exist'})
    })

  
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  
  Person
    .findByIdAndUpdate(id, {number: body.number}, {new: true, runValidators: true})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person
    .findById(id)
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person
    .findByIdAndDelete(id)
    .then(() => {
      response
        .status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {

  Person.count().then(count => {
    response.send(
      `<p>Phonebook has info for ${count} people.</p><br/>${new Date()}`
    )
  })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('alive on http://localhost:3001')
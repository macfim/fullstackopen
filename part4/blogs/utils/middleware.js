const logger = require('./logger')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const requestLogger = (request, response, next) => {
  logger.log('Method:', request.method)
  logger.log('Path:  ', request.path)
  logger.log('Body:  ', request.body)
  logger.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  ;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  ;
  }  
  return null;
}

const tokenExtract = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
}

const userExtract = (request, response, next) => {
  const token = getTokenFrom(request);
  if (!token) return;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  request.user = decodedToken;
  next();
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtract,
  userExtract
}
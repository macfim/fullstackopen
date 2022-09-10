const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const express = require('express');
const app = express();
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const testRouter = require('./controllers/test');
const cors = require('cors');
const middleware = require('./utils/middleware');

const url = config.MONGODB_URI;

logger.info('connecting to:', url);

mongoose
  .connect(url)
  .then(() => logger.info('connected to MongoDB'))
  .catch(() => logger.error('failed to connect'))

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/testing', testRouter);

app.use(middleware.tokenExtract);

app.use('/api/blogs', middleware.userExtract, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

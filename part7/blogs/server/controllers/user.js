const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('express-async-errors');

userRouter.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs');
  response.json(result);
})

userRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body;

  if (!username || !password) return response.status(400).end();
  if (username.length < 3 || password.length < 3) return response.status(400).end();
  
  const searchUsername = await User.findOne({username: username});

  if (searchUsername) return response.status(400).json({
    error: 'username already exists'
  });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
})

module.exports = userRouter;
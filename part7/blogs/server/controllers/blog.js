const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('express-async-errors');
require('dotenv').config();

blogRouter.get('/', async (request, response) => {

  const result = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })
    ;

  response.json(result)
})

blogRouter.post('/', async (request, response) => {

  const body = request.body;
  const token = request.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id)
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  ;

  const user = await User.findById(decodedToken.id);
  
  if (!user) return response.status(400).send();
  if (!body.author || !body.url) return response.status(400).send();

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
    comments: []
  })

  const savedBlog = await newBlog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
})

blogRouter.delete('/:id', async (request, response) => {

  const id = request.params.id;
  const token = request.token;

  if (!request.token) 
    return response.status(401).json({
      error: 'token missing or invalid'
    });
  ;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(id);

  if (!(user.id.toString() === blog.user.toString()))
    return response.status(401).response({
      error: 'unauthorized user'
    })
  ; 

  await Blog.findByIdAndDelete(id);
  user.blogs = user.blogs.filter(item => item.id !== id)
  await user.save();

  response.status(200).end();
})

blogRouter.put('/:id', async (request, response) => {

  const id = request.params.id;
  const body = request.body;
  const token = request.token;

  const blog = await Blog.findById(id);

  const res = await Blog.findByIdAndUpdate(id, body, { new: true });
  response.json(res);
})

blogRouter.post('/:id/comments', async (request, response) => {

  const id = request.params.id;
  const newComment = request.body.comment;

  const blog = await Blog.findById(id);
  blog.comments = [...blog.comments, newComment];

  const res = await blog.save();
  response.status(201).json(res);
})

module.exports = blogRouter;
const Blog = require('../models/blog');
const User = require('../models/user');

const initalBlogs = [
  {
    title: 'joemama',
    author: 'unknown',
    url: 'missing',
    likes: 3035
  },
  {
    title: 'banana',
    author: 'adsf',
    url: 'adsfasd',
    likes: 325325
  }
];

const initialUsers = [
  {
    username: 'admin',
    name: 'admin'
  },
  {
    username: 'test',
    name: 'test'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(item => item.toJSON());
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(item => item.toJSON())
}

module.exports = {
  initalBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
}
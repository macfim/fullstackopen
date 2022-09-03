const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const logger = require('../utils/logger');
const Blog = require('../models/blog');
const User = require('../models/User');
const helper = require('./test_helper');

const api = supertest(app);

const initalBlogs = helper.initalBlogs;

describe('blog api', () => {

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});    

    const blogs = initalBlogs.map(item => {
      return new Blog(item);
    })
    
    await (blogs.map(item => item.save()));
  }, 1000000)

  test('returns a response as json', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('returns a defined id', async () => {

    const response = await api.get('/api/blogs');
    
    response.body.map(item => {
      expect(item.id).toBeDefined()
    })
  }, 100000)

  test('successfly add a new blog to the database', async () => {

    const res = await api.get('/api/blogs');
    const initalLength = res.body.length;

    const newUser = {
      username: 'username',
      name: 'name',
      password: 'password'
    }

    const res0 = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
    ;

    const userId = res0.body.id;
    const token = request.token;

    const blogExample = {
      title: 'blogtitle',
      author: 'blogauthor',
      url: 'blogurl',
      likes: 10,
      userId: userId
    }

    await api
      .post('/api/blogs')
      .send(blogExample)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs');
    
    const check = response.body.some(item => {
      return item.title === blogExample.title
        && item.author === blogExample.author
        && item.url === blogExample.url
        && item.likes === blogExample.likes
        && item.user === userId
    })

    expect(response.body).toHaveLength(initalLength + 1);
    expect(check).toEqual(true);
  }, 100000)

  test('post fail if token is invalid', async () => {

    const newUser = {
      "username": "user",
      "password": "pass"
    }

    const res0 = await api
      .post('/api/users')
      .send(newUser)
    ;

    const userId = res0.body.id;

    const blogExample = {
      title: 'blogtitle',
      author: 'blogauthor',
      url: 'blogurl',
      likes: 10,
      userId: userId
    }

    const res = await api
      .post('/api/blogs')
      .send(blogExample)
      .set('Authorization', 'adsfadf')
      .expect(400)
    ;
  }, 10000)

  test('check if likes default to 0 if missing', async () => {

    const blogExample = {
      title: 'blogtesttitle',
      author: 'blogtesttitle',
      url: 'blogtesturl'
    }

    const response = await api
      .post('/api/blogs')
      .send(blogExample)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0);
  }, 100000)

  test('verify if author & url are defined in post', async () => {

    const blogExample = {
      title: 'squirel'
    }

    const response = await api
      .post('/api/blogs')
      .send(blogExample)
      .expect(400)

  }, 100000)

  test('verify if blog with id is deleted', async () => {

    const blogExample = {
      title: 'testduck',
      author: 'testduck',
      url: 'testduck',
      likes: 1000
    }
    // add new blog
    const res0 = await api
      .post('/api/blogs')
      .send(blogExample)
      .expect(201)

    const id = res0.body.id;

    // check current length of blogs
    const res1 = await api
      .get('/api/blogs')

    const initialLength = res1.body.length;
    
    // delete added blog
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    // get blogs list
    const res2 = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res2.body).toHaveLength(initialLength - 1);
  }, 100000)

  test('updating a blog is successfull', async () => {

    const blogExample = {
      title: 'duckNeedUpdate',
      author: 'duck',
      url: 'duck',
      likes: 0
    }

    const res = await api
      .post('/api/blogs')
      .send(blogExample)
      .expect(201)

    const id = res.body.id;

    const toUpdate = {
      title: 'duck',
      likes: 1000
    }

    const res1 = await api
      .put(`/api/blogs/${id}`)
      .send(toUpdate)
      .expect(200)

    expect(res1.body.id).toEqual(id);
    expect(res1.body.title).toEqual(toUpdate.title);
    expect(res1.body.likes).toEqual(toUpdate.likes);
  }, 100000)

  afterAll(() => {
    mongoose.connection.close();
    logger.info('deconected')
  })
})

const User = require('../models/user');
const app = require('../app');
const helper = require('./test_helper');

const supertest = require('supertest');
const mongoose = require('mongoose');
     
const api = supertest(app);

const initialUsers = helper.initialUsers;

describe('user api', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  })

  describe('GET', () => {

    test('get list of users', async () => {

      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      ;
  
      expect(response.body).toBeDefined();
    }, 100000)
  })

  describe('POST', () => {

    test('password is send but not returned', async () => {

      const newUser = {
        username: 'username',
        name: 'name',
        password: 'password'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
      ;

      expect(response.body.password).toBeUndefined();
    }, 100000)

    // test('username & password are valid', async () => {

    //   const newUser = {
    //     username: 'crazy',
    //     name: 'donkty',
    //     password: 'ga3dga'
    //   }

    //   const res = await api
    //     .post('/api/users')
    //     .send(newUser)
    //     .expect(201)
    //   ;

    //   const {username, password} = res.body;

      
    // }, 10000)

    describe('get 400 status code', () => {

      test('if username exists', async () => {

        const newUser = {
          username: 'alreadytaken',
          name: 'x',
          password: 'dasfafd'
        }
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
        ;
  
        await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
        ;
      }, 100000)

      test('if username and/or password are not inserted', async () => {

        const newUsers = [
          {
            name: 'donkey'
          },
          {
            name: 'rabbit',
            username: 'rabibit2012'
          },
          {
            name: 'fly',
            password: 'fly123'
          }
        ];

        await newUsers.map(item => {
          api
            .post('/api/users')
            .send(item)
            .expect(400)
        });
      }, 100000)

      test('if username and/or password are invalid', async () => {

        const newUser0 = {
          username: 'a',
          name: 'adsfa',
          password: 'dadsfadsf'
        }

        await api
          .post('/api/users')
          .send(newUser0)
          .expect(400)
        ;
      }, 100000)
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
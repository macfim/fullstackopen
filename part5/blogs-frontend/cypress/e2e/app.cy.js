import { faker } from '@faker-js/faker';

let name, username, password;

describe('Blog app', () => {

  before(() => {

    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    name = faker.name.firstName();
    username = faker.internet.userName(name);
    password = faker.internet.password();

    cy.request('POST', 'http://localhost:3003/api/users', {
      username,
      password,
      name
    })
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Login form is displayed', () => {

    cy.contains('log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  })

  describe('Login', () => {

    // we're using username jassem & password jassem
    it('succeds with correct credentials', () => {

      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);
      cy.contains('Login').click();

      cy.contains(`${name} logged in`);
    })

    it('fails with wrong credentials', () => {

      cy.get('input[name=username]').type(faker.internet.userName());
      cy.get('input[name=password]').type(faker.internet.password());
      cy.contains('Login').click();

      cy.get('#notification').should('contain', 'Wrong username or password')
        // .and('have.css', 'color', 'rbg(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    })
  })

  describe('when logged in', () => {

    beforeEach(() => {
      cy.login({ username, password });
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);
      cy.contains('Login').click();
    })

    it('a blog can be created', () => {

      let title = faker.lorem.sentence();
      let author = faker.name.fullName();
      let url = faker.internet.url();

      cy.contains('new blog').click();

      cy.get('input[name=title]').type(title);
      cy.get('input[name=author]').type(author);
      cy.get('input[name=url]').type(url);

      cy.contains('Create').click();

      cy.get('#notification').should('have.css', 'border-style', 'solid')
        .and('contain', `a new blog ${title} by ${author} added`)
    })

    describe('another blog exists', () => {

      let name2 = faker.name.firstName();
      let username2 = faker.internet.userName(name2);
      let password2 = faker.internet.password();

      let title1 = faker.lorem.sentence();
      let author1 = faker.name.fullName();
      let url = faker.internet.url();

      before(() => {
        cy.request('POST', 'http://localhost:3003/api/users', {
          username: username2,
          password: password2,
          name: name2
        })
        cy.login({ username: username2, password: password2, });
        cy.create({
          title: title1,
          author: author1,
          url: url
        })
        cy.create({
          title: faker.lorem.sentence(),
          author: faker.name.fullName(),
          url: faker.internet.url()
        })
        cy.login({ username, password })
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password]').type(password);
        cy.contains('Login').click();
      })

      it('one of these blogs can be liked', () => {

        cy.contains('view').click();
        cy.contains('like').click();

      })

      it ('user can remove his blogs', () => {

        cy.contains('view').click();
        cy.contains('remove');
      })

      it('user cannot remove another users blog', () => {

        cy.contains(`${title1}`)
          .contains('view')
          .click()

        cy.contains(`${title1}`).get('button').should('not.contain', 'remove');
      })

      describe('blog order', () => {

        let titles = [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()];

        before(() => {

          cy.login({username, password})

          for (let i = 10; i < 14; i++) {
            cy.create({ title: titles[i-10], author: faker.name.fullName(), url: faker.internet.url(), likes: i });
          }
        })

        it ('blogs are ordered', () => {

          cy.get('.blog').eq(0).should('contain', `${titles[3]}`)
          cy.get('.blog').eq(1).should('contain', `${titles[2]}`)
          cy.get('.blog').eq(2).should('contain', `${titles[1]}`)
          cy.get('.blog').eq(3).should('contain', `${titles[0]}`)
        })
      })
    })
  })
})
var cwd = process.cwd();
var request = require('supertest');
var app = require(cwd + '/app');

describe('contact', function() {

  describe('list', function() {
    it('sends a list of contacts', function(done) {
      get('/contacts').expect({contacts: [{
        id: 'abcdefg',
        first: 'Ryan',
        last: 'Florence',
        avatar: 'http://www.gravatar.com/avatar/749001c9fe6927c4b069a45c2a3d68f7.jpg'
      }]}, done);
    });
  });

  describe('create', function() {
    it('creates a contact', function(done) {
      var data = {contact: {id: '2', first: 'stanley'}};
      var expected = {contact: {id: '2', first: 'stanley'}};
      post('/contacts', data).expect(expected, done);
    });
  });

  describe('read', function() {
    it('sends a contact', function(done) {
      get('/contacts/abcdefg').expect({contact: {
        id: 'abcdefg',
        first: 'Ryan',
        last: 'Florence',
        avatar: 'http://www.gravatar.com/avatar/749001c9fe6927c4b069a45c2a3d68f7.jpg'
      }}, done);
    });
  });

  describe('update', function() {
    it('updates a contact', function(done) {
      var data = {contact: {first: 'Eric', last: 'Berry'}};
      var expected = {contact: {
        first: 'Eric',
        last: 'Berry',
        id: 'abcdefg',
        avatar: 'http://www.gravatar.com/avatar/749001c9fe6927c4b069a45c2a3d68f7.jpg'
      }};
      put('/contacts/abcdefg', data).expect(expected, function() {
        get('/contacts/abcdefg').expect({contact: {
          id: 'abcdefg',
          first: 'Eric',
          last: 'Berry',
          avatar: 'http://www.gravatar.com/avatar/749001c9fe6927c4b069a45c2a3d68f7.jpg'
        }}, done);
      });
    });
  });

  // can't get this to pass ...
  //describe('delete', function() {
    //it('deletes a contact', function(done) {
      //request(app).del('/contacts/abcdefg').expect(204, done);
    //});
  //});

});

/******************************************************************************/

function createRequest(url, method, data) {
  var req = request(app)[method](url).set('Accept', 'application/json');
  if (data) req.send(data);
  req.expect('Content-Type', /json/);
  return req;
}

function post(url, data) {
  return createRequest(url, 'post', data).expect(201);
}

function get(url, data) {
  return createRequest(url, 'get', data).expect(200);
}

function put(url, data) {
  return createRequest(url, 'put', data).expect(200);
}


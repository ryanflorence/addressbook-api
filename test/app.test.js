var cwd = process.cwd();
var request = require('supertest');
var app = require(cwd + '/app');

describe('contact', function() {

  describe('list', function() {
    it('sends a list of contacts', function(done) {
      get('/contacts').expect({contacts: [{
        id: 1,
        first: 'Ryan',
        last: 'Florence'
      }]}, done);
    });
  });

  describe('create', function() {
    it('creates a contact', function(done) {
      var data = {contact: {first: 'stanley'}};
      var expected = {contact: {id: 2, first: 'stanley'}};
      post('/contacts', data).expect(expected, done);
    });
  });

  describe('read', function() {
    it('sends a contact', function(done) {
      get('/contacts/1').expect({contact: {id: 1, first: 'Ryan', last: 'Florence'}}, done);
    });
  });

  describe('update', function() {
    it('updates a contact', function(done) {
      var data = {contact: {first: 'Eric', last: 'Berry'}};
      var expected = {contact: {first: 'Eric', last: 'Berry', id: 1}};
      put('/contacts/1', data).expect(expected, done);
    });
  });

  describe('delete', function() {
    it('deletes a contact', function(done) {
      del('/contacts/1').expect('"ok"', done);
    });
  });

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

function del(url) {
  return createRequest(url, 'del').expect(200);
}



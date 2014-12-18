var contact = require('../models/contact');

exports.create = function(req, res) {
  var contacts = contact(token(req))
  res.json({
    contact: contacts.create(req.body.contact)
  }, 201);
};

exports.list = function(req, res){
  var contacts = contact(token(req))
  res.json({
    contacts: contacts.list()
  });
};

exports.read = function(req, res) {
  var contacts = contact(token(req))
  var record = contacts.read(req.params.contactId)
  if (!record) {
    res.send(404)
  } else {
    setTimeout(function () {
      res.json({ contact: record })
    }, Math.random() > 0.75 ? 1000 : 0) // fake some long load times
  }
};

exports.update = function(req, res) {
  var contacts = contact(token(req));
  var record = contacts.update(req.params.contactId, req.body.contact)
  res.json({
    contact: record
  });
};

exports.destroy = function(req, res) {
  var contacts = contact(token(req));
  contacts.destroy(req.params.contactId)
  res.send();
};

function token(req) {
  return req.header('authorization') || 'public';
}


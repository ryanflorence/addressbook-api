var contact = require('../models/contact');

exports.create = function(req, res) {
  var contacts = contact(token(req));
  res.json({
    contact: contacts.create(req.body.contact)
  }, 201);
};

exports.list = function(req, res){
  var contacts = contact(token(req));
  res.json({
    contacts: contacts.list()
  });
};

exports.read = function(req, res) {
  var contacts = contact(token(req));
  var record = contacts.read(req.params.contactId);
  if (!record) {
    res.send(404);
  } else {
    res.json({ contact: record });
  }
};

exports.update = function(req, res) {
  var contacts = contact(token(req));
  var record = contacts.update(req.params.contactId, req.body.contact);
  res.json({
    contact: record
  });
};

exports.destroy = function(req, res) {
  var contacts = contact(token(req));
  if (req.params.contactId === 'jack') {
    res.send(500, 'You cannot destroy Jack Bauer');
  } else {
    contacts.destroy(req.params.contactId);
    res.send();
  }
};

function token(req) {
  return req.header('authorization') || 'public';
}


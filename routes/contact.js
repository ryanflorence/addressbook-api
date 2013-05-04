// TODO: abstract this silly ensureUser stuff
//
var contact = require('../models/contact');

exports.create = function(req, res) {
  var contacts = contact(ip(req));
  res.json({
    contact: contacts.create(req.body.contact)
  }, 201);
};

exports.list = function(req, res){
  var contacts = contact(ip(req));
  res.json({
    contacts: contacts.list()
  });
};

exports.read = function(req, res) {
  var contacts = contact(ip(req));
  res.json({
    contact: contacts.read(req.params.contactId)
  });
};

exports.update = function(req, res) {
  var contacts = contact(ip(req));
  var record = contacts.update(req.params.contactId, req.body.contact);
  res.json({
    contact: record
  });
};

exports.destroy = function(req, res) {
  var contacts = contact(ip(req));
  contacts.destroy(req.params.contactId);
  res.send();
};

function ip(req) {
  return req.header('x-forwarded-for') || req.connection.remoteAddress;
}


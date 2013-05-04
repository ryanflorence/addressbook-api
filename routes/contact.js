var contact = require('../models/contact')

exports.create = function(req, res) {
  res.json({contact: contact.create(req.body.contact)}, 201);
}

exports.list = function(req, res){
  res.json({contacts: contact.list()})
}

exports.read = function(req, res) {
  res.json({contact: contact.read(req.params.contactId)})
}

exports.update = function(req, res) {
  debugger;
  var record = contact.update(req.params.contactId, req.body.contact)
  res.json({contact: record})
}

exports.destroy = function(req, res) {
  contact.destroy(req.params.contactId)
  res.json('ok')
}


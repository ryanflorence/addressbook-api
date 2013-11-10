
/**
 * Module dependencies.
 */

var express = require('express')
var contact = require('./routes/contact')
var http = require('http')
var path = require('path')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
})
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express['static'](path.join(__dirname, 'public')))
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}
app.get('/contacts', contact.list)
app.post('/contacts', contact.create)
app.get('/contacts/:contactId', contact.read)
app.put('/contacts/:contactId', contact.update)
app.del('/contacts/:contactId', contact.destroy)

app.get('/contacts.json', contact.list)
app.post('/contacts.json', contact.create)
app.get('/contacts/:contactId.json', contact.read)
app.put('/contacts/:contactId.json', contact.update)
app.del('/contacts/:contactId.json', contact.destroy)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app

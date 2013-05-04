var gid = 0
var all = []
var map = {}

exports.list = function() {
  return all;
}

exports.create = function(model) {
  model.id = gid += 1
  all.push(model)
  map[model.id] = model
  return model
}

exports.read = function(id) {
  return map[id] || null
}

exports.update = function(id, props) {
  var model = map[id]
  if (!model)
    return null
  for (var key in props)
    model[key] = props[key]
  return model
}

exports.destroy = function(id) {
  return erase(all, map[id])
}

function erase(arr, item) {
  var index = arr.indexOf(item)
  if (index == -1)
    return false
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] === item) {
      arr.splice(i, 1)
      break
    }
  }
  return true
}

exports.create({first: 'Ryan', last: 'Florence'})


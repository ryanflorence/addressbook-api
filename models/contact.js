var ips = {};

module.exports = function(ip) {
  if (ips[ip])
    return ips[ip];

  var all = [];
  var map = {};
  var exports = ips[ip] = {};

  exports.list = function() {
    return all;
  };

  exports.create = function(model) {
    model.id = model.id || uuid();
    all.push(model);
    map[model.id] = model;
    return model;
  };

  exports.read = function(id) {
    return map[id] || null;
  };

  exports.update = function(id, props) {
    var model = map[id];
    if (!model)
      return null;
    for (var key in props)
      model[key] = props[key];
    return model;
  };

  exports.destroy = function(id) {
    return erase(all, map[id]);
  };

  exports.create({
    id: 'abcdefg',
    first: 'Ryan',
    last: 'Florence',
    avatar: 'http://www.gravatar.com/avatar/749001c9fe6927c4b069a45c2a3d68f7.jpg'
  });

  return exports;
};

function erase(arr, item) {
  var index = arr.indexOf(item);
  if (index == -1)
    return false;
  for (var i = 0; i < arr.length; i += 1) {
    if (arr[i] === item) {
      arr.splice(i, 1);
      break;
    }
  }
  return true;
}

function uuid() {
  return Math.random().toString(32).slice(2).substr(0,5);
}


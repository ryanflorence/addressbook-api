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
    erase(all, map[id]);
    delete map[id];
    return;
  };

  exports.create({
    id: 'ryan',
    first: 'Ryan',
    last: 'Florence',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/ryan.jpg'
  });

  exports.create({
    id: 'jeremy',
    first: 'Jeremy',
    last: 'Ashkenas',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/jeremy.jpg'
  });

  exports.create({
    id: 'yehuda',
    first: 'Yehuda',
    last: 'Katz',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/yehuda.jpg'
  });

  exports.create({
    id: 'tom',
    first: 'Tom',
    last: 'Dale',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/tom.jpg'
  });

  exports.create({
    id: 'pete',
    first: 'Pete',
    last: 'Hunt',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/pete.jpg'
  });

  exports.create({
    id: 'misko',
    first: 'Misko',
    last: 'Hevery',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/misko.png'
  });

  exports.create({
    id: 'scott',
    first: 'Scott',
    last: 'Miles',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/scott.png'
  });

  exports.create({
    id: 'matt',
    first: 'Matt',
    last: 'Zabriskie',
    avatar: 'http://ryanflorence.com/jsconf-avatars/avatars/matt.jpeg'
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


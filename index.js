var toCamelCase = require('to-camel-case');

var s = setup();

module.exports = style;
module.exports.setup = setup;
module.exports.hide = effect('display', 'none');
module.exports.show = effect('display', 'initial');

function all(element, css) {
  var name;
  for ( name in css ) {
    one(element, name, css[name]);
  }
}

function effect(name, value) {
  return function (element, override) {
    style(element, name, arguments.length > 1 ? override : value);
  };
}

function one(element, name, value) {
  if( typeof value == 'number' )
    value += s.numberAppend;

  element.style[toCamelCase((name == 'float') ? 'cssFloat' : name)] = value;
}

function setup(settings) {
  var s = settings || {};

  s.numberAppend = s.numberAppend || 'px';

  return s;
}

function style(element) {
  if (arguments.length == 3) {
    return one(element, arguments[1], arguments[2]);
  }

  return all(element, arguments[1]);
}

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

  var propName = toCamelCase((name == 'float') ? 'cssFloat' : name);

  if (s.suffix[propName] && typeof value == 'number')
    value += s.suffix[propName];

  element.style[propName] = value;
}

function setup(settings) {
  var s = settings || {},
      p = 'px';

  //the following suffix map is what TweenLite uses: https://github.com/greensock/GreenSock-JS
  s.suffix = s.suffix || {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};;

  return s;
}

function style(element) {
  if (arguments.length == 3) {
    return one(element, arguments[1], arguments[2]);
  }

  return all(element, arguments[1]);
}

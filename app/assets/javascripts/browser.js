var React = require('react');
var App = require('./App.react');

module.exports = function() {
  var div = document.createElement('div');
  document.body.insertBefore(div, document.body.childNodes[0]);
  React.render(<App />, div);
};

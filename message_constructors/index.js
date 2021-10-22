let Message_constructors = {

}
exports.Message_constructors = Message_constructors;

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    //exports[name] = require('./' + file)[name];
	Message_constructors[name] = require('./' + file)[name]
  }
});





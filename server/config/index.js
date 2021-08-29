var fs = require('fs');
var path = require('path');
var app = function () {
	switch (process.env.NODE_ENV) {
		case 'default':
			return JSON.parse(fs.readFileSync(path.resolve(__dirname,'default.json')));
			break;
		default:
			return JSON.parse(fs.readFileSync(path.resolve(__dirname,'default.json')));
	}
};

module.exports = app();
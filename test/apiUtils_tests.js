var utils = require('../utils/apiUtils.js'),
	app = require('../app.js'),
	should = require('should');

describe('apiUtils tests', function(){
	it('debe retornar url completa', function(){
		var url = utils.getUrl(app, 'cuen/tas/', '12345');

		url.should.be.equal('http://' + app.url + '/cuentas/12345');
	});

	it('debe retornar url sin opciones', function(){
		var url = utils.getUrl(app, 'cuentas');

		url.should.be.equal('http://' + app.url + '/cuentas/');
	});	
});
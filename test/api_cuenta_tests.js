var request   = require('supertest'),
    app = require('../app.js'),
    should = require('should'),
    fixtures = require('mongoose-fixtures'),
    apiUtils = require('../utils/apiUtils.js');

var CuentaModel = require('../models/cuenta.js').model;  

describe('cuenta api', function(){
    before(function(){
        fixtures.load(__dirname + '/fixtures');
    });

     it('debe retornar 2 cuentas', function(done){
        request(app)
            .get('/api/cuentas/')
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res){                    
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        var json = JSON.parse(res.text);                                        
                        json.length.should.be.equal(2);
                        json[0].codigo.should.be.equal('1000110');
                        json[0].nombre.should.be.equal('Cuenta Corriente');
                        json[1].codigo.should.be.equal('1000111');
                        json[1].nombre.should.be.equal('Banco');                    
                        done();                        
                    }
                });
        });         

     it('post: nueva cuenta', function(done){
        var cuenta = new CuentaModel();
        cuenta.codigo = '212121';
        cuenta.nombre = 'Cuenta de prueba';
        cuenta.plandecuentas = "4eed2d88c3dedf0d0300001c",
        cuenta.cuentamadre = "4eed2d88c3dedf0d0300001c",

        request(app)
            .post('/api/cuentas/')
            .send(cuenta)
            .expect(201)            
            .expect('Location', apiUtils.getUrl(app, 'cuentas', cuenta.codigo))
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        done();
                    }
                });
        });

     it('put: actualizar cuenta existente debe retornar encabezado html 200', function(done){
        var cuenta = new CuentaModel();
        cuenta.codigo = '1000110';
        cuenta.nombre = 'Cuenta Corriente modificada';
        cuenta.plandecuentas = "4eed2d88c3dedf0d0300001c",
        cuenta.cuentamadre = "4eed2d88c3dedf0d0300001c",

        request(app)
            .put('/api/cuentas/')
            .send(cuenta)
            .expect(200)
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        done();
                    }                
                });
        });     

     it('put: actualizar cuenta que no existe debe retornar encabezado html 500', function(done){
        var cuenta = new CuentaModel();
        cuenta.codigo = '33221';
        cuenta.nombre = 'Cuenta de prueba';
        cuenta.plandecuentas = "4eed2d88c3dedf0d0300001c",
        cuenta.cuentamadre = "4eed2d88c3dedf0d0300001c",

        request(app)
            .put('/api/cuentas/')
            .send(cuenta)
            .expect(404)
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        done();
                    }                                
                });
        });
   });

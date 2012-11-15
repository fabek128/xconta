var request   = require('supertest'),
    app = require('../app.js'),
    should = require('should'),
    fixtures = require('mongoose-fixtures'),
    apiUtils = require('../utils/apiUtils.js');

var EjerciciosModel = require('../models/ejercicio.js').model;  
var PlanDeCuentasModel = require('../models/plandecuentas.js').model; 

describe('ejercicio api', function(){
    before(function(){
        //fixtures.load(__dirname + '/fixtures');
        fixtures.load(__dirname + '/fixtures/ejercicio.js');
    });

     it('debe retornar 2 ejercicios', function(done){
        request(app)
            .get('/api/ejercicios/')
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        var json = JSON.parse(res.text);                                        
                        json.length.should.be.equal(2);
                        json[0].codigo.should.be.equal('11112121');
                        json[0].nombre.should.be.equal('Ejercicio 2011');
                        json[1].codigo.should.be.equal('131221');
                        json[1].nombre.should.be.equal('Ejercicio 2012');                    
                        done();                        
                    }
                });
        });         

     it('post: nuevo ejercicio', function(done){
        var ejercicio = new EjerciciosModel();
        ejercicio.codigo = '144232';
        ejercicio.nombre = 'Ejercicio de Prueba';
        ejercicio.plandecuentas = "4eed2d88c3dedf0d0300001c",
        ejercicio.fechaDesde = new Date(2011/1/1);
        ejercicio.fechaHasta = new Date(2012/1/1);

        request(app)
            .post('/api/ejercicios/')
            .send(ejercicio)
            .expect(201)            
            .expect('Location', apiUtils.getUrl(app, 'ejercicios', ejercicio.codigo))
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        done();
                    }
                });
        });

     it('put: actualizar ejercicio existente debe retornar encabezado html 200', function(done){
        var ejercicio = new EjerciciosModel();
        ejercicio.codigo = '11112121';
        ejercicio.nombre = 'Ejercicio de Prueba1';
        ejercicio.plandecuentas = "4eed2d88c3dedf0d0300001c",
        ejercicio.fechaDesde = new Date(2011/1/1);
        ejercicio.fechaHasta = new Date(2012/1/1);

        request(app)
            .put('/api/ejercicios/')
            .send(ejercicio)
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

     it('put: actualizar ejercicio que no existe debe retornar encabezado html 500', function(done){
        var ejercicio = new EjerciciosModel();
        ejercicio.codigo = '999999';
        ejercicio.nombre = 'xxxxxxx';
        ejercicio.plandecuentas = "4eed2d88c3dedf0d0300001c",
        ejercicio.fechaDesde = new Date(2011/1/1);
        ejercicio.fechaHasta = new Date(2012/1/1);

        request(app)
            .put('/api/ejercicios/')
            .send(ejercicio)
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

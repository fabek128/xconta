var request   = require('supertest'),
    app = require('../app.js'),
    should = require('should'),
    fixtures = require('mongoose-fixtures'),
    apiUtils = require('../utils/apiUtils.js');

var PeriodosModel = require('../models/periodo.js').model;  

describe('periodos api', function(){
    before(function(){
        fixtures.load(__dirname + '/fixtures');
    });

     it('debe retornar 2 periodos', function(done){
        request(app)
            .get('/api/periodos/')
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        var json = JSON.parse(res.text);                                        
                        json.length.should.be.equal(2);
                        json[0].codigo.should.be.equal('554');
                        json[0].nombre.should.be.equal('Periodo Oct');
                        json[1].codigo.should.be.equal('345');
                        json[1].nombre.should.be.equal('Periodo Nov');                    
                        done();                        
                    }
                });
        });         

     it('post: nuevo periodo', function(done){
        var periodo = new PeriodosModel();
        periodo.codigo = '2332';
        periodo.nombre = 'Periodo de Prueba';
        periodo.ejercicio = "4eed2d88c3dedf0d0300001c",
        periodo.fechaDesde = new Date(2011/1/1);
        periodo.fechaHasta = new Date(2011/2/1);

        request(app)
            .post('/api/periodos/')
            .send(periodo)
            .expect(201)            
            .expect('Location', apiUtils.getUrl(app, 'periodos', periodo.codigo))
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
        var periodo = new PeriodosModel();
        periodo.codigo = '2332';
        periodo.nombre = 'Periodo de Prueba1';
        periodo.ejercicio = "4eed2d88c3dedf0d0300001c";
        periodo.fechaDesde = new Date(2011/1/1);
        periodo.fechaHasta = new Date(2011/2/1);

        request(app)
            .put('/api/periodos/')
            .send(periodo)
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
        var periodo = new PeriodosModel();
        periodo.codigo = '99999';
        periodo.nombre = 'Periodo de Prueba1';
        periodo.ejercicio = "4eed2d88c3dedf0d0300001c";
        periodo.fechaDesde = new Date(2011/1/1);
        periodo.fechaHasta = new Date(2011/2/1);

        request(app)
            .put('/api/periodos/')
            .send(periodo)
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

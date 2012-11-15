var request   = require('supertest'),
    app = require('../app.js'),
    should = require('should'),
    fixtures = require('mongoose-fixtures'),
    apiUtils = require('../utils/apiUtils.js');

var AsientoModel = require('../models/asiento.js').model;  

describe('asientos api', function(){
    before(function(){
        fixtures.load(__dirname + '/fixtures');
    });

     it('debe retornar 2 asientos', function(done){
        request(app)
            .get('/api/asientos/')
            .expect(200)
            .expect('Content-Type', 'application/json')
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        var json = JSON.parse(res.text);                                        
                        json.length.should.be.equal(2);
                        json[0].codigo.should.be.equal('11110101010');
                        json[1].codigo.should.be.equal('100001010111');                    
                        done();                        
                    }
                });
        });         

     it('post: nuevo asiento', function(done){
        var asiento = new AsientoModel();
        asiento.codigo = '1211222';
        asiento.descripcion = 'Asiento de Prueba';
        asiento.ejercicio = "4eed2d88c3dedf0d0300001c",
        asiento.fecha = new Date(2011/1/1);
        asiento.renglones = [
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 2312,
                                "haber": 0
                            },
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 432,
                                "haber": 0
                            },                
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 2211,
                                "haber": 0
                            }                             
                    ];

        request(app)
            .post('/api/asientos/')
            .send(asiento)
            .expect(201)            
            .expect('Location', apiUtils.getUrl(app, 'asientos', asiento.codigo))
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
        var asiento = new AsientoModel();
        asiento.codigo = '1211222';
        asiento.descripcion = 'Asiento de Prueba1';
        asiento.ejercicio = "4eed2d88c3dedf0d0300001c",
        asiento.fecha = new Date(2011/1/1);
        asiento.renglones = [
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 2312,
                                "haber": 0
                            },
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 432,
                                "haber": 0
                            },                
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 2211,
                                "haber": 0
                            }                             
                    ];

        request(app)
            .put('/api/asientos/')
            .send(asiento)
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

     
     it('put: actualizar asiento que no existe debe retornar encabezado html 500', function(done){
        var asiento = new AsientoModel();
        asiento.codigo = '9999999';
        asiento.descripcion = 'Asiento de Prueba';
        asiento.ejercicio = "4eed2d88c3dedf0d0300001c",
        asiento.fecha = new Date(2011/1/1);
        asiento.renglones = [
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 2312,
                                "haber": 0
                            },
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 432,
                                "haber": 0
                            },                
                            {
                                "cuenta": "4eed2d88c3dedf0d0300001c",
                                "debe": 2211,
                                "haber": 0
                            }                             
                    ];

        request(app)
            .put('/api/asientos/')
            .send(asiento)
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

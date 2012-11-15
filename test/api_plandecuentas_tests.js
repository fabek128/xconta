var request   = require('supertest'),
    app = require('../app.js'),
    should = require('should'),
    fixtures = require('mongoose-fixtures'),
    apiUtils = require('../utils/apiUtils.js');

var PlanDeCuentasModel = require('../models/plandecuentas.js').model;  

describe('plandecuentas api', function(){
    before(function(){
        fixtures.load(__dirname + '/fixtures');
    });

     it('debe retornar 4 planes de cuentas', function(done){
        request(app)
            .get('/api/plandecuentas/')
            .expect(200)
            .expect('Content-Type', 'application/json')            
            .end(function(err, res){
                if(err){
                    throw new Error(err);
                }
                else{                
                    var json = JSON.parse(res.text);
                    json.length.should.be.equal(4);
                    json[0].codigo.should.be.equal('101010');                
                    json[1].codigo.should.be.equal('101100');
                    json[2].codigo.should.be.equal('100110');
                    json[3].codigo.should.be.equal('10000110');
                    done();
                }                    
            });
        });          

     it('post: nuevo plan de cuentas', function(done){
        var plan = new PlanDeCuentasModel();
        plan.codigo = '9999999';
        plan.nombre = 'Nuevo plan de cuentas';
        plan.empresa = '4eed2d88c3dedf0d0300001c';

        request(app)
            .post('/api/plandecuentas/')
            .send(plan)
            .expect(201)            
            .expect('Location', apiUtils.getUrl(app, 'plandecuentas', plan.codigo))            
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        done();
                    }
                });
        });

     it('put: actualizar plan existente debe retornar encabezado html 200', function(done){
        var plan = new PlanDeCuentasModel();
        plan.codigo = '9999999';
        plan.nombre = 'Nuevo plan de cuentas1';
        plan.empresa = '4eed2d88c3dedf0d0300001c';

        request(app)
            .put('/api/plandecuentas/')
            .send(plan)
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

     it('put: actualizar empresa que no existe debe retornar encabezado html 500', function(done){
        var plan = new PlanDeCuentasModel();
        plan.codigo = '888888';
        plan.nombre = 'Nuevo plan de cuentas1';
        plan.empresa = '4eed2d88c3dedf0d0300001c';

        request(app)
            .put('/api/plandecuentas/')
            .send(plan)
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

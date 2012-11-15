var request   = require('supertest'),
    app = require('../app.js'),
    should = require('should'),
    fixtures = require('mongoose-fixtures'),
    apiUtils = require('../utils/apiUtils.js');

var EmpresaModel = require('../models/empresa.js').model;  

describe('empresa api', function(){
    before(function(){
        fixtures.load(__dirname + '/fixtures');
    });

     it('debe retornar 4 empresas', function(done){
        request(app)
            .get('/api/empresas/')
            .expect(200)
            .expect('Content-Type', 'application/json')            
            .end(function(err, res){
                if(err){
                    throw new Error(err);
                }
                else{                
                    var json = JSON.parse(res.text);
                    json.length.should.be.equal(4);
                    json[0].codigo.should.be.equal('emp2113');                
                    json[1].codigo.should.be.equal('emp2114');
                    json[2].codigo.should.be.equal('emp2115');
                    json[3].codigo.should.be.equal('emp2116');
                    done();
                }
            });
        });         

     it('post: nueva empresa', function(done){
        var empresa = new EmpresaModel();
        empresa.codigo = '92929';
        empresa.nombre = 'Empresa Prueba S.R.L',
        empresa.direccion = 'San Martin 22',
        empresa.localidad = 'Rosario',
        empresa.provincia = 'Santa Fe',
        empresa.pais = 'Argentina',
        empresa.email = 'ok@argentina.com',
        empresa.sitio = 'www.32.com';

        request(app)
            .post('/api/empresas/')
            .send(empresa)
            .expect(201)            
            .expect('Location', apiUtils.getUrl(app, 'empresas', empresa.codigo))            
            .end(function(err, res){
                    if(err){
                        throw new Error(err);
                    }
                    else{
                        done();
                    }
                });
        });

     it('put: actualizar empresa existente debe retornar encabezado html 200', function(done){
        var empresa = new EmpresaModel();
        empresa.codigo = 'emp2113';
        empresa.nombre = 'Empresa Don Pepito1',
        empresa.direccion = 'San Martin 22',
        empresa.localidad = 'Rosario',
        empresa.provincia = 'Santa Fe',
        empresa.pais = 'Argentina',
        empresa.email = 'ok@argentina.com',
        empresa.sitio = 'www.32.com';

        request(app)
            .put('/api/empresas/')
            .send(empresa)
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
        var empresa = new EmpresaModel();
        empresa.codigo = 'emp211322';
        empresa.nombre = 'Empresa Don Pepito1',
        empresa.direccion = 'San Martin 22',
        empresa.localidad = 'Rosario',
        empresa.provincia = 'Santa Fe',
        empresa.pais = 'Argentina',
        empresa.email = 'ok@argentina.com',
        empresa.sitio = 'www.32.com';

        request(app)
            .put('/api/empresas/')
            .send(empresa)
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

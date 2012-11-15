var CuentaModel = require('../models/cuenta.js').model;
var EmpresaModel = require('../models/empresa.js').model;
var apiUtils = require('../utils/apiUtils.js');

module.exports = function (app){
        app.get('/api/cuentas', function (req, res) {                           
                CuentaModel.find({}, function(err, datos){
                        if(err){
                                throw err;
                            }
                        else{
                                res.writeHead(200, { 
                                                        'content-type': 'application/json' 
                                                    });
                                res.end(JSON.stringify(datos));
                            }
                    });
                });

        app.get('/api/cuentas/:codigo', function (req, res) {
                CuentaModel.find({ codigo: req.params.codigo }, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.send(JSON.stringify(datos));
                            }                   
                    });
                });      

        app.post('/api/cuentas/', function (req, res) {                
                var cuenta = CuentaModel(req.body);

                cuenta.save(function(err){
                        if(err){
                                console.log(err);
                            }
                        else{
                                res.writeHead(201, { 
                                                        'Location': apiUtils.getUrl(app, 'cuentas', cuenta.codigo)
                                                    });
                                res.end();
                            }
                   
                    });
                });

        app.put('/api/cuentas/', function (req, res) {                
                var cuenta = CuentaModel(req.body);

                CuentaModel.count({ codigo: cuenta.codigo }, function(err, count){
                    if(err){
                        res.writeHead(500);
                        res.end();                          
                    }else{
                        if(count > 0){
                            cuenta.save(function(err){
                                    if(err){
                                            console.log(err);
                                        }
                                    else{   
                                            res.writeHead(200);
                                            res.end();  
                                        }     
                                });
                            }else{
                                res.writeHead(404);
                                res.end();                            
                        }                        
                    }
                });
        });
    }

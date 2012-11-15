var EmpresaModel = require('../models/empresa.js').model; 
var apiUtils = require('../utils/apiUtils.js');

module.exports = function (app){
        app.get('/api/empresas', function (req, res) {
                EmpresaModel.find({}, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.writeHead(200, { 
                                                        'content-type': 'application/json' 
                                                    });
                                res.end(JSON.stringify(datos));
                            }
                    });
                });

        app.get('/api/empresas/:codigo', function (req, res) {
                EmpresaModel.find({ codigo: req.params.codigo }, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.send(JSON.stringify(datos));
                            }                   
                    });
                });      

        app.post('/api/empresas/', function (req, res) {                
                var empresa = EmpresaModel(req.body);

                empresa.save(function(err){
                        if(err){
                                console.log(err);
                            }
                        else{
                                res.writeHead(201, { 
                                                        'Location': apiUtils.getUrl(app, 'empresas', empresa.codigo) 
                                                    });
                                res.end();
                            }
                   
                    });
                });

        app.put('/api/empresas/', function (req, res) {                
                var empresa = EmpresaModel(req.body);                

                EmpresaModel.count({ codigo: empresa.codigo }, function(err, count){
                    if(err){
                        res.writeHead(500);
                        res.end();                          
                    }else{
                        if(count > 0){
                            empresa.save(function(err){
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

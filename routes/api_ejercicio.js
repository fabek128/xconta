var EjercicioModel = require('../models/ejercicio.js').model;
var apiUtils = require('../utils/apiUtils.js');

module.exports = function (app){
        app.get('/api/ejercicios', function (req, res) {                
                EjercicioModel.find({}, function(err, datos){                    
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

        app.get('/api/ejercicios/:codigo', function (req, res) {
                EjercicioModel.find({ codigo: req.params.codigo }, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.send(JSON.stringify(datos));
                            }                   
                    });
                });      

        app.post('/api/ejercicios/', function (req, res) {                
                var cuenta = EjercicioModel(req.body);

                cuenta.save(function(err){
                        if(err){
                                console.log(err);
                            }
                        else{
                                res.writeHead(201, { 
                                                        'Location': apiUtils.getUrl(app, 'ejercicios', cuenta.codigo)
                                                    });
                                res.end();
                            }
                   
                    });
                });

        app.put('/api/ejercicios/', function (req, res) {
                var ejercicio = EjercicioModel(req.body);

                EjercicioModel.count({ codigo: ejercicio.codigo }, function(err, count){
                    if(err){
                        res.writeHead(500);
                        res.end();                          
                    }else{
                        if(count > 0){
                            ejercicio.save(function(err){
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

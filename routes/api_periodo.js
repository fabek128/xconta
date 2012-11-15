var PeriodosModel = require('../models/periodo.js').model;
var apiUtils = require('../utils/apiUtils.js');

module.exports = function (app){
        app.get('/api/periodos', function (req, res) {                
                PeriodosModel.find({}, function(err, datos){                    
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

        app.get('/api/periodos/:codigo', function (req, res) {
                PeriodosModel.find({ codigo: req.params.codigo }, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.send(JSON.stringify(datos));
                            }                   
                    });
                });      

        app.post('/api/periodos/', function (req, res) {                
                var periodo = PeriodosModel(req.body);

                periodo.save(function(err){
                        if(err){
                                console.log(err);
                            }
                        else{
                                res.writeHead(201, { 
                                                        'Location': apiUtils.getUrl(app, 'periodos', periodo.codigo)
                                                    });
                                res.end();
                            }
                   
                    });
                });

        app.put('/api/periodos/', function (req, res) {
                var periodo = PeriodosModel(req.body);

                PeriodosModel.count({ codigo: periodo.codigo }, function(err, count){
                    if(err){
                        res.writeHead(500);
                        res.end();                          
                    }else{
                        if(count > 0){
                            periodo.save(function(err){
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

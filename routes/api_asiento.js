var AsientoModel = require('../models/asiento.js').model;
var apiUtils = require('../utils/apiUtils.js');

module.exports = function (app){
        app.get('/api/asientos', function (req, res) {                           
                AsientoModel.find({}, function(err, datos){
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

        app.get('/api/asientos/:codigo', function (req, res) {
                AsientoModel.find({ codigo: req.params.codigo }, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.send(JSON.stringify(datos));
                            }                   
                    });
                });      

        app.post('/api/asientos/', function (req, res) {                
                var asiento = AsientoModel(req.body);

                asiento.save(function(err){
                        if(err){
                                console.log(err);
                            }
                        else{
                                res.writeHead(201, { 
                                                        'Location': apiUtils.getUrl(app, 'asientos', asiento.codigo)
                                                    });
                                res.end();
                            }
                   
                    });
                });

        app.put('/api/asientos/', function (req, res) {                
                var asiento = AsientoModel(req.body);

                AsientoModel.count({ codigo: asiento.codigo }, function(err, count){
                    if(err){
                        res.writeHead(500);
                        res.end();                          
                    }else{
                        if(count > 0){
                            asiento.save(function(err){
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

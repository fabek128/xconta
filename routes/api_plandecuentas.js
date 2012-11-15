var PlanDeCuentasModel = require('../models/plandecuentas.js').model;
var apiUtils = require('../utils/apiUtils.js'); 

module.exports = function (app){
        app.get('/api/plandecuentas', function (req, res) {
                PlanDeCuentasModel.find({}, function(err, datos){
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

        app.get('/api/plandecuentas/:codigo', function (req, res) {
                PlanDeCuentasModel.find({ codigo: req.params.codigo }, function(err, datos){
                        if(err){
                                console.log(error);
                            }
                        else{
                                res.send(JSON.stringify(datos));
                            }                   
                    });
                });      

        app.post('/api/plandecuentas/', function (req, res) {                
                var plan = PlanDeCuentasModel(req.body);

                plan.save(function(err){
                        if(err){
                                console.log(err);
                            }
                        else{
                                res.writeHead(201, { 
                                                        'Location': apiUtils.getUrl(app, 'plandecuentas', plan.codigo)
                                                    });
                                res.end();
                            }
                   
                    });
                });

        app.put('/api/plandecuentas/', function (req, res) {                
                var plan = PlanDeCuentasModel(req.body);                

                PlanDeCuentasModel.count({ codigo: plan.codigo }, function(err, count){
                    if(err){
                        res.writeHead(500);
                        res.end();                          
                    }else{                    
                        if(count > 0){
                            plan.save(function(err){
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

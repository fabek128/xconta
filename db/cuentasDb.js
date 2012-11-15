var dbTools = require('./dbTools.js');

var cuentasDb = {};

dbTools.openDb(function(database){
        cuentasDb.cuentas = database.collection('cuentas');
    });

module.exports = cuentasDb;

cuentasDb.nuevo = function (datos, callback){
    cuentasDb.cuentas.insert(datos, callback("se inserto correctamente"));
    callback('dato asignado en cuentas: ' + datos);       
};

cuentasDb.todos = function(callback){
        return cuentasDb.cuentas.find().toArray(function(err, cuentas){
                if(err){
                        console.log(err);
                    }
                else{
                        callback(cuentas);
                    }
            });
    };


Db = require('mongodb').Db;
Server = require('mongodb').Server;

dPort = 27017;
dHost = 'localhost';
dName = 'xconta'

var dbTools = {};

module.exports = dbTools;

dbTools.setDb = function (callback){
			var database = new Db(dName, new Server(dHost, dPort, { auto_reconnect: true }, {}));
			callback(database);
		};


dbTools.openDb = function (callback) {
    dbTools.setDb(function (database){
        database.open(function (error,client){
        		if(error){
			        console.log(error);
		        }else{
        			console.log("Conectado a la base de datos: " + database);
			        callback(database, client);
	        	}
        	});      
        });
    };

		
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    AsientoRenglonSchema = require('./asiento_renglon.js'),
    ObjectId = Schema.ObjectId;

var AsientoSchema = new Schema({
        codigo: { type: String, required: true },
        descripcion: { type: String },
        fecha: { type: Date, required: true },
        renglones: [ ObjectId ]
    });

AsientoSchema.model = mongoose.model('Asiento', AsientoSchema);

module.exports = AsientoSchema;
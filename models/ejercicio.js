		
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    PlanDeCuentas = require('./plandecuentas.js');

var EjercicioSchema = new Schema({
        codigo: { type: String, required: true },
        nombre: { type: String, required: true },
        descripcion: { type: String },
        plandecuentas: { type: ObjectId, required: true },
        fechaDesde: { type: Date, required: true },
        fechaHasta: { type: Date, required: true }
    });

EjercicioSchema.model = mongoose.model('Ejercicio', EjercicioSchema);

module.exports = EjercicioSchema;
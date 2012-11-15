var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    PlanDeCuentas = require('./plandecuentas.js');

var CuentaSchema = new Schema({
        codigo: { type: String, required: true },
        nombre: { type: String, required: true },
        descripcion: { type: String },
        nivel: { type: Number },
        plandecuentas: { type: ObjectId, required: true },
        cuentamadre: { type: ObjectId },
        fechaCreacion: { type: Date, default: Date.now }
    });

CuentaSchema.model = mongoose.model('Cuenta', CuentaSchema);

module.exports = CuentaSchema;

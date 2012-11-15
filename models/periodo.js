		
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PeriodoSchema = new Schema({
        codigo: { type: String, required: true },
        nombre: { type: String, required: true },
        descripcion: { type: String },
        ejercicio: { type: ObjectId },
        fechaDesde: { type: Date, required: true },
        fechaHasta: { type: Date, required: true }
    });

PeriodoSchema.model = mongoose.model('Periodo', PeriodoSchema);

module.exports = PeriodoSchema;
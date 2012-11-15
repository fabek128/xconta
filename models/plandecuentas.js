var mongoose = require('mongoose'),
    Schema   = mongoose.Schema
    ObjectId = Schema.ObjectId;

var PlanDeCuentasSchema = new Schema({
        codigo: { type: String, required: true },
        nombre: { type: String, required: true },
        empresa: { type: ObjectId },
        fechaCreacion: { type: Date, default: Date.now }
    });

PlanDeCuentasSchema.model = mongoose.model('PlanDeCuentas', PlanDeCuentasSchema);

module.exports = PlanDeCuentasSchema;
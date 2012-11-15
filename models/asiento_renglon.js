var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var AsientoRenglonSchema = new Schema({
        cuenta: { type: ObjectId, required: true },
        debe: { type: Number, required: true },
        haber: { type: Number, required: true }
    });

AsientoRenglonSchema.model = mongoose.model('AsientoRenglon', AsientoRenglonSchema);

module.exports = AsientoRenglonSchema;
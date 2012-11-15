var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var EmpresaSchema = new Schema({
        codigo: { type: String, required: true },
        nombre: { type: String, required: true },
        direccion: { type: String },
        localidad: { type: String },
        provincia: { type: String },
        pais: { type: String },
        email: { type: String },
        sitio: { type: String },
        fechaCreacion: { type: Date, default: Date.now }
    });

EmpresaSchema.model = mongoose.model('Empresa', EmpresaSchema);

module.exports = EmpresaSchema;
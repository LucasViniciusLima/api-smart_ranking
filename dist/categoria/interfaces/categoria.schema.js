"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaSchema = void 0;
const mongoose = require("mongoose");
exports.CategoriaSchema = new mongoose.Schema({
    categoria: { type: String, unique: true },
    descricao: String,
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number }
        }
    ],
    jogadores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categoria'
        }]
}, { timestamps: true, collection: 'Categoria' });
//# sourceMappingURL=categoria.schema.js.map
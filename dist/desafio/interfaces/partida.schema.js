"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartidaSchema = void 0;
const mongoose = require("mongoose");
exports.PartidaSchema = new mongoose.Schema({
    categoria: { type: String },
    jogadores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jogador'
        }],
    def: { type: mongoose.Schema.Types.ObjectId },
    resultado: [{
            set: { type: String }
        }]
}, { timestamps: true, collection: 'partidas' });
//# sourceMappingURL=partida.schema.js.map
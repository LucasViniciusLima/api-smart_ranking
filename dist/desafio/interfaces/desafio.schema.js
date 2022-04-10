"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesafioSchema = void 0;
const mongoose = require("mongoose");
exports.DesafioSchema = new mongoose.Schema({
    dataHoraDesafio: { type: Date },
    status: { type: String },
    dataHoraSolicitacao: { type: Date },
    dataHoraResposta: { type: Date },
    solicitante: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    categoria: { type: String },
    jogadores: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Jogador'
        }],
    partida: { type: mongoose.Schema.Types.ObjectId, ref: 'Partida' }
}, { timestamps: true, collection: 'desafios' });
//# sourceMappingURL=desafio.schema.js.map
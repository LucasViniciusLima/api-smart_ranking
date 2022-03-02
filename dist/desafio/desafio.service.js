"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesafioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jogador_service_1 = require("../jogador/jogador.service");
const categoria_service_1 = require("./../categoria/categoria.service");
let DesafioService = class DesafioService {
    constructor(desafioModel, jogadorService, categoriaService) {
        this.desafioModel = desafioModel;
        this.jogadorService = jogadorService;
        this.categoriaService = categoriaService;
    }
    async criarDesafio(criarDesafioDto) {
        const { dataHoraDesafio } = criarDesafioDto;
        const { jogadores } = criarDesafioDto;
        const { solicitante } = criarDesafioDto;
        const idJogador1 = jogadores[0]._id;
        const idJogador2 = jogadores[1]._id;
        const desafioEncontrado = await this.desafioModel.findOne({ dataHoraDesafio }).exec();
        await this.jogadorService.consultarJogadorPeloId(idJogador1);
        await this.jogadorService.consultarJogadorPeloId(idJogador2);
        const jogadorSolicitanteEncontrado = await this.jogadorService.consultarJogadorPeloId(solicitante);
        await this.categoriaService.consultarCategoriaPeloId(jogadorSolicitanteEncontrado.ranking);
        if (!(idJogador1 == solicitante || idJogador2 == solicitante)) {
            throw new common_1.BadRequestException(`O solicitante não está na lista de competidores do desafio`);
        }
        if (desafioEncontrado) {
            throw new common_1.BadRequestException(`Um desafio em ${dataHoraDesafio} já foi encontrado`);
        }
        const novoDesafio = new this.desafioModel(criarDesafioDto);
        novoDesafio.dataHoraSolicitacao = new Date();
        novoDesafio.status = 'PENDENTE';
        return await novoDesafio.save();
    }
};
DesafioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Desafio')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jogador_service_1.JogadorService,
        categoria_service_1.CategoriaService])
], DesafioService);
exports.DesafioService = DesafioService;
//# sourceMappingURL=desafio.service.js.map
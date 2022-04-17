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
const desafio_status_enum_1 = require("./interfaces/desafio-status.enum");
let DesafioService = class DesafioService {
    constructor(desafioModel, partidaModel, jogadorService, categoriaService) {
        this.desafioModel = desafioModel;
        this.partidaModel = partidaModel;
        this.jogadorService = jogadorService;
        this.categoriaService = categoriaService;
    }
    async criarDesafio(criarDesafioDto) {
        const jogadores = await this.jogadorService.consultarTodosJogadores();
        criarDesafioDto.jogadores.map(jogadorDto => {
            const jogadorFilter = jogadores.filter(jogador => jogador._id == jogadorDto._id);
            if (jogadorFilter.length == 0) {
                throw new common_1.BadRequestException(`O id ${jogadorDto._id} não é um jogador!`);
            }
        });
        const solicitanteEhJogadorDaPartida = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante);
        if (solicitanteEhJogadorDaPartida.length == 0) {
            throw new common_1.BadRequestException(`O solicitante deve ser um jogador da partida!`);
        }
        const categoriaDoJogador = await this.categoriaService.consultarCategoriaDoJogador(criarDesafioDto.solicitante);
        if (!categoriaDoJogador) {
            throw new common_1.BadRequestException(`O solicitante precisa estar registradfo em uma categoria!`);
        }
        const desafioCriado = new this.desafioModel(criarDesafioDto);
        desafioCriado.categoria = categoriaDoJogador.categoria;
        desafioCriado.dataHoraSolicitacao = new Date();
        desafioCriado.status = desafio_status_enum_1.DesafioStatus.PENDENTE;
        return await desafioCriado.save();
    }
    async consultarTodosDesafios() {
        return await this.desafioModel.find()
            .populate('jogadores')
            .populate('solicitante')
            .populate('partida')
            .exec();
    }
    async consultarDesafiosJogador(_id) {
        const jogadores = await this.jogadorService.consultarTodosJogadores();
        const jogadorFilter = jogadores.filter(jogador => jogador._id == _id);
        if (jogadorFilter.length == 0) {
            throw new common_1.BadRequestException(`O id ${_id} não é um jogador`);
        }
        return await this.desafioModel.find()
            .where('jogadores')
            .in(_id)
            .populate('jogadores')
            .populate('solicitante')
            .populate('partida')
            .exec();
    }
    async atualizarDesafio(desafio, atualizarDesafioDto) {
        const desafioEncontrado = await this.desafioModel.findOne({ _id: desafio }).exec();
        if (!desafioEncontrado) {
            throw new common_1.BadRequestException(`O id ${desafio} não é um desafio`);
        }
        desafioEncontrado.update({ $set: atualizarDesafioDto }).exec();
    }
};
DesafioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Desafio')),
    __param(1, (0, mongoose_1.InjectModel)('Partida')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jogador_service_1.JogadorService,
        categoria_service_1.CategoriaService])
], DesafioService);
exports.DesafioService = DesafioService;
//# sourceMappingURL=desafio.service.js.map
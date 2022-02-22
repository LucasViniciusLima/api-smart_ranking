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
exports.JogadorController = void 0;
const common_1 = require("@nestjs/common");
const criar_jogador_dto_1 = require("./dtos/criar-jogador.dto");
const atualizar_jogador_dto_1 = require("./dtos/atualizar-jogador.dto");
const jogador_service_1 = require("./jogador.service");
const validacao_parametros_pipe_1 = require("../common/pipes/validacao-parametros.pipe");
let JogadorController = class JogadorController {
    constructor(jogadorService) {
        this.jogadorService = jogadorService;
    }
    async criarJogador(criarJogadorDto) {
        return await this.jogadorService.criarJogador(criarJogadorDto);
    }
    async atualizarJogador(atualizarJogadorDto, _id) {
        await this.jogadorService.atualizarJogador(_id, atualizarJogadorDto);
    }
    async consultarJogadores() {
        return await this.jogadorService.consultarTodosJogadores();
    }
    async consultarJogadorPeloId(_id) {
        return await this.jogadorService.consultarJogadorPeloId(_id);
    }
    async deletarJogador(_id) {
        this.jogadorService.deletarJogador(_id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criar_jogador_dto_1.CriarJogadorDto]),
    __metadata("design:returntype", Promise)
], JogadorController.prototype, "criarJogador", null);
__decorate([
    (0, common_1.Put)('/:_id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('_id', validacao_parametros_pipe_1.ValidacaoParametrosPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atualizar_jogador_dto_1.AtualizarJogadorDto, String]),
    __metadata("design:returntype", Promise)
], JogadorController.prototype, "atualizarJogador", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JogadorController.prototype, "consultarJogadores", null);
__decorate([
    (0, common_1.Get)('/:_id'),
    __param(0, (0, common_1.Param)('_id', validacao_parametros_pipe_1.ValidacaoParametrosPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JogadorController.prototype, "consultarJogadorPeloId", null);
__decorate([
    (0, common_1.Delete)('/:_id'),
    __param(0, (0, common_1.Param)('_id', validacao_parametros_pipe_1.ValidacaoParametrosPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JogadorController.prototype, "deletarJogador", null);
JogadorController = __decorate([
    (0, common_1.Controller)('api/v1/jogadores'),
    __metadata("design:paramtypes", [jogador_service_1.JogadorService])
], JogadorController);
exports.JogadorController = JogadorController;
//# sourceMappingURL=jogador.controller.js.map
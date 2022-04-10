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
exports.DesafioController = void 0;
const common_1 = require("@nestjs/common");
const desafio_service_1 = require("./desafio.service");
const criar_desafio_dto_1 = require("./dtos/criar-desafio.dto");
let DesafioController = class DesafioController {
    constructor(desafioService) {
        this.desafioService = desafioService;
    }
    async criarDesafio(criarDesafioDto) {
        return await this.desafioService.criarDesafio(criarDesafioDto);
    }
    async consultarTodosDesafios() {
        return await this.desafioService.consultarTodosDesafios();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [criar_desafio_dto_1.CriarDesafioDto]),
    __metadata("design:returntype", Promise)
], DesafioController.prototype, "criarDesafio", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DesafioController.prototype, "consultarTodosDesafios", null);
DesafioController = __decorate([
    (0, common_1.Controller)('api/v1/desafio'),
    __metadata("design:paramtypes", [desafio_service_1.DesafioService])
], DesafioController);
exports.DesafioController = DesafioController;
//# sourceMappingURL=desafio.controller.js.map
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
exports.CategoriaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jogador_service_1 = require("../jogador/jogador.service");
let CategoriaService = class CategoriaService {
    constructor(categoriaModel, jogadorService) {
        this.categoriaModel = categoriaModel;
        this.jogadorService = jogadorService;
    }
    async criarCategoria(criarCategoriaDto) {
        const { categoria } = criarCategoriaDto;
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if (categoriaEncontrada) {
            throw new common_1.BadRequestException(`Categoria ${categoria} já existe`);
        }
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }
    async consultarTodasCategorias() {
        return await this.categoriaModel.find().populate("jogadores").exec();
    }
    async consultarCategoriaPeloId(categoria) {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).populate('jogadores').exec();
        if (!categoriaEncontrada) {
            throw new common_1.NotFoundException(`Categoria ${categoria} não existe`);
        }
        return categoriaEncontrada;
    }
    async atualizarCategoria(categoria, atualizarCategoriaDto) {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if (!categoriaEncontrada) {
            throw new common_1.NotFoundException(`A categoria ${categoria} não existe`);
        }
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec();
    }
    async atribuirCategoriaJogador(params) {
        const categoria = params['categoria'];
        const idJogador = params['idJogador'];
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in(idJogador).exec();
        await this.jogadorService.consultarJogadorPeloId(idJogador);
        if (!categoriaEncontrada) {
            throw new common_1.NotFoundException(`Categoria ${categoria} não encontrada`);
        }
        if (jogadorJaCadastradoCategoria.length > 0) {
            throw new common_1.BadRequestException(`Jogador com id: ${idJogador} já cadastrado na categoria ${categoria}`);
        }
        categoriaEncontrada.jogadores.push(idJogador);
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
    }
};
CategoriaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Categoria')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jogador_service_1.JogadorService])
], CategoriaService);
exports.CategoriaService = CategoriaService;
//# sourceMappingURL=categoria.service.js.map
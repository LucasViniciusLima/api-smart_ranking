"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogadorModule = void 0;
const common_1 = require("@nestjs/common");
const jogador_controller_1 = require("./jogador.controller");
const jogador_service_1 = require("./jogador.service");
const mongoose_1 = require("@nestjs/mongoose");
const jogador_schema_1 = require("./interfaces/jogador.schema");
let JogadorModule = class JogadorModule {
};
JogadorModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Jogador', schema: jogador_schema_1.JogadorSchema }])],
        controllers: [jogador_controller_1.JogadorController],
        providers: [jogador_service_1.JogadorService]
    })
], JogadorModule);
exports.JogadorModule = JogadorModule;
//# sourceMappingURL=jogador.module.js.map
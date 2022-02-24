"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesafioModule = void 0;
const common_1 = require("@nestjs/common");
const desafio_service_1 = require("./desafio.service");
const desafio_controller_1 = require("./desafio.controller");
const mongoose_1 = require("@nestjs/mongoose");
const desafio_schema_1 = require("./interfaces/desafio.schema");
let DesafioModule = class DesafioModule {
};
DesafioModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Desafio', schema: desafio_schema_1.DesafioSchema }])],
        providers: [desafio_service_1.DesafioService],
        controllers: [desafio_controller_1.DesafioController]
    })
], DesafioModule);
exports.DesafioModule = DesafioModule;
//# sourceMappingURL=desafio.module.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesafioStatusValidacaoPipe = void 0;
const common_1 = require("@nestjs/common");
const desafio_status_enum_1 = require("../interfaces/desafio-status.enum");
class DesafioStatusValidacaoPipe {
    constructor() {
        this.statusPermitidos = [
            desafio_status_enum_1.DesafioStatus.ACEITO,
            desafio_status_enum_1.DesafioStatus.NEGADO,
            desafio_status_enum_1.DesafioStatus.CANCELADO
        ];
    }
    transform(value) {
        const status = value.status.toUpperCase();
        if (!this.ehStatusValido(status)) {
            throw new common_1.BadRequestException(`${status} é um status inválido`);
        }
        return value;
    }
    ehStatusValido(status) {
        const idx = this.statusPermitidos.indexOf(status);
        return idx !== -1;
    }
}
exports.DesafioStatusValidacaoPipe = DesafioStatusValidacaoPipe;
//# sourceMappingURL=desafio-status-validation-pipe.js.map
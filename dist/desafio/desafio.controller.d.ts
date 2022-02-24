import { DesafioService } from './desafio.service';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
export declare class DesafioController {
    private readonly desafioService;
    constructor(desafioService: DesafioService);
    criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>;
}

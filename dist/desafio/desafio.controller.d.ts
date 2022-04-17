import { DesafioService } from './desafio.service';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
export declare class DesafioController {
    private readonly desafioService;
    constructor(desafioService: DesafioService);
    criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>;
    consultarTodosDesafios(_id: string): Promise<Desafio[]>;
    atualizarDesafio(desafio: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void>;
}

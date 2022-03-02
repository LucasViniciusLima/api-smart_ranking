import { Model } from 'mongoose';
import { JogadorService } from 'src/jogador/jogador.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { CategoriaService } from './../categoria/categoria.service';
export declare class DesafioService {
    private readonly desafioModel;
    private readonly jogadorService;
    private readonly categoriaService;
    constructor(desafioModel: Model<Desafio>, jogadorService: JogadorService, categoriaService: CategoriaService);
    criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>;
}

import { Model } from 'mongoose';
import { JogadorService } from 'src/jogador/jogador.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio, Partida } from './interfaces/desafio.interface';
import { CategoriaService } from './../categoria/categoria.service';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
export declare class DesafioService {
    private readonly desafioModel;
    private readonly partidaModel;
    private readonly jogadorService;
    private readonly categoriaService;
    constructor(desafioModel: Model<Desafio>, partidaModel: Model<Partida>, jogadorService: JogadorService, categoriaService: CategoriaService);
    criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>;
    consultarTodosDesafios(): Promise<Desafio[]>;
    consultarDesafiosJogador(_id: any): Promise<Desafio[]>;
    atualizarDesafio(id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void>;
    atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto): Promise<void>;
    deletarDesafio(_id: string): Promise<void>;
}

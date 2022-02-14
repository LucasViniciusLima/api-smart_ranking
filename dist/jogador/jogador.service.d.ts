import { Model } from 'mongoose';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
export declare class JogadorService {
    private readonly jogadorModel;
    constructor(jogadorModel: Model<Jogador>);
    criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>;
    atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void>;
    consultarJogadorPeloId(_id: string): Promise<Jogador>;
    deletarJogador(_id: string): Promise<any>;
    consultarTodosJogadores(): Promise<Jogador[]>;
}

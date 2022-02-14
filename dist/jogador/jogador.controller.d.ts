import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadorService } from './jogador.service';
export declare class JogadorController {
    private readonly jogadorService;
    constructor(jogadorService: JogadorService);
    criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>;
    atualizarJogador(atualizarJogadorDto: AtualizarJogadorDto, _id: string): Promise<void>;
    consultarJogadores(): Promise<Jogador[]>;
    consultarJogadorPeloId(_id: string): Promise<Jogador>;
    deletarJogador(_id: string): Promise<void>;
}

import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria-interface';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { JogadorService } from 'src/jogador/jogador.service';
export declare class CategoriaService {
    private readonly categoriaModel;
    private readonly jogadorService;
    constructor(categoriaModel: Model<Categoria>, jogadorService: JogadorService);
    criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>;
    consultarCategoriaDoJogador(idJogador: any): Promise<Categoria>;
    consultarTodasCategorias(): Promise<Array<Categoria>>;
    consultarCategoriaPeloId(categoria: string): Promise<Categoria>;
    atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void>;
    atribuirCategoriaJogador(params: string[]): Promise<void>;
}

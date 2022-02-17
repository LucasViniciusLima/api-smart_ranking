import { Categoria } from './interfaces/categoria-interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriaService } from './categoria.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
export declare class CategoriaController {
    private readonly categoriaService;
    constructor(categoriaService: CategoriaService);
    criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>;
    consultarTodasCategorias(): Promise<Array<Categoria>>;
    consultarCategoriaPorId(categoria: string): Promise<Categoria>;
    atualizarCategoria(atualizarCategoriaDto: AtualizarCategoriaDto, categoria: string): Promise<void>;
    atribuirCategoriaJogador(params: string[]): Promise<void>;
}

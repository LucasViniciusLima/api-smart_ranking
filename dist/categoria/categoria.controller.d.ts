import { Categoria } from './interfaces/categoria-interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriaService } from './categoria.service';
export declare class CategoriaController {
    private readonly categoriaService;
    constructor(categoriaService: CategoriaService);
    criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>;
}

import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria-interface';
export declare class CategoriaService {
    private readonly categoriaModel;
    constructor(categoriaModel: Model<Categoria>);
    criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>;
}

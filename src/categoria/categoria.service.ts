import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria-interface';

@Injectable()
export class CategoriaService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já existe`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        
        return await categoriaCriada.save();
    }
}

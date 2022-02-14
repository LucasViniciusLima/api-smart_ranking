import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Categoria } from './interfaces/categoria-interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriaService } from './categoria.service';

@Controller('api/v1/categoria')
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto
    ): Promise<Categoria> {
        return await this.categoriaService.criarCategoria(criarCategoriaDto);
    }

}

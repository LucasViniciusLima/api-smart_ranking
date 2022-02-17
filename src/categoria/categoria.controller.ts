import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Categoria } from './interfaces/categoria-interface';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriaService } from './categoria.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

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

    @Get()
    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPorId(
        @Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriaService.consultarCategoriaPeloId(categoria);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string): Promise<void> {
        await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(
        @Param() params: string[]): Promise<void> {
            return await this.categoriaService.atribuirCategoriaJogador(params);
    }

}

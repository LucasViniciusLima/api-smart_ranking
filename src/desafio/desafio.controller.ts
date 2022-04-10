import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';

@Controller('api/v1/desafio')
export class DesafioController {
    constructor(private readonly desafioService: DesafioService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        return await this.desafioService.criarDesafio(criarDesafioDto);
    }

    @Get()
    async consultarTodosDesafios(
        @Query('idJogador') _id: string): Promise<Desafio[]> {
        return _id ? await this.desafioService.consultarDesafiosJogador(_id)
            : await this.desafioService.consultarTodosDesafios();
    }


}

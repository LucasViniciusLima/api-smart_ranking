import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { Desafio } from './interfaces/desafio.interface';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation-pipe';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';

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

    @Put('/:desafio')
    async atualizarDesafio(
        @Param('desafio') id: string,
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
        return this.desafioService.atualizarDesafio(id, atualizarDesafioDto);
    }

    @Post('/:desafio/partida/')
    async atribuirDesafioPartida(
        @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
        @Param('desafio') id: string): Promise<void> {
        return await this.desafioService.atribuirDesafioPartida(id, atribuirDesafioPartidaDto);
    }

    @Delete('/:_id')
    async deletarDesafio(
        @Param('id') id: string): Promise<void> {
        return await this.desafioService.deletarDesafio(id);
    }
}

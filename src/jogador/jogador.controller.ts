import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadorService } from './jogador.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadorController {

    constructor(private readonly jogadorService: JogadorService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorService.criarJogador(criaJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
        await this.jogadorService.atualizarJogador(_id, criarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadorService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadorPeloId(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<Jogador> {
        return await this.jogadorService.consultarJogadorPeloId(_id);
    }


    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
        this.jogadorService.deletarJogador(_id);
    }

}

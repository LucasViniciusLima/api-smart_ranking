import { Body, Controller, Delete, Get, Post, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadorService } from './jogador.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadorController {

    constructor(private readonly jogadorService: JogadorService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
        await this.jogadorService.atualizarJogador(_id, atualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadorService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadorPeloId(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador> {
        return await this.jogadorService.consultarJogadorPeloId(_id);
    }


    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
        this.jogadorService.deletarJogador(_id);
    }

}

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadorService } from 'src/jogador/jogador.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio, Partida } from './interfaces/desafio.interface';
import { CategoriaService } from './../categoria/categoria.service';
import { DesafioStatus } from './interfaces/desafio-status.enum';

@Injectable()
export class DesafioService {

    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
        private readonly jogadorService: JogadorService,
        private readonly categoriaService: CategoriaService) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const jogadores = await this.jogadorService.consultarTodosJogadores();

        criarDesafioDto.jogadores.map(jogadorDto => {
            const jogadorFilter = jogadores.filter(jogador => jogador._id == jogadorDto._id);

            if (jogadorFilter.length == 0) {
                throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`);
            }
        });

        const solicitanteEhJogadorDaPartida = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante);

        if(solicitanteEhJogadorDaPartida.length == 0) {
            throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
        }


        const categoriaDoJogador = await this.categoriaService.consultarCategoriaDoJogador(criarDesafioDto.solicitante);

        if (!categoriaDoJogador) {
            throw new BadRequestException(`O solicitante precisa estar registradfo em uma categoria!`);
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto);
        desafioCriado.categoria = categoriaDoJogador.categoria;
        desafioCriado.dataHoraSolicitacao = new Date();
        desafioCriado.status = DesafioStatus.PENDENTE;
        return await desafioCriado.save();
    }

    async consultarTodosDesafios(): Promise<Desafio[]> {
        return await this.desafioModel.find()
            .populate('jogadores')
            .populate('solicitante')
            .populate('partida')
            .exec();
    }


}

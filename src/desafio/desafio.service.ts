import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadorService } from 'src/jogador/jogador.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio, Partida } from './interfaces/desafio.interface';
import { CategoriaService } from './../categoria/categoria.service';
import { DesafioStatus } from './interfaces/desafio-status.enum';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';

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

        if (solicitanteEhJogadorDaPartida.length == 0) {
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

    async consultarDesafiosJogador(_id: any): Promise<Desafio[]> {
        const jogadores = await this.jogadorService.consultarTodosJogadores();
        const jogadorFilter = jogadores.filter(jogador => jogador._id == _id);

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${_id} não é um jogador`);
        }

        return await this.desafioModel.find()
            .where('jogadores')
            .in(_id)
            .populate('jogadores')
            .populate('solicitante')
            .populate('partida')
            .exec();
    }

    async atualizarDesafio(id: string, atualizarDesafioDto: AtualizarDesafioDto): Promise<void> {
        const desafioEncontrado = await this.desafioModel.findOne({ _id: id }).exec();

        if (!desafioEncontrado) {
            throw new BadRequestException(`O id ${id} não é um desafio`);
        }

        if (atualizarDesafioDto.status) {
            desafioEncontrado.dataHoraResposta = new Date();
        }

        desafioEncontrado.status = atualizarDesafioDto.status;
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio;

        await this.desafioModel.findOneAndUpdate({ id }, { $set: desafioEncontrado }).exec();
    }

    async atribuirDesafioPartida(_id: string, atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto): Promise<void> {
        const desafioEncontrado = await this.desafioModel.findOne({ _id }).exec();

        if (!desafioEncontrado) {
            throw new BadRequestException(`O id ${_id} não é um desafio`);
        }

        const jogadorFilter = await desafioEncontrado.jogadores.filter(jogador => jogador._id == atribuirDesafioPartidaDto.def);

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O jogador vencedor não faz parte do desafio`);
        }

        const partidaCriada = new this.partidaModel(atribuirDesafioPartidaDto);

        partidaCriada.categoria = desafioEncontrado.categoria;
        partidaCriada.jogadores = desafioEncontrado.jogadores;

        const resultado = await partidaCriada.save();

        desafioEncontrado.status = DesafioStatus.REALIZADO;
        desafioEncontrado.partida = resultado._id;

        try {
            await this.desafioModel.findOneAndUpdate({ _id }, { $set: desafioEncontrado }).exec();
        } catch (error) {
            await this.partidaModel.deleteOne({ _id: resultado._id }).exec();
            throw new InternalServerErrorException();
        }

    }

    async deletarDesafio(_id: string): Promise<void> {
        const desafioEncontrado = await this.desafioModel.findById(_id).exec();

        if (!desafioEncontrado) {
            throw new BadRequestException(`Desafio ${_id} não cadastrado`);
        }

        desafioEncontrado.status = DesafioStatus.CANCELADO;

        await this.desafioModel.findOneAndUpdate({ _id }, { $set: desafioEncontrado });
    }
}

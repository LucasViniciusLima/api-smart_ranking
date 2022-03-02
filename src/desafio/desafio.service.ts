import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadorService } from 'src/jogador/jogador.service';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { CategoriaService } from './../categoria/categoria.service';

@Injectable()
export class DesafioService {

    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        private readonly jogadorService: JogadorService,
        private readonly categoriaService: CategoriaService) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const { dataHoraDesafio } = criarDesafioDto;
        const { jogadores } = criarDesafioDto;
        const { solicitante } = criarDesafioDto;

        const idJogador1 = jogadores[0]._id;
        const idJogador2 = jogadores[1]._id;

        const desafioEncontrado = await this.desafioModel.findOne({ dataHoraDesafio }).exec();
        await this.jogadorService.consultarJogadorPeloId(idJogador1);
        await this.jogadorService.consultarJogadorPeloId(idJogador2);

        const jogadorSolicitanteEncontrado = await this.jogadorService.consultarJogadorPeloId(solicitante);
        await this.categoriaService.consultarCategoriaPeloId(jogadorSolicitanteEncontrado.ranking);

        if (!(idJogador1 == solicitante || idJogador2 == solicitante)) {
            throw new BadRequestException(`O solicitante não está na lista de competidores do desafio`);
        }

        if (desafioEncontrado) {
            throw new BadRequestException(`Um desafio em ${dataHoraDesafio} já foi encontrado`);
        }

        const novoDesafio = new this.desafioModel(criarDesafioDto);
        novoDesafio.dataHoraSolicitacao = new Date();
        novoDesafio.status = 'PENDENTE';

        return await novoDesafio.save();
    }
}

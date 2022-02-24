import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafioService {

    constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const { dataHoraDesafio } = criarDesafioDto;
        const desafioEncontrado = await this.desafioModel.findOne({ dataHoraDesafio }).exec();

        if (desafioEncontrado) {
            throw new BadRequestException(`Um desafio em ${dataHoraDesafio} já foi encontrado`);
        }

        const novoDesafio = new this.desafioModel(criarDesafioDto);
        novoDesafio.dataHoraSolicitacao = new Date();
        novoDesafio.status = 'PENDENTE';

        return await novoDesafio.save();
    }
}

import { Model } from 'mongoose';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
export declare class DesafioService {
    private readonly desafioModel;
    constructor(desafioModel: Model<Desafio>);
    criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio>;
}

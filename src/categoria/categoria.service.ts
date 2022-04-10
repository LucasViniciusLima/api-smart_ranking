import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria-interface';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { JogadorService } from 'src/jogador/jogador.service';

@Injectable()
export class CategoriaService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadorService: JogadorService) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} já existe`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);

        return await categoriaCriada.save();
    }

    async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {
        const jogadores = await this.jogadorService.consultarTodosJogadores();

        const jogadorFilter = jogadores.filter(jogador => jogador._id == idJogador);

        if (jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${idJogador} não é um jogador!`);
        }

        return await this.categoriaModel.findOne().where('jogadores').in(idJogador).exec();
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate("jogadores").exec();
    }

    async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).populate('jogadores').exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não existe`);
        }

        return categoriaEncontrada;
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto) {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

        if (!categoriaEncontrada) {
            throw new NotFoundException(`A categoria ${categoria} não existe`);
        }

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec();
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria'];
        const idJogador = params['idJogador'];

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in(idJogador).exec();


        const jogadores = await this.jogadorService.consultarTodosJogadores();
        const jogadorFilter = jogadores.filter(jogador => jogador._id == idJogador);

        if(jogadorFilter.length == 0) {
            throw new BadRequestException(`O id ${idJogador} não é um jogador!`);
        }

        if (!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} não encontrada`);
        }
        if (jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`Jogador com id: ${idJogador} já cadastrado na categoria ${categoria}`);
        }


        categoriaEncontrada.jogadores.push(idJogador);
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
    }
}

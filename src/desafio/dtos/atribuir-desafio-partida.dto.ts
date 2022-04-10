import { IsNotEmpty } from 'class-validator';
import { Resultado } from '../interfaces/desafio.interface';
import { Jogador } from '../../jogador/interfaces/jogador.interface';


export class AtribuirDesafioPartidaDto {
    @IsNotEmpty()
    def: Jogador;

    @IsNotEmpty()
    resultado: Array<Resultado>;
}
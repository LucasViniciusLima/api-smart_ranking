import { ArrayMinSize, ArrayMaxSize, IsNotEmpty, IsDateString, IsArray } from "class-validator";
import { Jogador } from "src/jogador/interfaces/jogador.interface";

export class CriarDesafioDto {

    @IsNotEmpty()
    @IsDateString()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: Jogador;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>;
}
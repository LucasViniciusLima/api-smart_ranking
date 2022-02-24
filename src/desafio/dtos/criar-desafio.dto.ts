import { ArrayMinSize, ArrayMaxSize, IsNotEmpty, IsDateString } from "class-validator";
import { Jogador } from "src/jogador/interfaces/jogador.interface";

export class CriarDesafioDto {

    @IsDateString()
    dataHoraDesafio: Date;

    @IsNotEmpty()
    solicitante: Jogador;

    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores: Array<Jogador>;
}
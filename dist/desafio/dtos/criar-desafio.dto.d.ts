import { Jogador } from "src/jogador/interfaces/jogador.interface";
export declare class CriarDesafioDto {
    dataHoraDesafio: Date;
    solicitante: Jogador["id"];
    jogadores: Array<Jogador>;
}

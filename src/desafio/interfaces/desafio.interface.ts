import { Document } from "mongoose";
import { Jogador } from "../../jogador/interfaces/jogador.interface";

export interface Desafio extends Document{
    
    dataHoraDesafio: Date;
    status: string;
    dataHoraSolicitacao: Date;
    dataHoraResposta: Date;
    solicitante: Jogador;
    categoria: string;
    jogadores: Array<Jogador>;
    partida: Partida;

}

export interface Partida extends Document{
    categoria: string;
    def: Jogador;
    resultado: Array<Resultado>;
    jogadores: Array<Jogador>;
}

export interface Resultado{
    set: string;
}
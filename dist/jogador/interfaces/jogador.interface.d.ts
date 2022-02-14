import { Document } from "mongoose";
export interface Jogador extends Document {
    readonly _id: string;
    readonly telefoneCelular: string;
    readonly email: string;
    name: string;
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}

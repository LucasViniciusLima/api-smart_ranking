import { Evento } from "../interfaces/categoria-interface";
export declare class CriarCategoriaDto {
    readonly categoria: string;
    descricao: string;
    eventos: Array<Evento>;
}

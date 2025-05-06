import { MovimentacaoDTO } from "./movimentacaoDTOs";


export interface MovimentacaoResponseDTO {
    totalItensSaida: number;
    totalItensEntrada: number;
    movimentacoes: MovimentacaoDTO[];

}
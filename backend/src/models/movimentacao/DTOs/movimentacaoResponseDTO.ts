import { MovimentacaoDTO } from "./movimentacaoDTOs";


export interface MovimentacaoPorDataResponseDTO {
    totalItensSaida: number;
    totalItensEntrada: number;
    movimentacoes: MovimentacaoDTO[];
    valorTotalSaida: number;
    valorTotalEntrada: number;
}

export interface MovimentacaoDTO {
    id: number;
    produto_id: number;
    tipo_movimentacao: 'entrada' | 'saida';
    quantidade_movimentada: number;
    data_movimentacao: Date;
    observacao: string;
    data_criacao: Date;
    data_modificacao: Date;
}

export interface MovimentacaoResponseDTO {
    totalItensSaida: number;
    totalItensEntrada: number;
    movimentacoes: MovimentacaoDTO[];
    valorTotalSaida: number;
    valorTotalEntrada: number;

}

export interface MovimentacaoIntervaloDto {

    dataInicio: string;
    dataFim: string;
}
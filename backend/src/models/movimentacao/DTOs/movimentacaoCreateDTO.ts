export interface MovimentacaoCreateDTO {
    produto_id: number;
    tipo_movimentacao: 'entrada' | 'saida'
    quantidade_movimentada: number;
    observacao: string;
  }
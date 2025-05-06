export interface EstoqueResponseDto {
    id: number;
    produto_id: number;
    quantidade_total: number;
    estoque_minimo: number;
    valorTotal:number
    data_modificacao: Date;
  }


export interface ProdutoResponseDTO {
    id: number;
    name: string;
    descricao: string;
    codigo_produto: string;
    // quantidade: number;
    valor_unitario: number;
    estoque_minimo: number;
    ativo: boolean;
    data_criacao: Date;
    data_modificacao: Date;
  }
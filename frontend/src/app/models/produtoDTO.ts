

export interface ProdutoDTO {
    id: number;
    name: string;
    descricao: string;
    codigo_produto: string;
    tipo_produto: string;
    valor_unitario: number;
    estoque_minimo: number;
    quantidade: number
    ativo: boolean;
    data_criacao: Date;
    data_modificacao: Date;
}


export interface ProdutoCreateDTO {
    name: string;
    codigo_produto: string;
    tipo_produto: string;
    descricao: string;
    quantidade: number;
    valor_unitario: number;
    estoque_minimo: number;
}


export interface ProdutoUpdateDTO {

  name: string;
  descricao: string;
  quantidade: number;
  codigo_produto: string;
  valor_unitario: number;
  estoque_minimo: number;
  tipo_produto: string;
  // ativo: boolean;

}

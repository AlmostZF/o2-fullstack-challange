import { ProdutoDTO } from "./produtoDTO";

export interface TotalEstoqueDto {
    totalQuantidade: number;
    totalProdutos: number;
    totalEstoqueMinimo: number;
    valorTotal: number;
}


export interface EstoqueProdutosDto {
    id: number;
    produto_id: number;
    quantidade_total: number;
    estoque_minimo: number;
    data_modificacao: Date;
    produtos: ProdutoDTO;
}
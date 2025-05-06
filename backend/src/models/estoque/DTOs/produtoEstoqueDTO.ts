import { ProdutoResponseDTO } from "../../produtos/DTOs/produtoResponseDTO";

export interface EstoqueProdutosDto {
    id: number;
    produto_id: number;
    quantidade_total: number;
    estoque_minimo: number;
    data_modificacao: Date;
    produtos: ProdutoResponseDTO;
  }
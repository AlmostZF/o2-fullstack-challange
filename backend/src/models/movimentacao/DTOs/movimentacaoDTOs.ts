import { Decimal } from "@prisma/client/runtime/library";
import { ProdutoResponseDTO } from "../../produtos/DTOs/produtoResponseDTO";

export interface MovimentacaoDTO {
    id: number;
    produto_id: number;
    tipo_movimentacao: 'entrada' | 'saida';
    quantidade_movimentada: number;
    data_movimentacao: Date;
    observacao: string;
    data_criacao: Date;
    data_modificacao: Date;
    produto?: ProdutoResponseDTO;
}
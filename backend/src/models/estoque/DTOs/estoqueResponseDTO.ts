import { Decimal } from "@prisma/client/runtime/library";

export interface EstoqueResponseDto {
    id: number;
    produto_id: number;
    quantidade_total: number;
    estoque_minimo: number;
    valorTotal:Decimal
    data_modificacao: Date;
  }
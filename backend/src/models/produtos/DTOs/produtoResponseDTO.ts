import { Decimal } from "@prisma/client/runtime/library";


export interface ProdutoResponseDTO {
    id: number;
    name: string;
    descricao: string;
    codigo_produto: string;
    quantidade: number;
    tipo_produto: string;
    valor_unitario: Decimal;
    estoque_minimo: number;
    ativo: boolean;
    data_criacao: Date;
    data_modificacao: Date;
  }
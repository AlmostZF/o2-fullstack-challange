import { Prisma, PrismaClient } from "@prisma/client";
import { EstoqueCreateDto } from "../DTOs/createEstoqueDTO";
import { EstoqueResponseDto } from "../DTOs/estoqueResponseDTO";
import { EstoqueProdutosDto } from "../DTOs/produtoEstoqueDTO";
import { TotalEstoqueDto } from "../DTOs/totalEstoqueDTO";

export class EstoqueService {

    constructor(private prisma: PrismaClient) { }

    public async create(estoque: EstoqueCreateDto): Promise<EstoqueResponseDto> {
        const novoEstoque = await this.prisma.estoque.create({
            data: {
                produto_id: estoque.produto_id,
                quantidade_total: estoque.quantidade_total,
                estoque_minimo: estoque.estoque_minimo
            }
        })
        const estoqueRetorno: EstoqueResponseDto = {
            id: novoEstoque.id,
            data_modificacao: novoEstoque.data_modificacao,
            estoque_minimo: novoEstoque.estoque_minimo,
            produto_id: novoEstoque.produto_id,
            quantidade_total: novoEstoque.quantidade_total,
            valorTotal:  new Prisma.Decimal(0)
        }
        return estoqueRetorno;
    }

    public async getAll(): Promise<TotalEstoqueDto> {
        const estoques = await this.prisma.estoque.findMany({
            where: {
                produto: {
                    ativo: true
                }
            },
            include: {
                produto: true
            }
        });

        const totais = estoques.reduce(
            (acc, item) => {
                acc.totalEstoqueMinimo += item.estoque_minimo;
                acc.totalQuantidade += item.quantidade_total;
                acc.valorTotal += item.quantidade_total * item.produto.valor_unitario.toNumber();
                return acc;
            },
            { totalEstoqueMinimo: 0, totalQuantidade: 0, valorTotal: 0 }
        );

        return {
            totalProdutos: estoques.length,
            totalQuantidade: totais.totalQuantidade,
            totalEstoqueMinimo: totais.totalEstoqueMinimo,
            valorTotal: totais.valorTotal
        };
    }

    public async getByCodProduto(codigo_produto: string): Promise<EstoqueProdutosDto> {
        const estoqueProduto = await this.prisma.estoque.findFirst({
            where: {
                produto: {
                    codigo_produto: codigo_produto,
                    ativo: true
                }
            },
            include: {
                produto: true
            }
        });

        if (!estoqueProduto) {
            throw new Error("Produto não encontrado no estoque");
        }

        const estoqueDeProdutos: EstoqueProdutosDto = {
            id: estoqueProduto.id,
            produto_id: estoqueProduto.produto_id,
            quantidade_total: estoqueProduto.quantidade_total,
            estoque_minimo: estoqueProduto.estoque_minimo,
            data_modificacao: estoqueProduto.data_modificacao,
            produtos: {
                id: estoqueProduto.produto.id,
                name: estoqueProduto.produto.name,
                codigo_produto: estoqueProduto.produto.codigo_produto,
                descricao: estoqueProduto.produto.descricao,
                valor_unitario: estoqueProduto.produto.valor_unitario,
                tipo_produto: estoqueProduto.produto.tipo_produto,
                quantidade: estoqueProduto.quantidade_total,
                estoque_minimo: estoqueProduto.produto.estoque_minimo,
                ativo: estoqueProduto.produto.ativo,
                data_criacao: estoqueProduto.produto.data_criacao,
                data_modificacao: estoqueProduto.produto.data_modificacao
            }
        };

        return estoqueDeProdutos;
    }


}
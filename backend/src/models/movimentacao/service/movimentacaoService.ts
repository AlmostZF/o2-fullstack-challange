import { PrismaClient } from "@prisma/client";
import { MovimentacaoCreateDTO } from "../DTOs/movimentacaoCreateDTO";
import { MovimentacaoDTO } from "../DTOs/movimentacaoDTOs";
import { MovimentacaoIntervaloDto } from "../DTOs/movimentacaoIntervaloDTO";
import { MovimentacaoPorDataResponseDTO } from "../DTOs/movimentacaoResponseDTO";


export default class MovimentacaoService {

    constructor(private prisma: PrismaClient) { }

    public async create(movimentacao: MovimentacaoCreateDTO): Promise<MovimentacaoDTO> {
        const novaMovimentacao = await this.prisma.movimentacao.create({
            data: {
                produto_id: movimentacao.produto_id,
                quantidade_movimentada: movimentacao.quantidade_movimentada,
                tipo_movimentacao: movimentacao.tipo_movimentacao,
                observacao: movimentacao.observacao,
            }
        })

        const movimentacaoResponse: MovimentacaoDTO = {
            id: novaMovimentacao.id,
            produto_id: novaMovimentacao.produto_id,
            quantidade_movimentada: novaMovimentacao.quantidade_movimentada,
            tipo_movimentacao: novaMovimentacao.tipo_movimentacao,
            observacao: novaMovimentacao.observacao,
            data_criacao: novaMovimentacao.data_criacao,
            data_modificacao: novaMovimentacao.data_modificacao,
            data_movimentacao: novaMovimentacao.data_movimentacao
        }

        return movimentacaoResponse;

    }

    public async getAll(): Promise<MovimentacaoDTO[]> {
        const movimentacoes = await this.prisma.movimentacao.findMany();
        return movimentacoes.map(movimentacoes => {
            return {
                id: movimentacoes.id,
                produto_id: movimentacoes.produto_id,
                quantidade_movimentada: movimentacoes.quantidade_movimentada,
                tipo_movimentacao: movimentacoes.tipo_movimentacao,
                observacao: movimentacoes.observacao,
                data_criacao: movimentacoes.data_criacao,
                data_modificacao: movimentacoes.data_modificacao,
                data_movimentacao: movimentacoes.data_movimentacao
            }
        });
    }

    public async filterByDate(intervalo: MovimentacaoIntervaloDto): Promise<MovimentacaoPorDataResponseDTO> {
        const { dataInicio, dataFim } = intervalo;

        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        fim.setDate(fim.getDate() + 1);

        const movimentacoes = await this.prisma.movimentacao.findMany({
            where: {
                data_movimentacao: {
                    gte: new Date(inicio),
                    lte: new Date(fim)
                }
            }, include: {
                produto: {
                    select: {
                        valor_unitario: true,
                    }
                }
            }
        });


        const movimentacaoObjs = movimentacoes.map(movimentacao => {
            const {
                id, produto_id, quantidade_movimentada,
                tipo_movimentacao, observacao, data_criacao,
                data_modificacao, data_movimentacao, produto
            } = movimentacao;

            const valorTotal = produto ? quantidade_movimentada * produto.valor_unitario.toNumber() : 0;

            return {
                id,
                produto_id,
                quantidade_movimentada,
                tipo_movimentacao,
                observacao,
                data_criacao,
                data_modificacao,
                data_movimentacao,
                valorTotal,
            };
        });


        const calcularTotal = (tipo: 'entrada' | 'saida') =>
            movimentacaoObjs
                .filter(m => m.tipo_movimentacao === tipo)
                .reduce((acc, m) => acc + m.quantidade_movimentada, 0);

        const calcularValorTotal = (tipo: 'entrada' | 'saida') =>
            movimentacaoObjs
                .filter(m => m.tipo_movimentacao === tipo)
                .reduce((acc, m, index) => acc + (m.valorTotal || 0), 0);

        return {
            movimentacoes: movimentacaoObjs,
            totalItensEntrada: calcularTotal('entrada'),
            totalItensSaida: calcularTotal('saida'),
            valorTotalSaida: calcularValorTotal('saida'),
            valorTotalEntrada: calcularValorTotal('entrada'),
        };
    }

}
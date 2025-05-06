import { PrismaClient } from "@prisma/client";
import { MovimentacaoCreateDTO } from "../DTOs/movimentacaoCreateDTO";
import { MovimentacaoDTO } from "../DTOs/movimentacaoDTOs";
import { MovimentacaoIntervaloDto } from "../DTOs/movimentacaoIntervaloDTO";
import { MovimentacaoResponseDTO } from "../DTOs/movimentacaoResponseDTO";



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

public async filterByDate(intervalo: MovimentacaoIntervaloDto): Promise<MovimentacaoResponseDTO> {
    const { dataInicio, dataFim } = intervalo;

    const movimentacoes = await this.prisma.movimentacao.findMany({
        where: {
            data_movimentacao: {
                gte: new Date(dataInicio),
                lte: new Date(dataFim)
            }
        }
    });

    const formatMovimentacao = (movimentacao: MovimentacaoDTO): MovimentacaoDTO => ({
        id: movimentacao.id,
        produto_id: movimentacao.produto_id,
        quantidade_movimentada: movimentacao.quantidade_movimentada,
        tipo_movimentacao: movimentacao.tipo_movimentacao,
        observacao: movimentacao.observacao,
        data_criacao: movimentacao.data_criacao,
        data_modificacao: movimentacao.data_modificacao,
        data_movimentacao: movimentacao.data_movimentacao
    });

    const movimentacaoFiltrada = movimentacoes.map(formatMovimentacao);

    const calcularTotal = (tipo: 'entrada' | 'saida') =>
        movimentacaoFiltrada
            .filter(m => m.tipo_movimentacao === tipo)
            .reduce((acc, m) => acc + m.quantidade_movimentada, 0);

    return {
        movimentacoes: movimentacaoFiltrada,
        totalItensEntrada: calcularTotal('entrada'),
        totalItensSaida: calcularTotal('saida')
    };
}

}
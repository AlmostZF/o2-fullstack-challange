import { PrismaClient } from "@prisma/client";
import { ProdutoUpdateDTO } from "../DTOs/produtoUpdateDTO"
import { ProdutoCreateDTO } from "../DTOs/produtoCreateDTO"
import { ProdutoResponseDTO } from "../DTOs/produtoResponseDTO";
import { MovimentacaoCreateDTO } from "../../movimentacao/DTOs/movimentacaoCreateDTO";
import MovimentacaoService from "../../movimentacao/service/movimentacaoService";
import { EstoqueService } from "../../estoque/service/estoqueService";
import { EstoqueCreateDto } from "../../estoque/DTOs/createEstoqueDTO";


export default class ProdutoService {

    constructor(private prisma: PrismaClient, private movimentacaoService: MovimentacaoService, private estoqueService: EstoqueService) { }

    public async create(produto: ProdutoCreateDTO): Promise<ProdutoResponseDTO> {

        const findProduto = await this.prisma.produto.findFirst({
            where: {
                codigo_produto: produto.codigo_produto
            }
        })

        if (findProduto) {
            throw new Error('Um produto com esse codigo já foi cadastrado');
        }
        const novoProduto = await this.prisma.produto.create({
            data: {
                name: produto.name,
                descricao: produto.descricao,
                codigo_produto: produto.codigo_produto,
                tipo_produto: produto.tipo_produto,
                valor_unitario: produto.valor_unitario,
                estoque_minimo: produto.estoque_minimo,
                ativo: produto.ativo,
            },
        })

        const produtoResponse: ProdutoResponseDTO = {
            id: novoProduto.id,
            name: novoProduto.name,
            codigo_produto: novoProduto.codigo_produto,
            descricao: novoProduto.descricao,
            tipo_produto: novoProduto.tipo_produto,
            quantidade: produto.quantidade,
            valor_unitario: novoProduto.valor_unitario,
            estoque_minimo: novoProduto.estoque_minimo,
            ativo: novoProduto.ativo,
            data_criacao: novoProduto.data_criacao,
            data_modificacao: novoProduto.data_modificacao
        }

        const estoque: EstoqueCreateDto = {
            produto_id: produtoResponse.id,
            quantidade_total: produto.quantidade,
            estoque_minimo: produtoResponse.estoque_minimo,
        }

        await this.estoqueService.create(estoque);

        const movimentaca: MovimentacaoCreateDTO = {
            produto_id: produtoResponse.id,
            tipo_movimentacao: "entrada",
            quantidade_movimentada: estoque.quantidade_total,
            observacao: ''
        }

        await this.movimentacaoService.create(movimentaca);
        return produtoResponse;
    }

    public async getAll(): Promise<ProdutoResponseDTO[]> {
        try {
            const produtos = await this.prisma.produto.findMany({
                where: { ativo: true }, include: { estoque: true }
            });
            const produtoResponse = produtos.map((produtos) => {
                return {
                    id: produtos.id,
                    name: produtos.name,
                    descricao: produtos.descricao,
                    codigo_produto: produtos.codigo_produto,
                    tipo_produto: produtos.tipo_produto,
                    valor_unitario: produtos.valor_unitario,
                    estoque_minimo: produtos.estoque_minimo,
                    ativo: produtos.ativo,
                    data_criacao: produtos.data_criacao,
                    data_modificacao: produtos.data_modificacao,
                    quantidade: produtos.estoque?.quantidade_total ?? 0
                }
            })
            return produtoResponse

        } catch (error) {
            throw new Error('Erro ao buscar produtos');
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const produto = await this.prisma.produto.findUnique({
                where: { id: id, }, include: { estoque: true }
            })

            if (!produto) {
                throw new Error('Produto não encontrado');
            }

            await this.prisma.produto.update({
                where: { id: id },
                data: { ativo: false }
            })

            const movimentaca: MovimentacaoCreateDTO = {
                produto_id: produto.id,
                tipo_movimentacao: "saida",
                quantidade_movimentada: produto.estoque?.quantidade_total ?? 0,
                observacao: ''
            }

            await this.movimentacaoService.create(movimentaca);

        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }

    public async update(id: number, produto: ProdutoUpdateDTO): Promise<ProdutoResponseDTO> {

        try {
            const produtoExistente = await this.prisma.produto.findUnique({
                where: { id: id }, include: { estoque: true }
            })

            if (!produtoExistente) {
                throw new Error('Produto não encontrado');
            }

            const produtoEditado = await this.prisma.produto.update({
                where: { id: id },
                data: {
                    name: produto.name,
                    descricao: produto.descricao,
                    codigo_produto: produto.codigo_produto,
                    tipo_produto: produto.tipo_produto,
                    valor_unitario: produto.valor_unitario,
                    estoque_minimo: produto.estoque_minimo,
                    ativo: produto.ativo,
                    estoque: {
                        update: {
                            quantidade_total: produto.quantidade
                        }
                    }
                },
                include: { estoque: true }
            })

            const produtoResponse: ProdutoResponseDTO = {
                id: produtoEditado.id,
                name: produtoEditado.name,
                descricao: produtoEditado.descricao,
                codigo_produto: produtoEditado.codigo_produto,
                tipo_produto: produtoEditado.tipo_produto,
                valor_unitario: produtoEditado.valor_unitario,
                estoque_minimo: produtoEditado.estoque_minimo,
                ativo: produtoEditado.ativo,
                data_criacao: produtoEditado.data_criacao,
                data_modificacao: produtoEditado.data_modificacao,
                quantidade: produtoEditado.estoque?.quantidade_total ?? 0
            }


            return produtoResponse;
        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }

    public async getByID(id: number): Promise<ProdutoResponseDTO> {
        try {
            const produtoExistente = await this.prisma.produto.findUnique({
                where: { id: id, ativo: true }, include: { estoque: true }
            })

            if (!produtoExistente) {
                throw new Error('Produto não encontrado');
            }

            const produtoResponse: ProdutoResponseDTO = {
                id: produtoExistente.id,
                name: produtoExistente.name,
                descricao: produtoExistente.descricao,
                codigo_produto: produtoExistente.codigo_produto,
                tipo_produto: produtoExistente.tipo_produto,
                valor_unitario: produtoExistente.valor_unitario,
                estoque_minimo: produtoExistente.estoque_minimo,
                ativo: produtoExistente.ativo,
                data_criacao: produtoExistente.data_criacao,
                data_modificacao: produtoExistente.data_modificacao,
                quantidade: produtoExistente.estoque?.quantidade_total ?? 0
            }

            return produtoResponse;

        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }


}
import { PrismaClient } from "@prisma/client";
import { ProdutoUpdateDTO } from "../DTOs/produtoUpdateDTO"
import { ProdutoCreateDTO } from "../DTOs/produtoCreateDTO"
import { ProdutoResponseDTO } from "../DTOs/produtoResponseDTO";
import { MovimentacaoCreateDTO } from "../../movimentacao/DTOs/movimentacaoCreateDTO";
import MovimentacaoService from "../../movimentacao/service/movimentacao_service";
import { EstoqueService } from "../../estoque/service/estoque_service";
import { EstoqueCreateDto } from "../../estoque/DTOs/createEstoqueDTO";


export default class ProdutoService {

    constructor(private prisma: PrismaClient, private movimentacaoService: MovimentacaoService, private estoqueService: EstoqueService) { }

    public async create(produto: ProdutoCreateDTO): Promise<ProdutoResponseDTO> {

        const findProduto = await this.prisma.produto.findFirst({
            where: {
                codigo_produto: produto.codigo_produto
            }
        })

        if(findProduto){
            throw new Error('Produto já cadastrado');
        }
        const novoProduto = await this.prisma.produto.create({
            data: {
                name: produto.name,
                descricao: produto.descricao,
                codigo_produto: produto.codigo_produto,
                // quantidade: produto.quantidade,
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
            // quantidade: novoProduto.quantidade,
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

        //implementar logica do estoque
        const movimentaca: MovimentacaoCreateDTO =  {
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
                where: { ativo: true }
            });
            return produtos

        } catch (error) {
            throw new Error('Erro ao buscar produtos');
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const produto = await this.prisma.produto.findUnique({
                where: { id: id, }, include: {estoque: true}
            })

            if (!produto) {
                throw new Error('Produto não encontrado');
            }

            await this.prisma.produto.update({
                where: { id: id },
                data: { ativo: false }
            })

            const movimentaca: MovimentacaoCreateDTO =  {
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
                where: { id: id }
            })

            if (!produtoExistente) {
                throw new Error('Produto não encontrado');
            }

            const produtoEditado = this.prisma.produto.update({
                where: { id: id },
                data: {
                    name: produto.name,
                    descricao: produto.descricao,
                    // quantidade: produto.quantidade,
                    valor_unitario: produto.valor_unitario,
                    estoque_minimo: produto.estoque_minimo,
                    ativo: produto.ativo,
                }
            })

            return produtoEditado;
        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }

    public async getByID(id: number): Promise<ProdutoResponseDTO> {
        try {            
            const produtoExistente = await this.prisma.produto.findUnique({
                where: { id: id, ativo: true }
            })

            if(!produtoExistente){
                throw new Error('Produto não encontrado');
            }

            return produtoExistente;

        } catch (error) {
            throw new Error('Produto não encontrado');
        }
    }


}
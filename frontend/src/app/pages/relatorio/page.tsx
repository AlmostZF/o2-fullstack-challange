'use client'
import { ChartComponent } from "@/app/components";
import { TotalEstoqueDto } from "@/app/models/estoqueDTO";
import { MovimentacaoResponseDTO } from "@/app/models/movimentacaoDTO";
import { ProdutoDTO } from "@/app/models/produtoDTO";
import { getStock } from "@/app/services/estoque.service";
import { filterMovements } from "@/app/services/movimentacao.service";
import { getProducts } from "@/app/services/produto.service";
import { dateFormatter } from "@/app/utils/dataFormatter";
import { useEffect, useState } from "react";

export default function Relatorio() {

  const [totalMovements, setTotalMovements] = useState<MovimentacaoResponseDTO | null>(null);
  const [chart, setChart] = useState<boolean>(false);
  const [product, setProduct] = useState<ProdutoDTO[]>([]);
  const [StockTotal, setStockTotal] = useState<TotalEstoqueDto | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const [selectedOption, setSelectedOption] = useState<string>("movimentacoes");

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const responseProduto = await getProducts();
        setProduct(responseProduto);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }

    };
    fetchProduto();
  }, []);


  useEffect(() => {
    const fetchEstoqueTotal = async () => {
      try {
        const responseEstoqueTotal = await getStock();
        setStockTotal(responseEstoqueTotal);
      } catch (error) {
        console.error("Erro ao buscar estoqueTotal", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEstoqueTotal();

  }, []);



  const handleFilter = async (data_final: string, data_inicial: string) => {
    if (data_final === "" || data_inicial === "") return
    try {
      const movimentacaoIntervado = {
        dataInicio: data_inicial,
        dataFim: data_final
      }
      const fitrarMovimentacao = await filterMovements(movimentacaoIntervado)
      setTotalMovements(fitrarMovimentacao);
    } catch (error) {
      console.error("Erro ao buscar estoqueTotal", error);
      alert("Erro ao filtrar os dados de movimentação de Produtos",)
    }
  }

  if (loading === true) {
    return <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Carregando...</h1>;
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <label htmlFor="tipo_produto" className="text-1xl block mb-1 font-medium text-gray-700">
          Qual tipo de relatório você deseja gerar?
        </label>
        <select
          id="tipo_produto"
          name="tipo_produto"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="block w-110 rounded-md bg-white pr-2 px-2 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="movimentacoes">Movimentações de Produtos</option>
          <option value="estoque_total">Resumo Geral de Estoque</option>
          <option value="lista_produtos">Lista de produtos</option>
        </select>
      </div>

      {selectedOption === "movimentacoes" && <>
        <div className="flex justify-center p-4 gap-4">

          <div>
            <label htmlFor="data_inicial" className="block mb-1 text-1xl font-medium text-gray-700">Data Inicial</label>
            <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label htmlFor="data_final" className="block mb-1 text-1xl font-medium text-gray-700">Data Final</label>
            <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <button
            onClick={() => { handleFilter(dataFinal, dataInicial) }}
            type="button"
            className="w-25 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white  text-sm font-semibold px-4 py-2 rounded-md transition-colors">
            Filtrar
          </button>

        </div>
        {totalMovements && <>
          <div className="flex justify-center p-4 gap-4">
            <button onClick={() => setChart(!chart)}
              type="submit"
              className="w-40 mt-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
              {chart ? "Mostrar Tabela" : "Visualizar Gráfico"}
            </button>
          </div>
          {chart ? (<>
            <div className="flex justify-center pr-6
            ">

              <ChartComponent
                data={[
                  {
                    tipo_movimentacao: 'Entrada',
                    valor_total: totalMovements.valorTotalEntrada,
                  },
                  {
                    tipo_movimentacao: 'Saída',
                    valor_total: totalMovements.valorTotalSaida,
                  },
                ]}
                xAxisKey="tipo_movimentacao"
                barDataKeys={[
                  { key: 'valor_total', name: 'Valor Total (R$)', fill: '#409660' },
                ]}
                height={400}
                width="100%"
              />
            </div>


          </>) :
            (<>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo Movimentação</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">total entrada de itens </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">total saida de itens </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantidade Movimentada</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Movimentação</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {totalMovements.movimentacoes.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          Nenhum dado encontrado
                        </td>
                      </tr>
                    ) : (
                      totalMovements.movimentacoes.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-900">{item.tipo_movimentacao}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalMovements.totalItensEntrada}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalMovements.totalItensSaida}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade_movimentada}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateFormatter(item.data_modificacao)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>)}


        </>}
      </>
      }

      {selectedOption === "estoque_total" && <>
        <div className="overflow-x-auto p-4 gap-4">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Total de produtos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantidade Total </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estoque minimo total </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Valor total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{StockTotal?.totalProdutos}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{StockTotal?.totalQuantidade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{StockTotal?.totalEstoqueMinimo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{' '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(StockTotal!.valorTotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>}

      {selectedOption === "lista_produtos" && <>
        <div className="overflow-x-auto p-4 gap-4">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nome do produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Código do produto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tipo produto </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Valor Unitário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estoque minimo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data Entrada</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {product.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum dado encontrado
                  </td>
                </tr>
              ) : (
                product.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.codigo_produto}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-500">{item.tipo_produto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.valor_unitario)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.estoque_minimo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateFormatter(item.data_criacao)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </>}

    </div>

  )
} 
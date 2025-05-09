"use client"
import { ProdutoDTO } from "./models/produtoDTO";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "./services/produto.service";
import Link from "next/link";

export default function Home() {

  const [product, setProduct] = useState<ProdutoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtos = await getProducts();
        setProduct(produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        // console.log("Produtos:", produtos);
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProduct((prevProduct) => prevProduct?.filter((product) => product.id !== id));
      alert("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  }

  if (loading == true) {
    return <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Carregando...</h1>;
  }

  if (product.length === 0) {
    return <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Você não tem nenhum produto cadastrado</h1>
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Lista de Produtos</h1>
      <div className="space-y-6 ">
        {product.map((produto) => (
          <div
            key={produto.id}
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">

            <h2 className="text-2xl font-semibold text-gray-800 text-center">{produto.name}</h2>
            <p className="text-1xl text-gray-500 mb-2 text-center">Código: {produto.codigo_produto}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-base text-gray-700 mb-4 mt-4">
              <p>
                <span className="font-semibold">Preço:</span>{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(produto.valor_unitario)}
              </p>
              <p><span className="font-semibold">Quantidade:</span> {produto.quantidade}</p>
              <p><span className="font-semibold">Tipo:</span> {produto.tipo_produto}</p>
            </div>
            <div className="text-base text-gray-700 mb-4 mt-4">
              <p><span className="font-semibold">Descrição:</span> {produto.descricao}</p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/pages/edit/${produto.id}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white  text-sm font-semibold px-4 py-2 rounded-md transition-colors"> Editar
              </Link>
              <button
                onClick={() => handleDelete(produto.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition-colors"> Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  

}

'use client'

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ProdutoCreateDTO } from "../../models/produtoDTO";
import { createProduct } from "../../services/produto.service";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function CreatePage() {

    const router = useRouter();
    const { handleSubmit, register, formState: { errors }, reset } = useForm<ProdutoCreateDTO>({

        defaultValues: {
            name: "",
            codigo_produto: "",
            descricao: "",
            quantidade: 0,
            valor_unitario: 0,
            estoque_minimo: 0,
            tipo_produto: "eletronico",
        }
    })


    const onSubmit: SubmitHandler<ProdutoCreateDTO> = async (data: ProdutoCreateDTO) => {
        try {
            const quantidade = parseInt(data.quantidade.toString(), 10);
            const estoque_minimo = parseInt(data.estoque_minimo.toString(), 10);
            const valor_unitario = parseFloat(data.valor_unitario.toString());

            await createProduct({
                ...data,
                valor_unitario: valor_unitario,
                quantidade: quantidade,
                estoque_minimo: estoque_minimo,
            });
            reset();
            alert("Produto registrado com sucesso!");
            router.push("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data?.message ?? "Erro ao registrar o produto. Tente novamente.");
            }
        }
    }

    const onError: SubmitErrorHandler<FormData> = (errors) => console.log(errors);


    return (
        <div className="p-4">
            <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Adicionar produto</h3>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="max-w-4xl mx-auto space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Nome do produto</label>
                            <input
                                {...register("name", { required: "Nome é obrigatório" })}
                                type="text"
                                id="name"
                                name="name"
                                className="block w-full rounded-md bg-white px-2 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="codigo_produto" className="block mb-1 text-sm font-medium text-gray-700">Código do produto</label>
                            <input
                                {...register("codigo_produto", { required: "Código do produto é obrigatório" })}
                                type="text"
                                id="codigo_produto"
                                name="codigo_produto"
                                className="block w-full rounded-md bg-white px-2 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.codigo_produto && <p className="text-red-500 text-sm">{errors.codigo_produto.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="tipo_produto" className="block mb-1 text-sm font-medium text-gray-700">Tipo do produto</label>
                            <select
                                id="tipo_produto"
                                name="tipo_produto"
                                className="block w-full rounded-md bg-white pr-2 px-2 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="eletrônico">Eletrônico</option>
                                <option value="vestuário">Vestuário</option>
                                <option value="alimento">Alimento</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="valor_unitario" className="block mb-1 text-sm font-medium text-gray-700">Preço</label>
                            <input
                                {...register("valor_unitario", {
                                    required: "Preço é obrigatório",
                                    min: {
                                        value: 0,
                                        message: "O valor mínimo é 0",
                                    },
                                })}
                                type="number"
                                step="0.01"
                                min={0}
                                id="valor_unitario"
                                name="valor_unitario"
                                className="block w-full rounded-md bg-white px-2 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.valor_unitario && <p className="text-red-500 text-sm">{errors.valor_unitario.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="estoque_minimo" className="block mb-1 text-sm font-medium text-gray-700">Estoque mínimo</label>
                            <input
                                {...register("estoque_minimo", {
                                    required: "Estoque mínimo é obrigatório",
                                    min: {
                                        value: 0,
                                        message: "O valor mínimo é 0",
                                    },
                                })}
                                type="number"
                                id="estoque_minimo"
                                name="estoque_minimo"
                                min={0}
                                className="block w-full rounded-md bg-white px-2 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.estoque_minimo && <p className="text-red-500 text-sm">{errors.estoque_minimo.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="quantidade" className="block mb-1 text-sm font-medium text-gray-700">Quantidade</label>
                            <input
                                {...register("quantidade", {
                                    required: "Quantidade é obrigatório",
                                    min: {
                                        value: 0,
                                        message: "O valor mínimo é 0",
                                    },
                                })}
                                type="number"
                                id="quantidade"
                                min={0}
                                name="quantidade"
                                className="block w-full rounded-md bg-white px-2 py-2 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.quantidade && <p className="text-red-500 text-sm">{errors.quantidade.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 ">
                        <div>
                            <label htmlFor="descricao" className=" block mb-1 text-sm font-medium text-gray-700">Descricao do produto</label>
                            <input
                                {...register("descricao", { required: "Descricao é obrigatória" })}
                                type="text"
                                id="descricao"
                                name="descricao"
                                className="block w-full rounded-md bg-white px-2 py-4 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full mt-4 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import axios from "axios"
import { ENDPOINTS } from "./endpoits"
import { ProdutoCreateDTO, ProdutoUpdateDTO} from "../models/produtoDTO";

const getToken = () => {
    return "TOKEN123456789";
};

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getProducts = async () => {
    try {
        const response = await axios.get(ENDPOINTS.PRODUTOS.GET_ALL, authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar todos produtos');
    } catch (error) {
        throw error;
    }
}
export const updateProduct = async (id: number, product:  ProdutoUpdateDTO ) => {
    try {
        const response = await axios.put(ENDPOINTS.PRODUTOS.UPDATE(id), product, authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao editar produtos');
    } catch (error) {
        throw error;
    }
}
export const getProductById = async (id: number) => {
    try {
        const response = await axios.get(ENDPOINTS.PRODUTOS.GET_BY_ID(id), authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar produto');
    } catch (error) {
        throw error;
    }
}
export const createProduct = async (product:  ProdutoCreateDTO) => {
    try {
        const response = await axios.post(ENDPOINTS.PRODUTOS.CREATE, product, authHeaders(), );
        if (response.status === 201) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar todos produtos');
    } catch (error) {
        throw error;
    }
}
export const deleteProduct = async (id: number) => {
    try {
        const response = await axios.delete(ENDPOINTS.PRODUTOS.DELETE(id), authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao deletar produtos');
    } catch (error) {
        throw error;
    }
}

import axios from "axios"
import { ENDPOINTS } from "./endpoits"

const getToken = () => {
    return "TOKEN123456789";
};

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getStock = async () => {
    try {
        const response = await axios.get(ENDPOINTS.ESTOQUE.GET_ALL, authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar estoque	');
    } catch (error) {
        throw error;
    }
}
export const getStockByProductCode = async (id:string) => {
    try {
        const response = await axios.get(ENDPOINTS.ESTOQUE.GET_BY_COD_PRODUTO(id), authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar estoque por codigo de produto');
    } catch (error) {
        throw error;
    }
}
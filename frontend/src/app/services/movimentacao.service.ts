import axios from "axios"
import { ENDPOINTS } from "./endpoits"
import { MovimentacaoDTO, MovimentacaoIntervaloDto } from "../models/movimentacaoDTO";


const getToken = () => {
    return "TOKEN123456789";
};

const authHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllMovements = async (movementDTO: MovimentacaoDTO) => {
    try {
        const response = await axios.put(ENDPOINTS.MOVIMENTACAO.GET_ALL, movementDTO, authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar todas movimentações	');
    } catch (error) {
        throw error;
    }
}
export const filterMovements = async (movement:MovimentacaoIntervaloDto) => {
    try {
        const response = await axios.post(ENDPOINTS.MOVIMENTACAO.FILTER_BY_DATE, movement, authHeaders());
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Erro ao buscar movimentações');
    } catch (error) {
        throw error;
    }
}
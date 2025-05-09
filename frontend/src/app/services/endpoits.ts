const BASE_URL = "http://localhost:5001";

export const ENDPOINTS = {
  PRODUTOS: {
    GET_BY_ID: (id: number) => `${BASE_URL}/v1/produtos/${id}`,
    CREATE: `${BASE_URL}/v1/produtos`,
    UPDATE: (id: number) => `${BASE_URL}/v1/produtos/${id}`,
    DELETE: (id: number) => `${BASE_URL}/v1/produtos/${id}`,
    GET_ALL: `${BASE_URL}/v1/todos-produtos`
  },

  MOVIMENTACAO: {
    GET_ALL: `${BASE_URL}/v1/movimentacao`,
    FILTER_BY_DATE: `${BASE_URL}/v1/movimentacao`,
  },

  ESTOQUE: {
    GET_ALL: `${BASE_URL}/v1/estoque`,
    GET_BY_COD_PRODUTO: (id: string) => `${BASE_URL}/v1/estoque/${id}`,
  },
};
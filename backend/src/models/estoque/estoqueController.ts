import { formatError, formatResponse, response_status_codes } from "../../shared/utils/response_status_codes.service";
import { EstoqueService } from "./service/estoqueService";
import { Request, Response } from 'express';

export class EstoqueController{
    constructor(private estoqueService: EstoqueService){}

    getByCodProduto(req: Request, res: Response){
        if(req.params.id){
            this.estoqueService.getByCodProduto(req.params.id).then((estoqueProduto) => {
                return res.status(response_status_codes.success).json(formatResponse(estoqueProduto));
            }).catch(error => {
                return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao buscar estoque", error));
            });
        }else{
            return res.status(response_status_codes.bad_request).json(formatError("parametros insuficientes"));
        }
    }

    getAll(req: Request, res: Response){
        this.estoqueService.getAll().then((estoqueProduto) => {
            return res.status(response_status_codes.success).json(formatResponse(estoqueProduto));
        }).catch(error => {
            return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao buscar estoque", error));
        });
    }
}
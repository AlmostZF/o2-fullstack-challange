import { formatError, formatResponse, response_status_codes } from "../../shared/utils/response_status_codes.service";
import MovimentacaoService  from "./service/movimentacaoService"
import { Request, Response } from 'express';

export class MovimentacaoController{

    constructor(private movimentacaoService: MovimentacaoService){}

    getAll(req: Request, res: Response){
        this.movimentacaoService.getAll().then((movimentacoes)=>{
           return res.status(response_status_codes.success).json(formatResponse(movimentacoes));
            
        }).catch(error => {
            return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao buscar movimentações", error));
            
        })

    }

    filterByDate(req: Request, res: Response){
        this.movimentacaoService.filterByDate(req.body).then((movimentacao) =>{
            return res.status(response_status_codes.success).json(formatResponse(movimentacao));
        }).catch(error =>{
            return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao buscar movimentações", error));
        })
    }
}
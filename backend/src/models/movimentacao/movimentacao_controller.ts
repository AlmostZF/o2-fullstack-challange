import MovimentacaoService  from "./service/movimentacao_service"
import { Request, Response } from 'express';

export class MovimentacaoController{

    constructor(private movimentacaoService: MovimentacaoService){}

    getAll(req: Request, res: Response){
        this.movimentacaoService.getAll().then((movimentacoes)=>{
            return res.status(200).send(movimentacoes)
        }).catch(error => {
            return res.status(500).send({message: error.message})
        })

    }

    filterByDate(req: Request, res: Response){
        this.movimentacaoService.filterByDate(req.body).then((movimentacao) =>{
            return res.status(200).send(movimentacao)
        }).catch(error =>{
            return res.status(500).send({message: error.message})
        })
    }
}
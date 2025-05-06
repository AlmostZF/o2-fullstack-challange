import { EstoqueService } from "./service/estoque_service";
import { Request, Response } from 'express';

export class EstoqueController{
    constructor(private estoqueService: EstoqueService){}

    getByCodProduto(req: Request, res: Response){
        if(req.params.id){
            this.estoqueService.getByCodProduto(req.params.id).then((estoqueProduto) => {
                return res.status(200).send({estoque: estoqueProduto})
            }).catch(error => {
                return res.status(500).send({message: error.message})
            });
        }else{
            return res.status(500).send({message: "parametros insuficientes"})
        }
    }

    getAll(req: Request, res: Response){
        this.estoqueService.getAll().then((estoqueProduto) => {
            res.status(200).send({estoque: estoqueProduto})
        }).catch(error => {
            return res.status(500).send({message: error.message})
        });
    }
}
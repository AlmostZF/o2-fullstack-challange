import { Request, Response } from 'express';
import ProdutoService from './service/produto_service';

export class ProdutoController {

    constructor(private produtoService: ProdutoService) { }

    getAll(req: Request, res: Response) {
        this.produtoService.getAll().then((result) => {
            res.send(result);
        }).catch(error => {
            res.status(500).send(error);
        });

    }

    update(req: Request, res: Response) {
        if(req.body && req.params.id){
            this.produtoService.update(parseInt(req.params.id), req.body).then((produtoEditado) =>{
                return res.status(200).send({message: "Produto editado com sucesso", produto: produtoEditado});
            }).catch(error => {
                return res.status(500).send({message: error.message});
            })
        } else {
            return res.status(400).send("Parâmetros insuficientes");
        }
    }

    getByID(req: Request, res: Response) {
       if(req.params.id){
        this.produtoService.getByID(parseInt(req.params.id)).then((produto) => {
            return res.status(200).send({message: "Produto encontrado", produto:produto})
        }).catch(error => {
            return res.status(500).send({message: error.message});
        })
       } else {
        return res.status(400).send("Parâmetros insuficientes");
       }
    }

    create(req: Request, res: Response) {
        if (req.body) {
            this.produtoService.create(req.body).then((novoProduto) => {
                return res.status(201).send({ message: "Produto criado com Sucesso", produto: novoProduto });
            }).catch(error => {
                return res.status(500).send({ message: error.message });
            });
        } else {
            return res.status(400).send("Parâmetros insuficientes");
        }
    }

    delete(req: Request, res: Response) {
        if (req.params.id) {
            this.produtoService.delete(parseInt(req.params.id)).then(() => {
                res.status(200).send("Produto deletado com sucesso");
            }).catch(error => {
                res.status(500).send({ message: error.message });
            });
        } else {
            res.status(400).send("Parâmetros insuficientes");
        }
    }


}
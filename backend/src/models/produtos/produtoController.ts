import { Request, Response } from 'express';
import ProdutoService from './service/produtoService';
import { formatError, formatResponse, response_status_codes } from '../../shared/utils/response_status_codes.service';

export class ProdutoController {

    constructor(private produtoService: ProdutoService) { }

    getAll(req: Request, res: Response) {
        this.produtoService.getAll().then((result) => {
            res.status(response_status_codes.success).json(formatResponse(result));
        }).catch(error => {
            res.status(response_status_codes.internal_server_error).json(formatError("Erro ao buscar Produtos", error));
        });

    }

    update(req: Request, res: Response) {
        if(req.body && req.params.id){
            this.produtoService.update(parseInt(req.params.id), req.body).then((produtoEditado) =>{
                return res.status(response_status_codes.success).json(formatResponse(produtoEditado));
            }).catch(error => {
                return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao atualizar Produtos", error));
            })
        } else {
            return res.status(response_status_codes.bad_request).json(formatError("Parâmetros insuficientes"));
        }
    }

    getByID(req: Request, res: Response) {
       if(req.params.id){
        this.produtoService.getByID(parseInt(req.params.id)).then((produto) => {
            return res.status(response_status_codes.success).json(formatResponse(produto));
        }).catch(error => {
            return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao buscar Produtor", error));
        })
       } else {
        return res.status(response_status_codes.bad_request).json(formatError("Parâmetros insuficientes"));
       }
    }

    create(req: Request, res: Response) {
        if (req.body) {
            this.produtoService.create(req.body).then((novoProduto) => {
                return res.status(response_status_codes.created).json(formatResponse(novoProduto));
            }).catch(error => {
                return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao criar Produtor", error));
            });
        } else {
            return res.status(response_status_codes.bad_request).json(formatError("Parâmetros insuficientes"));
        }
    }

    delete(req: Request, res: Response) {
        if (req.params.id) {
            this.produtoService.delete(parseInt(req.params.id)).then(() => {
                return res.status(response_status_codes.success).json(formatResponse("Produto deletado com sucesso"));
            }).catch(error => {
                return res.status(response_status_codes.internal_server_error).json(formatError("Erro ao deletar Produtor", error));
            });
        } else {
            return res.status(response_status_codes.bad_request).json(formatError("Parâmetros insuficientes"));
        }
    }


}
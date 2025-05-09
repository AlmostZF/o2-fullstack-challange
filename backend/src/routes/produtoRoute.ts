import { Application, Request, Response } from "express";
import cors from 'cors';
import { ProdutoController } from "../models/produtos/produtoController";
import authMiddleware from "../shared/middleware/auth.middleware";
import { ProdutoCreateDTO } from "../models/produtos/DTOs/produtoCreateDTO";
import validarDto from "../shared/middleware/validation.middleware";
import { ProdutoUpdateDTO } from "../models/produtos/DTOs/produtoUpdateDTO";



export class ProdutosRoute {

    constructor(private produtoController: ProdutoController){}

    public route(app: Application): void {   

        app.options('/v1/produtos', cors());
        app.get('/v1/todos-produtos', cors(), authMiddleware, async (req:Request, res:Response) => {
            this.produtoController.getAll(req, res);
        });

        app.put('/v1/produtos/:id', cors(), authMiddleware, validarDto(ProdutoUpdateDTO), async (req:Request, res:Response) => {
            this.produtoController.update(req, res);
        });

        app.get('/v1/produtos/:id', cors(), authMiddleware, async (req:Request, res:Response) => {
            this.produtoController.getByID(req, res);
        });

        app.post('/v1/produtos', cors(), authMiddleware, validarDto(ProdutoCreateDTO), async (req:Request, res:Response) => {
            this.produtoController.create(req, res);
        });

        app.delete('/v1/produtos/:id', cors(), authMiddleware,  async (req:Request, res:Response) => {
            this.produtoController.delete(req, res);
        });

    }
}
import { Application, Request, Response } from "express";
import cors from 'cors';
import { EstoqueController } from "../models/estoque/estoque_controller";
import authMiddleware from "../shared/middleware/auth.middleware";


export class EstoqueRoute {

    constructor(private estoqueController: EstoqueController){}

    public route(app: Application): void {   

        app.options('/v1/estoque', cors());
        app.get('/v1/estoque', cors(), authMiddleware, async (req:Request, res:Response) => {
            this.estoqueController.getAll(req, res);
        });

        app.get('/v1/estoque/:id', cors(), authMiddleware, async (req:Request, res:Response) => {
            this.estoqueController.getByCodProduto(req, res);
        });
    }
}
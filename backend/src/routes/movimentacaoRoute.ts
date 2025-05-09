import { Application, Request, Response } from "express";
import cors from 'cors';
import  { MovimentacaoController }  from "../models/movimentacao/movimentacaoController";
import validarDto from "../shared/middleware/validation.middleware";
import { MovimentacaoIntervaloDto } from "../models/movimentacao/DTOs/movimentacaoIntervaloDTO";
import authMiddleware from "../shared/middleware/auth.middleware";


export class MovimentacaoRoute {

    constructor(private movimentacaoController: MovimentacaoController){}

    public route(app: Application): void {   

        app.options('/v1/movimentacao', cors());
        app.get('/v1/movimentacao', cors(), authMiddleware, async (req:Request, res:Response) => {
            this.movimentacaoController.getAll(req, res);
        });

        app.post('/v1/movimentacao', cors(), authMiddleware, validarDto(MovimentacaoIntervaloDto),  async (req:Request, res:Response) => {
            this.movimentacaoController.filterByDate(req, res);
        });
    }
}
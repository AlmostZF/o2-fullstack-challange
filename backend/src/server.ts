import express from 'express';
import cors from 'cors';
import { ProdutosRoute } from './routes/produtoRoute';
import { ProdutoController } from './models/produtos/produtoController';
import ProdutoService from './models/produtos/service/produtoService';

import env from '../environment';
import { PrismaClient } from '@prisma/client';
import MovimentacaoService from './models/movimentacao/service/movimentacaoService';
import { MovimentacaoController } from './models/movimentacao/movimentacaoController';
import { MovimentacaoRoute } from './routes/movimentacaoRoute';
import { EstoqueService } from './models/estoque/service/estoqueService';
import { EstoqueController } from './models/estoque/estoqueController';
import { EstoqueRoute } from './routes/estoqueRoute';
import { UtilityRoutes } from './routes/utilityRoute';




class Server {
    public server: express.Application;

    private database = new PrismaClient();

    private movimentacaoService = new MovimentacaoService(this.database);
    private movimentacaoController = new MovimentacaoController(this.movimentacaoService);
    private movimentacaoRoute = new MovimentacaoRoute(this.movimentacaoController);

    private estoqueService = new EstoqueService(this.database)
    private estoqueController = new EstoqueController(this.estoqueService)
    private estoqueRoute = new EstoqueRoute(this.estoqueController)

    private produtoService = new ProdutoService(this.database, this.movimentacaoService, this.estoqueService);
    private produtoController = new ProdutoController(this.produtoService);
    private produtosRoute = new ProdutosRoute(this.produtoController);

    private utility = new UtilityRoutes();


    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.server = express();
        this.config();
        this.produtosRoute.route(this.server);
        this.movimentacaoRoute.route(this.server);
        this.estoqueRoute.route(this.server);
        this.utility.route(this.server);
    }

    public config(): void {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.listen(env.getPort(), function () { console.log(`Servidor ligado na porta: ${env.getPort()}`) })
    }

}


export default new Server().server;
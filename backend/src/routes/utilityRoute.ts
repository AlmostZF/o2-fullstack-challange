import { Application, Request, Response } from 'express';

export class UtilityRoutes {
  public route(app: Application) {

    app.get('/health', (req: Request, res: Response) => {
      res.status(200).send({
        status: 'OK',
        timestamp: new Date().toISOString(),
      });
    });
    
  }
}

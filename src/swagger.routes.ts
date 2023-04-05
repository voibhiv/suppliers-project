import { Router, Request, Response } from 'express';
import { setup, serve } from 'swagger-ui-express';

import SwaggerDocument from './middlewares/swagger';

export class SwaggerRoutes {
  async load(): Promise<Router> {
    const swaggerRoute = Router();
    const document = await SwaggerDocument.load();
    swaggerRoute.use('/api/', serve);
    swaggerRoute.get('/api/', setup(document));
    swaggerRoute.get('/api/', (_: Request, res: Response) => res.json(document));

    return swaggerRoute;
  }
}

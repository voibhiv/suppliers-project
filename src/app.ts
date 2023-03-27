import './util/module-alias';
import bodyParser from 'body-parser';
import express from 'express';
import HelloWorldController from './controllers/hello-world-controller';
import { SwaggerRoutes } from './swagger.routes';
class App {
  public server;

  constructor() {
    this.server = express();
    this.setupExpress();
    this.middlewares();
    this.routes();
    this.configSwagger();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use([HelloWorldController]);
  }

  private async configSwagger(): Promise<void> {
    const swaggerRoutes = new SwaggerRoutes();
    const swagger = await swaggerRoutes.load();
    this.server.use(swagger);
  }

  private setupExpress(): void {
    this.server.use(bodyParser.json());
  }
}

export default new App().server;

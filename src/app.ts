import './util/module-alias';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import HelloWorldController from './controllers/hello-world-controller';
import { SwaggerRoutes } from './swagger.routes';
import { AppDataSource } from './data-source';
export class App {
  public server: Application;

  public async init(): Promise<void> {
    this.server = express();
    this.setupExpress();
    this.databaseSetup();
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

  private async databaseSetup(): Promise<void> {
    AppDataSource.initialize();
  }

  public runServer(port: string | undefined): void {
    this.server.listen(Number(port));
  }

  public async close(): Promise<void> {
    AppDataSource.destroy();
  }

  public getApp(): Application {
    return this.server;
  }
}

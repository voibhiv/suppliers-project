import './util/module-alias';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import express from 'express';
import HelloWorldController from './controllers/hello-world-controller';
class App {
  public server;

  constructor() {
    this.server = express();
    this.setupExpress();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use([
      HelloWorldController
    ]);
  }

  private setupExpress(): void {
    this.server.use(bodyParser.json());
  }
}

export default new App().server;

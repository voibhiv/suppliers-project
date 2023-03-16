import './util/module-alias';
import bodyParser from 'body-parser';
import express from 'express';
import HelloWorldRouter from './routes/hello-world-route';

class App {
  public server;

  constructor() {
    this.server = express();
    this.setupExpress();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use([HelloWorldRouter]);
  }

  private setupExpress(): void {
    this.server.use(bodyParser.json());
  }
}

export default new App().server;

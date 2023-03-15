import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';

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
    this.server.use([
      routes
    ]);
  }

  private setupExpress(): void {
    this.server.use(bodyParser.json());
  }
}

export default new App().server;

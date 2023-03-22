import { HelloWorldService } from '@src/services/hello-world.service';
import { Request, Response, Router } from 'express';

class HelloWorldController {
  public router: Router;
  private nameRoute: string;

  constructor() {
    this.nameRoute = '/hello-world';
    this.router = Router();
    this.routes();
  }

  public async index(req: Request, res: Response) {

    const service = new HelloWorldService();

    res.status(200).send(await service.index());
  }

  private routes() {
    this.router.get(`${this.nameRoute}`, this.index);
  }
}

export default new HelloWorldController().router;

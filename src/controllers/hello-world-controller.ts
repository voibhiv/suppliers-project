import { Request, Response, Router } from 'express';

class HelloWorldController {
  public router: Router;
  private nameRoute: string;

  constructor() {
    this.nameRoute = '/hello-world';
    this.router = Router();
    this.routes();
  }

  public index(req: Request, res: Response): void {
    res.status(200).send({ message: 'Hello World' });
  }

  private routes() {
    this.router.get(`${this.nameRoute}`, this.index);
  }
}

export default new HelloWorldController().router;

import { Request, Response } from 'express';

export class HelloWorldController {
  public async messageHelloWorld(req: Request, res: Response): Promise<void> {
    res.status(200).send({ message: 'Hello World' });
  }
}

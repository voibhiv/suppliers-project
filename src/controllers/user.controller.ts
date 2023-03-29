import { BadRequestError } from '@src/errors/errors.format';
import { UserSaveSucess } from '@src/interfaces/responses.interface';
import UserRepository from '@src/repos/implementation/user';
import IUserRepo from '@src/repos/user.repos';
import { UserService } from '@src/services/user.service';
import { Request, Response, Router } from 'express';

class UserController {
  public router: Router;
  private readonly nameRoute: string;
  private userRepository: IUserRepo;

  constructor() {
    this.userRepository = new UserRepository();
    this.nameRoute = '/user';
    this.router = Router();
    this.routes();
  }

  create = async (req: Request, res: Response) => {

    try {
      const service = new UserService(this.userRepository);
      const newUser = await service.createUser(req.body);

      const result: UserSaveSucess = {
        code: 201,
        message: "Usuário criado com sucesso",
        data: newUser
      };
      
      res.status(201).json(result);
      
    } catch (error: unknown) {
      if (error instanceof BadRequestError) {
        res.json(error);
      }
    }

  }

  private routes() {
    this.router.post(`${this.nameRoute}/create`, this.create);
  }
}

export default new UserController().router;

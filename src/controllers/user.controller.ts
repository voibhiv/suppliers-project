import {
  UserDeletedSuccess,
  UserEditSuccess,
  UserFindSuccess,
  UserSaveSuccess,
} from '@src/interfaces/userResponses.interface';
import UserRepository from '@src/repos/implementation/user';
import IUserRepo from '@src/repos/user.repos';
import { UserService } from '@src/services/user.service';
import { Request, Response, Router } from 'express';

class UserController {
  public router: Router;
  private readonly nameRoute: string;
  private userRepository: IUserRepo;
  private service: UserService;

  constructor() {
    this.userRepository = new UserRepository();
    this.service = new UserService(this.userRepository);
    this.nameRoute = '/user';
    this.router = Router();
    this.routes();
  }

  create = async (req: Request, res: Response) => {
    try {
      const newUser = await this.service.createUser(req.body);

      const result: UserSaveSuccess = {
        code: 201,
        message: 'Usuário criado com sucesso',
        data: newUser,
      };

      res.status(result.code).json(result);
    } catch (error: unknown) {
      res.json({ errors: [error] });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      // Getting id user by parameters
      const idUser = req.params?.id;
      const userUpdated = await this.service.updateUser(idUser, req.body);

      const result: UserEditSuccess = {
        code: 200,
        message: 'Usuário editado com sucesso',
        data: userUpdated,
      };
      res.status(result.code).json(result);
    } catch (error: unknown) {
      res.json({ errors: [error] });
    }
  };

  read = async (req: Request, res: Response) => {
    try {
      // Getting id user by parameters
      const idUser = req.params?.id;
      const user = await this.service.getMe(idUser);

      const result: UserFindSuccess = {
        code: 200,
        message: 'Usuário encontrado com sucesso',
        data: user,
      };

      res.status(result.code).json(result);
    } catch (error) {
      res.json({ errors: [error] });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      // Getting id user by parameters
      const idUser = req.params?.id;
      const userDeleted = await this.service.deleteUser(idUser);

      const result: UserDeletedSuccess = {
        code: 204,
        message: 'Usuário deletado com sucesso',
        data: userDeleted,
      };

      res.status(result.code).json(result);
    } catch (error) {
      res.json({ errors: [error] });
    }
  };

  private routes() {
    this.router.post(`${this.nameRoute}/create`, this.create);
    this.router.put(`${this.nameRoute}/:id`, this.update);
    this.router.get(`${this.nameRoute}/:id`, this.read);
    this.router.delete(`${this.nameRoute}/:id`, this.delete);
  }
}

export default new UserController().router;

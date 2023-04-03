import { UserEditSuccess, UserSaveSuccess } from '@src/interfaces/responses.interface';
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
    this.service        = new UserService(this.userRepository);
    this.nameRoute      = '/user';
    this.router         = Router();
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

      res.status(201).json(result);
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
        code: 201,
        message: 'Usuário criado com sucesso',
        data: userUpdated,
      };
      res.status(201).json(result);
      
    } catch (error: unknown) {
      res.json({ errors: [error] });
    }
  };

  private routes() {
    this.router.post(`${this.nameRoute}/create`, this.create);
    this.router.put(`${this.nameRoute}/update/:id`, this.update);
  }
}

export default new UserController().router;

import UserDomain from '@src/domain/user.domain';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '@src/errors/errors.format';
import IUserRepo from '@src/repos/user.repos';
import { hash } from 'bcrypt';
export class UserService {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  public async createUser(user: UserDomain): Promise<UserDomain> {
    // encrypt password
    user.password = await this.hashPassword(user.password);

    // Verify if some of the fields required are not filled
    const requiredFields = [
      'name',
      'username',
      'password',
      'email',
      'cpf',
      'cnpj',
    ];
    let invalidFields = '';
    for (const [key, value] of Object.entries(user)) {
      if (value === '' && requiredFields.includes(key)) {
        invalidFields += invalidFields === '' ? `${key}` : `, ${key}`;
      }
    }

    // Throw a Errow if exists invalidFields
    if (invalidFields) {
      throw new BadRequestError(
        `Existem campos inválidos: [${invalidFields}], verifique-os e tente novamente!`
      );
    }

    // Check if exist user with same username, email, cpf or cnpj
    const verifyFields = {
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      cnpj: user.cnpj,
    };
    const existUser = await this.repository.findUserByParametersAndConditions(verifyFields);
    if (existUser) {
      throw new ConflictError(
        'Usuário já existente, verifique os campos novamente e tente outra vez!'
      );
    }

    // Throw a Errow if fail operation
    const newUser = await this.repository.saveUser(user);
    if (!newUser) {
      throw new NotFoundError(
        'Erro na criação do usuário, tente novamente mais tarde'
      );
    }

    return newUser;
  }

  public async updateUser(userId: string, user: Partial<UserDomain>) {

    // define id of user
    user.id = userId;

    // Array containing the fields that can't be repeated by diff users 
    const fieldsToCheck: Partial<UserDomain> = {
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      cnpj: user.cnpj
    };
    const existUser = await this.repository.findUserByParametersAndConditions(fieldsToCheck, userId);
    if (existUser) {
      throw new ConflictError(
        'Campos já existentes em outro usuário, verifique-os novamente e tente outra vez!'
      );
    }

    // Throw a Errow if fail operation
    const updatedUser = await this.repository.updateUser(user);
    if (!updatedUser) {
      throw new NotFoundError(
        'Erro na atualização do usuário, tente novamente mais tarde'
      );
    }

    return updatedUser;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds   = Number(process.env.SALT_ROUNDS);
    const passwordHash = await hash(password, saltRounds);

    return passwordHash;
  }
}

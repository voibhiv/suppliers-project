import UserDomain from '@src/domain/user.domain';
import { BadRequestError, ConflictError, NotFoundError } from '@src/errors/errors.format';
import { User } from '@src/models/user.entity';
import IUserRepo from '@src/repos/user.repos';
import { hash, compareSync } from 'bcrypt';
export class UserService {
  private repository: IUserRepo;

  constructor(repository: IUserRepo) {
    this.repository = repository;
  }

  public async createUser(user: UserDomain): Promise<Partial<User>> {
    // encrypt password
    user.password = await this.hashPassword(user.password);

    // Verify if some of the fields required are not filled
    const requiredFields = ['name', 'username', 'password', 'email', 'cpf', 'cnpj'];
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
      throw new NotFoundError('Erro na criação do usuário, tente novamente mais tarde');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser;

    return rest;
  }

  public async updateUser(userId: string, user: Partial<UserDomain>): Promise<Partial<User>> {
    // define id of user
    user.id = userId;

    // Array containing the fields that can't be repeated by diff users
    const fieldsToCheck: Partial<UserDomain> = {
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      cnpj: user.cnpj,
    };
    const existUser = await this.repository.findUserByParametersAndConditions(
      fieldsToCheck,
      userId
    );
    if (existUser) {
      throw new ConflictError(
        'Campos já existentes em outro usuário, verifique-os novamente e tente outra vez!'
      );
    }

    // Throw error case password is equal
    if (user.password) {
      const userActual = await this.repository.findPasswordUserById(userId);
      if (userActual && (await compareSync(user.password, userActual.password))) {
        throw new ConflictError('A senha deve ser diferente da atual!');
      }
    }

    // hash password
    user.password = await this.hashPassword(`${user.password}`);

    // Throw a Errow if fail operation
    const updatedUser = await this.repository.updateUser(user);
    if (!updatedUser) {
      throw new NotFoundError('Erro na atualização do usuário, tente novamente mais tarde');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = updatedUser;

    return rest;
  }

  public async getMe(userId: string): Promise<User> {
    // Get user by id
    const user = await this.repository.findUserById(userId);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    return user;
  }

  public async deleteUser(userId: string) {
    const isDeleted = this.repository.deleteUser(userId);

    if (!isDeleted) {
      throw new NotFoundError('Erro ao tentar excluir usuário');
    }

    return isDeleted;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const passwordHash = await hash(password, saltRounds);

    return passwordHash;
  }
}

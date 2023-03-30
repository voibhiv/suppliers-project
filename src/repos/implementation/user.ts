import UserDomain from '@src/domain/user.domain';
import { User } from '@src/models/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import IUserRepo from '../user.repos';

export default class UserRepository implements IUserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  findUserByUsername = async (username: string) => {
    return await this.ormRepository.findOneBy({
      username,
    });
  };

  findUserByParameters = async (params: Partial<UserDomain>) => {
    return await this.ormRepository
      .createQueryBuilder()
      .where(
        'username = :username OR password = :password OR email = :email OR cpf = :cpf OR cnpj = :cnpj',
        {
          ...params,
        }
      )
      .getOne();
  };

  findUserById = async (id: string) => {
    return await this.ormRepository.findOneBy({
      id,
    });
  };

  saveUser = async (user: UserDomain) => {
    return await this.ormRepository.save(user);
  };
}

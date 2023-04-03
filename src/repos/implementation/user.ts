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

  findUserByParametersAndConditions = async (params: Partial<UserDomain>, userId?: string) => {
    const query = await this.ormRepository.createQueryBuilder('user');
    console.log(params);
    query.where('username = :username OR email = :email OR cpf = :cpf OR cnpj = :cnpj', {
      ...params
    })

    if (userId) {
      query.andWhere("id != :id", {
        id: userId
      });
    }
    console.log(await query.getQuery());
    return query.getOne();
  };

  findUserById = async (id: string) => {
    return await this.ormRepository.findOneBy({
      id,
    });
  };

  saveUser = async (user: UserDomain) => {
    return await this.ormRepository.save(user);
  };

  updateUser = async (user: Partial<UserDomain | User>) => {
    return await this.ormRepository.save(user);
  };
}
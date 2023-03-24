import { UserDomain } from '@src/domain/user.domain';
import { User } from '@src/models/user.entity'
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source'
import { IUserRepo } from '../user.repos';

export class UserRepository implements IUserRepo {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  findUserByName = async (name: string) => {
    return await this.ormRepository.findOneBy({
      name
    })
  }

  findUserById = async (id: string) => {
    return await this.ormRepository.findOneBy({
      id
    })
  }

  saveUser = async (user: UserDomain) => {
    return await this.ormRepository.save(user);
  }
}
import UserDomain from '@src/domain/user.domain';
import { User } from '@src/models/user.entity';

export default interface IUserRepo {
  findUserByUsername: (username: string) => Promise<User | null>;
  findUserByParameters: (params: Partial<UserDomain>) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  saveUser: (user: UserDomain) => Promise<UserDomain>;
}

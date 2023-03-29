import UserDomain from '@src/domain/user.domain';
import { User } from '@src/models/user.entity';

export default interface IUserRepo {
  findUserByName: (name: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  saveUser: (user: UserDomain) => Promise<UserDomain>;
}

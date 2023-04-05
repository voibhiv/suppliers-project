import UserDomain from '@src/domain/user.domain';
import { User } from '@src/models/user.entity';

export default interface IUserRepo {
  findUserByUsername: (username: string) => Promise<User | null>;
  findUserByParametersAndConditions: (
    params: Partial<UserDomain>,
    userId?: string
  ) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  findPasswordUserById: (id: string) => Promise<User | null>;
  saveUser: (user: UserDomain) => Promise<UserDomain>;
  updateUser: (user: Partial<UserDomain>) => Promise<UserDomain | User>;
}

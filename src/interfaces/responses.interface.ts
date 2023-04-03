import UserDomain from '@src/domain/user.domain';
import { User } from '@src/models/user.entity';
export interface UserSaveSuccess {
  code: number;
  message: string;
  data: UserDomain;
}

export interface UserEditSuccess {
  code: number;
  message: string;
  data: UserDomain | User;
}
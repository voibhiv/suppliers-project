import UserDomain from '@src/domain/user.domain';
import { User } from '@src/models/user.entity';
export interface UserSaveSuccess {
  code: number;
  message: string;
  data: Partial<UserDomain>;
}

export interface UserEditSuccess {
  code: number;
  message: string;
  data: Partial<UserDomain>;
}

export interface UserFindSuccess {
  code: number;
  message: string;
  data: User;
}

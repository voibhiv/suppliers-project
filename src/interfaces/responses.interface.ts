import UserDomain from '@src/domain/user.domain';

export interface UserSaveSucess {
  code: number;
  message: string;
  data: UserDomain;
}

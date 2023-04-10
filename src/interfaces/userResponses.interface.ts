import { User } from '@src/models/user.entity';

interface UserDefault {
  code: number;
  message: string;
}

export interface UserSaveSuccess extends UserDefault {
  data: Partial<User>;
}

export interface UserEditSuccess extends UserDefault {
  data: Partial<User>;
}

export interface UserFindSuccess extends UserDefault {
  data: User;
}

export interface UserDeletedSuccess extends UserDefault {
  data: boolean;
}

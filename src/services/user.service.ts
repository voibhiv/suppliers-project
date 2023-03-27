import { User } from '@src/models/user.entity';
import { Repository } from 'typeorm';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public index(): string {
    return 'Hello World';
  }
}

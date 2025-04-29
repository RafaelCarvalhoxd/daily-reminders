import { User } from 'src/modules/user/entity/user.entity';

export interface IFindUserService {
  execute(input: {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<User>;
}

import { User } from 'src/modules/user/entity/user.entity';

export interface IUserRepository {
  findUserRepository(input: {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<User | null>;
}

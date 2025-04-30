import { User } from 'src/modules/user/entity/user.entity';

export interface IUserRepository {
  findUser(input: {
    id?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
  }): Promise<User | null>;

  createUser(input: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<User>;
}

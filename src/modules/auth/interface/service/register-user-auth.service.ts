import { User } from 'src/modules/user/entity/user.entity';

export interface IRegisterUserAuthService {
  execute(input: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }): Promise<User>;
}

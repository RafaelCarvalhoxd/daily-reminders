import { Injectable } from '@nestjs/common';
import { IRegisterUserAuthService } from 'src/modules/auth/interface/service/register-user-auth.service';
import { RegisterUserAuthUseCase } from 'src/modules/auth/usecase/register-user-auth.usecase';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class RegisterUserAuthService implements IRegisterUserAuthService {
  constructor(
    private readonly registerUserAuthUseCase: RegisterUserAuthUseCase,
  ) {}
  async execute(input: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }): Promise<User> {
    return await this.registerUserAuthUseCase.execute(input);
  }
}

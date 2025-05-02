import { Injectable } from '@nestjs/common';
import { ILoginUserAuthService } from 'src/modules/auth/interface/service/login-user-auth.service';
import { LoginUserAuthUseCase } from 'src/modules/auth/usecase/login-user-auth.usecase';

@Injectable()
export class LoginUserAuthService implements ILoginUserAuthService {
  constructor(private readonly loginUserAuthUseCase: LoginUserAuthUseCase) {}

  async execute(input: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    return await this.loginUserAuthUseCase.execute(input);
  }
}

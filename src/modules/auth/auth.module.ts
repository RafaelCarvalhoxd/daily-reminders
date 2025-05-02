import { Module } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/controller/auth.controller';
import { LoginUserAuthService } from 'src/modules/auth/service/login-user-auth.service';
import { RegisterUserAuthService } from 'src/modules/auth/service/register-user-auth.service';
import { LoginUserAuthUseCase } from 'src/modules/auth/usecase/login-user-auth.usecase';
import { RegisterUserAuthUseCase } from 'src/modules/auth/usecase/register-user-auth.usecase';
import { UserModule } from 'src/modules/user/user.module';

const providers = [
  RegisterUserAuthUseCase,
  {
    provide: 'IRegisterUserAuthService',
    useClass: RegisterUserAuthService,
  },
  LoginUserAuthUseCase,
  {
    provide: 'ILoginUserAuthService',
    useClass: LoginUserAuthService,
  },
];

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [...providers],
  exports: [...providers],
})
export class AuthModule {}

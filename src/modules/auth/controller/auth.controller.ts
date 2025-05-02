import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserRequestDto } from 'src/modules/auth/dto/request/login-user-auth-request.dto';
import { RegisterUserRequestDto } from 'src/modules/auth/dto/request/register-user-auth-request.dto';
import { ILoginUserAuthService } from 'src/modules/auth/interface/service/login-user-auth.service';
import { IRegisterUserAuthService } from 'src/modules/auth/interface/service/register-user-auth.service';
import { UserResponseDto } from 'src/modules/user/dto/response/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IRegisterUserAuthService')
    private readonly registerUserService: IRegisterUserAuthService,
    @Inject('ILoginUserAuthService')
    private readonly loginUserService: ILoginUserAuthService,
  ) {}

  @Post('/register')
  async registerUser(
    @Body() dto: RegisterUserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.registerUserService.execute({
      name: dto.name,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      password: dto.password,
      confirmPassword: dto.confirmPassword,
    });

    return UserResponseDto.toJson(user);
  }

  @Post('/login')
  async loginUser(
    @Body() dto: LoginUserRequestDto,
  ): Promise<{ token: string }> {
    return await this.loginUserService.execute({
      email: dto.email,
      password: dto.password,
    });
  }
}

import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/interface/repository/user-repository.interface';
import { IBcryptLib } from 'src/shared/libs/bcrypt/interface/bcrypt-lib.interface';
import { IJwtLib } from 'src/shared/libs/jwt/interface/jwt-lib.interface';

@Injectable()
export class LoginUserAuthUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IBcryptLib')
    private readonly bcryptLib: IBcryptLib,
    @Inject('IJwtLib')
    private readonly jwtLib: IJwtLib,
  ) {}

  async execute(input: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const user = await this.userRepository.findUser({
      email: input.email,
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isPasswordValid = await this.bcryptLib.compare({
      plainText: input.password,
      hashedText: user.getPassword(),
    });
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password!');
    }
    const token = await this.jwtLib.sign({
      id: user.getId(),
      name: user.getName(),
    });
    return { token };
  }
}

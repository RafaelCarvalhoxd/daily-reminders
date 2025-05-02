import { JwtService } from '@nestjs/jwt';
import { IJwtLib } from 'src/shared/libs/jwt/interface/jwt-lib.interface';

export class JwtLib implements IJwtLib {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verify(token: string, secret: string): Promise<unknown> {
    return this.jwtService.verifyAsync(token, {
      secret,
    });
  }
}

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IJwtLib } from 'src/shared/libs/jwt/interface/jwt-lib.interface';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IJwtLib')
    private readonly jwtLib: IJwtLib,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Token not found');

    const secret = this.configService.get<string>('jwt.secret');
    if (!secret) throw new Error('JWT secret is not defined');

    try {
      const payload = await this.jwtLib.verify(token, secret);
      request['user'] = payload;
      return true;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) return token;
    throw new UnauthorizedException(
      'Authorization token is missing or malformed',
    );
  }
}

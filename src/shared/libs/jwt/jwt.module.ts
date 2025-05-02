import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtLib } from 'src/shared/libs/jwt/jwt.lib';

const providers: Provider[] = [
  {
    provide: 'IJwtLib',
    useClass: JwtLib,
  },
];

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
        },
      }),
      inject: [ConfigService],
      global: true,
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class JwtServiceModule {}

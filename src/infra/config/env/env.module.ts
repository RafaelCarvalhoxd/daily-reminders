import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfig from 'src/infra/config/env/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [envConfig],
    }),
  ],
})
export class EnvModule {}

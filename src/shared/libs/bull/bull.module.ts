import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullLib } from 'src/shared/libs/bull/bull.lib';
import { BullModule as NestBullModule } from '@nestjs/bull';

const providers = [
  {
    provide: 'IBullLib',
    useClass: BullLib,
  },
];

@Global()
@Module({
  imports: [
    NestBullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redis.host', 'localhost'),
          port: configService.get<number>('redis.port', 6379),
        },
      }),
    }),
    NestBullModule.registerQueue({
      name: 'reminder',
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class BullModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/infra/config/db/db.module.';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class InfraModule {}

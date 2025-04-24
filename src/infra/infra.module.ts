import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/config/db/db.module.';
import { EnvModule } from 'src/infra/config/env/env.module';

@Module({
  imports: [EnvModule, DatabaseModule],
})
export class InfraModule {}

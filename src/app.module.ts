import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { ModulesModule } from 'src/modules/modules.module';

@Module({
  imports: [InfraModule, ModulesModule],
})
export class AppModule {}

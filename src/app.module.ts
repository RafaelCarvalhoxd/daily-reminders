import { Module } from '@nestjs/common';
import { InfraModule } from 'src/infra/infra.module';
import { ModulesModule } from 'src/modules/modules.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [InfraModule, ModulesModule, SharedModule],
})
export class AppModule {}

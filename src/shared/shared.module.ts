import { Module } from '@nestjs/common';
import { GuardModule } from 'src/shared/guard/guard.module';
import { LibModule } from 'src/shared/libs/lib.module';

@Module({
  imports: [LibModule, GuardModule],
})
export class SharedModule {}

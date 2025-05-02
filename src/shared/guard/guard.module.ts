import { Global, Module } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Global()
@Module({
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class GuardModule {}

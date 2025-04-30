import { Module } from '@nestjs/common';
import { LibModule } from 'src/shared/libs/lib.module';

@Module({
  imports: [LibModule],
})
export class SharedModule {}

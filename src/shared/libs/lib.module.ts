import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/shared/libs/bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
})
export class LibModule {}

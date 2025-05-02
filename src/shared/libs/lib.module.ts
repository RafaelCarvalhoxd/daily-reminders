import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/shared/libs/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/shared/libs/jwt/jwt.module';

@Module({
  imports: [BcryptModule, JwtServiceModule],
})
export class LibModule {}

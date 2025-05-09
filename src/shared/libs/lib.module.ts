import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/shared/libs/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/shared/libs/jwt/jwt.module';
import { MailModule } from 'src/shared/libs/mail/mail.module';

@Module({
  imports: [BcryptModule, JwtServiceModule, MailModule],
})
export class LibModule {}

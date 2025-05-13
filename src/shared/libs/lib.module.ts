import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/shared/libs/bcrypt/bcrypt.module';
import { BullModule } from 'src/shared/libs/bull/bull.module';
import { EventEmitterServiceModule } from 'src/shared/libs/event-emitter/event.emitter.module';
import { JwtServiceModule } from 'src/shared/libs/jwt/jwt.module';
import { MailModule } from 'src/shared/libs/mail/mail.module';

@Module({
  imports: [
    BcryptModule,
    JwtServiceModule,
    MailModule,
    BullModule,
    EventEmitterServiceModule,
  ],
})
export class LibModule {}

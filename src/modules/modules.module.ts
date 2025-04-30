import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ReminderModule } from 'src/modules/reminder/reminder.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [ReminderModule, UserModule, AuthModule],
  exports: [ReminderModule, UserModule, AuthModule],
})
export class ModulesModule {}

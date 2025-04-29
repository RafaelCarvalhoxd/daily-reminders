import { Module } from '@nestjs/common';
import { ReminderModule } from 'src/modules/reminder/reminder.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [ReminderModule, UserModule],
  exports: [ReminderModule, UserModule],
})
export class ModulesModule {}

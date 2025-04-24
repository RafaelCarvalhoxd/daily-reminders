import { Module } from '@nestjs/common';
import { ReminderModule } from 'src/modules/reminder/reminder.module';

@Module({
  imports: [ReminderModule],
})
export class ModulesModule {}

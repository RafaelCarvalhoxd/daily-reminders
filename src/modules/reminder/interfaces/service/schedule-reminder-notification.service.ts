import { Reminder } from 'src/modules/reminder/entity/reminder.entity';

export interface IScheduleReminderNotificationService {
  execute(reminder: Reminder): Promise<void>;
}

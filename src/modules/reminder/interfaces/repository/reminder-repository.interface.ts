import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export interface IReminderRepository {
  createReminder(input: {
    title: string;
    description: string;
    status: ReminderStatusEnum;
    dueDates: Date[];
  }): Promise<Reminder>;
}

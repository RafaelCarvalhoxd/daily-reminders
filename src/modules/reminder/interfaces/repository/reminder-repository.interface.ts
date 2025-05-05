import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export interface IReminderRepository {
  createReminder(
    input: {
      title: string;
      description: string;
      isActive: boolean;
      status: ReminderStatusEnum;
      dueDates: Date[];
    },
    userId: number,
  ): Promise<Reminder>;

  listReminder(
    input: {
      title?: string;
    },
    userId: number,
  ): Promise<Reminder[]>;
}

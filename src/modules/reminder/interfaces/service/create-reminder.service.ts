import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export interface ICreateReminderService {
  execute(
    input: {
      title: string;
      description: string;
      isActive: boolean;
      status: ReminderStatusEnum;
      dueDates?: Date[];
      days?: {
        id: number;
        time: string;
      }[];
    },
    userId: number,
  ): Promise<Reminder>;
}

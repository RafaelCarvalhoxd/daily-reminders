import { Reminder } from 'src/modules/reminder/entity/reminder.entity';
import { ReminderStatusEnum } from 'src/modules/reminder/enum/reminder-status.enum';

export interface ICreateReminderService {
  execute(input: {
    title: string;
    description: string;
    status: ReminderStatusEnum;
    dueDates: Date[];
  }): Promise<Reminder>;
}
